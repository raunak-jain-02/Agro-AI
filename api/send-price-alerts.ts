import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import EmailService, { type PriceAlert, type UserNotificationPreferences } from './lib/email-service';

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

  // Check for authorization
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET || 'fallback-secret-key';
  
  if (authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('💰 Starting price alerts cron job...');
    
    // Get all users who have price alerts enabled
    const { data: users, error: usersError } = await supabase
      .from('user_profiles')
      .select(`
        id,
        email,
        first_name,
        last_name,
        location,
        price_alerts,
        preferred_crops_for_alerts,
        crop_types
      `)
      .eq('price_alerts', true);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    if (!users || users.length === 0) {
      console.log('No users with price alerts enabled found');
      return res.status(200).json({ message: 'No users to send alerts to', sent: 0 });
    }

    console.log(`Found ${users.length} users with price alerts enabled`);

    const emailService = EmailService.getInstance();
    const results = [];

    // Process users in batches
    const batchSize = 10;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (user) => {
        try {
          // Get relevant crops for the user
          const userCrops = user.preferred_crops_for_alerts || user.crop_types || ['wheat', 'rice', 'corn'];
          
          // Get price data for user's crops
          const priceAlerts = await getPriceAlerts(userCrops, user.location);
          
          if (!priceAlerts || priceAlerts.length === 0) {
            console.log(`No price alerts for user ${user.id}`);
            return { userId: user.id, success: true, message: 'No price changes to report' };
          }

          // Prepare user data for email service
          const userData: UserNotificationPreferences = {
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            location: user.location,
            weatherAlerts: false,
            priceAlerts: true,
            preferredCropsForAlerts: userCrops
          };

          // Send price alert email
          const result = await emailService.sendPriceAlert(userData, priceAlerts);
          
          return {
            userId: user.id,
            email: user.email,
            success: result.success,
            priceAlertsCount: priceAlerts.length,
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

      // Add delay between batches
      if (i + batchSize < users.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`Price alerts sent: ${successCount} successful, ${failureCount} failed`);

    return res.status(200).json({
      message: 'Price alerts processing completed',
      total: users.length,
      sent: successCount,
      failed: failureCount,
      results: results
    });

  } catch (error) {
    console.error('Error in price alerts cron job:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function getPriceAlerts(crops: string[], location?: string): Promise<PriceAlert[]> {
  try {
    // Mock price data - In production, you would integrate with actual market APIs
    const mockPrices: { [key: string]: { current: number, previous: number, market: string } } = {
      wheat: { current: 2150, previous: 2100, market: 'Ludhiana Mandi' },
      rice: { current: 3200, previous: 3150, market: 'Ludhiana Mandi' },
      corn: { current: 1850, previous: 1900, market: 'Ludhiana Mandi' },
      sugarcane: { current: 350, previous: 340, market: 'Ludhiana Mandi' },
      cotton: { current: 5200, previous: 5150, market: 'Ludhiana Mandi' },
      soybean: { current: 4500, previous: 4600, market: 'Ludhiana Mandi' },
      tomato: { current: 25, previous: 22, market: 'Ludhiana Mandi' },
      potato: { current: 18, previous: 20, market: 'Ludhiana Mandi' },
      onion: { current: 35, previous: 32, market: 'Ludhiana Mandi' }
    };

    const priceAlerts: PriceAlert[] = [];

    for (const crop of crops) {
      const cropLower = crop.toLowerCase().trim();
      const priceData = mockPrices[cropLower];
      
      if (priceData) {
        const priceChange = priceData.current - priceData.previous;
        const priceChangePercent = (priceChange / priceData.previous) * 100;
        
        // Only include crops with significant price changes (> 2% or absolute change > 50)
        if (Math.abs(priceChangePercent) > 2 || Math.abs(priceChange) > 50) {
          const trend = priceChange > 0 ? 'up' : priceChange < 0 ? 'down' : 'stable';
          
          priceAlerts.push({
            crop: crop.charAt(0).toUpperCase() + crop.slice(1),
            currentPrice: priceData.current,
            previousPrice: priceData.previous,
            priceChange: priceChange,
            priceChangePercent: priceChangePercent,
            market: location ? `${location} Mandi` : priceData.market,
            trend: trend
          });
        }
      }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return priceAlerts;
    
  } catch (error) {
    console.error('Error fetching price data:', error);
    return [];
  }
}

// Helper function to integrate with real market APIs (placeholder)
async function fetchRealMarketPrices(crops: string[], location?: string): Promise<PriceAlert[]> {
  // This is where you would integrate with real market price APIs like:
  // - Government agmarknet APIs
  // - Private market data providers
  // - Agricultural commodity exchanges
  
  // For now, returning empty array as this requires specific API keys and endpoints
  return [];
}
