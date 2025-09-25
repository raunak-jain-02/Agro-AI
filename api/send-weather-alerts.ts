import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import EmailService, { type WeatherAlert, type UserNotificationPreferences } from './lib/email-service';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Security check - only allow POST requests and verify authorization
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for authorization (you can use a secret key or cron secret)
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET || 'fallback-secret-key';
  
  if (authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('🌤️ Starting weather alerts cron job...');
    
    // Get all users who have weather alerts enabled
    const { data: users, error: usersError } = await supabase
      .from('user_profiles')
      .select(`
        id,
        email,
        first_name,
        last_name,
        location,
        weather_alerts,
        timezone,
        notification_time
      `)
      .eq('weather_alerts', true);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    if (!users || users.length === 0) {
      console.log('No users with weather alerts enabled found');
      return res.status(200).json({ message: 'No users to send alerts to', sent: 0 });
    }

    console.log(`Found ${users.length} users with weather alerts enabled`);

    const emailService = EmailService.getInstance();
    const results = [];

    // Process users in batches to avoid rate limiting
    const batchSize = 10;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (user) => {
        try {
          // Get weather data for user's location
          const weatherData = await getWeatherData(user.location || 'Ludhiana, India');
          
          if (!weatherData) {
            console.error(`Failed to get weather data for user ${user.id}`);
            return { userId: user.id, success: false, error: 'Weather data not available' };
          }

          // Prepare user data for email service
          const userData: UserNotificationPreferences = {
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            location: user.location,
            weatherAlerts: true,
            priceAlerts: false, // We're only sending weather alerts in this function
          };

          // Send weather alert email
          const result = await emailService.sendWeatherAlert(userData, weatherData);
          
          return {
            userId: user.id,
            email: user.email,
            success: result.success,
            error: result.success ? null : result.error
          };
        } catch (error) {
          console.error(`Error processing user ${user.id}:`, error);
          return {
            userId: user.id,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add small delay between batches to be respectful to email service
      if (i + batchSize < users.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`Weather alerts sent: ${successCount} successful, ${failureCount} failed`);

    // Log failures for debugging
    const failures = results.filter(r => !r.success);
    if (failures.length > 0) {
      console.error('Failed to send alerts to:', failures);
    }

    return res.status(200).json({
      message: 'Weather alerts processing completed',
      total: users.length,
      sent: successCount,
      failed: failureCount,
      results: results
    });

  } catch (error) {
    console.error('Error in weather alerts cron job:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function getWeatherData(location: string): Promise<WeatherAlert | null> {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY || 'ff421bf921c9fd1149571dfd57e12f37';
    
    // Extract city name from location (handle formats like "City, State" or "City")
    const city = location.split(',')[0].trim() || 'Ludhiana';
    
    console.log(`Fetching weather for: ${city}`);
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`,
      { timeout: 10000 } // 10 second timeout
    );

    const data = response.data;

    const weatherAlert: WeatherAlert = {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      condition: data.weather[0].description,
      location: `${data.name}, ${data.sys.country}`
    };

    return weatherAlert;
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Return fallback weather data if API fails
    return {
      temperature: 25,
      humidity: 60,
      wind: 10,
      condition: 'partly cloudy',
      location: location
    };
  }
}
