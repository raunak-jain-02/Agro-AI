import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export interface WeatherAlert {
  temperature: number;
  humidity: number;
  wind: number;
  condition: string;
  location: string;
  forecast?: {
    tomorrow: {
      temperature: number;
      condition: string;
    };
  };
}

export interface PriceAlert {
  crop: string;
  currentPrice: number;
  previousPrice: number;
  priceChange: number;
  priceChangePercent: number;
  market: string;
  trend: 'up' | 'down' | 'stable';
}

export interface UserNotificationPreferences {
  email: string;
  firstName: string;
  lastName: string;
  location?: string;
  weatherAlerts: boolean;
  priceAlerts: boolean;
  preferredCropsForAlerts?: string[];
}

export class EmailService {
  private static instance: EmailService;

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // Send weather alert email
  async sendWeatherAlert(user: UserNotificationPreferences, weather: WeatherAlert) {
    try {
      const emailContent = this.generateWeatherEmailTemplate(user, weather);
      
      const result = await resend.emails.send({
        from: 'AgroAI Weather Alerts <weather@agroai.com>',
        to: user.email,
        subject: `🌤️ Daily Weather Alert - ${weather.location}`,
        html: emailContent,
      });

      console.log('Weather email sent successfully:', result);
      return { success: true, result };
    } catch (error) {
      console.error('Error sending weather email:', error);
      return { success: false, error };
    }
  }

  // Send price alert email
  async sendPriceAlert(user: UserNotificationPreferences, priceAlerts: PriceAlert[]) {
    try {
      const emailContent = this.generatePriceEmailTemplate(user, priceAlerts);
      
      const result = await resend.emails.send({
        from: 'AgroAI Price Alerts <prices@agroai.com>',
        to: user.email,
        subject: `📈 Market Price Updates - ${new Date().toLocaleDateString()}`,
        html: emailContent,
      });

      console.log('Price email sent successfully:', result);
      return { success: true, result };
    } catch (error) {
      console.error('Error sending price email:', error);
      return { success: false, error };
    }
  }

  // Send welcome email with notification setup
  async sendWelcomeEmail(user: UserNotificationPreferences) {
    try {
      const emailContent = this.generateWelcomeEmailTemplate(user);
      
      const result = await resend.emails.send({
        from: 'AgroAI Team <welcome@agroai.com>',
        to: user.email,
        subject: '🌱 Welcome to AgroAI - Your Smart Farming Journey Begins!',
        html: emailContent,
      });

      console.log('Welcome email sent successfully:', result);
      return { success: true, result };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }
  }

  // Generate weather email template
  private generateWeatherEmailTemplate(user: UserNotificationPreferences, weather: WeatherAlert): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Daily Weather Alert</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px 20px; text-align: center; }
            .content { background: white; padding: 30px; }
            .weather-card { background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .weather-item { display: inline-block; margin: 10px 20px; text-align: center; }
            .weather-value { font-size: 24px; font-weight: bold; display: block; }
            .weather-label { font-size: 12px; opacity: 0.8; text-transform: uppercase; }
            .tips { background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #22c55e; }
            .footer { background: #2d3748; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .btn { background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
            .emoji { font-size: 24px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="emoji">🌤️</div>
                <h1>Good Morning, ${user.firstName}!</h1>
                <p>Your daily weather update for ${weather.location}</p>
            </div>
            
            <div class="content">
                <div class="weather-card">
                    <h2 style="margin-top: 0;">Today's Weather</h2>
                    <div style="text-align: center;">
                        <div class="weather-item">
                            <span class="weather-value">${weather.temperature}°C</span>
                            <span class="weather-label">🌡️ Temperature</span>
                        </div>
                        <div class="weather-item">
                            <span class="weather-value">${weather.humidity}%</span>
                            <span class="weather-label">💧 Humidity</span>
                        </div>
                        <div class="weather-item">
                            <span class="weather-value">${weather.wind} km/h</span>
                            <span class="weather-label">💨 Wind Speed</span>
                        </div>
                    </div>
                    <p style="text-align: center; margin: 20px 0; font-size: 18px; text-transform: capitalize;">
                        ${weather.condition}
                    </p>
                </div>
                
                <div class="tips">
                    <h3>🌾 Today's Farming Tips</h3>
                    ${this.getWeatherBasedTips(weather)}
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.VERCEL_URL || 'https://agroai.vercel.app'}" class="btn">
                        📱 Open AgroAI App
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p>This is an automated weather alert from AgroAI</p>
                <p>You're receiving this because you've enabled weather notifications</p>
                <p><a href="${process.env.VERCEL_URL || 'https://agroai.vercel.app'}/profile" style="color: #4facfe;">Manage your notification preferences</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  // Generate price alert email template
  private generatePriceEmailTemplate(user: UserNotificationPreferences, priceAlerts: PriceAlert[]): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Market Price Updates</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 30px 20px; text-align: center; }
            .content { background: white; padding: 30px; }
            .price-card { background: white; border: 1px solid #e2e8f0; border-radius: 10px; margin: 15px 0; padding: 20px; }
            .price-trend-up { border-left: 4px solid #22c55e; background: #f0fdf4; }
            .price-trend-down { border-left: 4px solid #ef4444; background: #fef2f2; }
            .price-trend-stable { border-left: 4px solid #6b7280; background: #f9fafb; }
            .price-value { font-size: 24px; font-weight: bold; }
            .price-change { font-size: 14px; font-weight: 600; }
            .price-change-up { color: #22c55e; }
            .price-change-down { color: #ef4444; }
            .footer { background: #2d3748; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .btn { background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>💰 Market Price Updates</h1>
                <p>Hello ${user.firstName}, here are today's crop prices</p>
            </div>
            
            <div class="content">
                ${priceAlerts.map(alert => `
                    <div class="price-card price-trend-${alert.trend}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h3 style="margin: 0; color: #1f2937;">${alert.crop}</h3>
                                <p style="margin: 5px 0; color: #6b7280; font-size: 14px;">${alert.market}</p>
                            </div>
                            <div style="text-align: right;">
                                <div class="price-value">₹${alert.currentPrice}</div>
                                <div class="price-change price-change-${alert.trend === 'up' ? 'up' : alert.trend === 'down' ? 'down' : ''}">
                                    ${alert.trend === 'up' ? '↗️' : alert.trend === 'down' ? '↘️' : '➡️'} 
                                    ${alert.priceChange >= 0 ? '+' : ''}₹${alert.priceChange} 
                                    (${alert.priceChangePercent >= 0 ? '+' : ''}${alert.priceChangePercent.toFixed(1)}%)
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.VERCEL_URL || 'https://agroai.vercel.app'}/market-analysis" class="btn">
                        📊 View Detailed Analysis
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p>This is an automated price alert from AgroAI</p>
                <p><a href="${process.env.VERCEL_URL || 'https://agroai.vercel.app'}/profile" style="color: #4facfe;">Manage your notification preferences</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  // Generate welcome email template
  private generateWelcomeEmailTemplate(user: UserNotificationPreferences): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AgroAI</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
            .content { background: white; padding: 40px; }
            .feature { background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .footer { background: #2d3748; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .btn { background: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌱 Welcome to AgroAI!</h1>
                <p>Hi ${user.firstName}, thank you for joining our farming community</p>
            </div>
            
            <div class="content">
                <h2>🎉 Your account is ready!</h2>
                <p>We're excited to help you with smart farming solutions. Here's what you can expect:</p>
                
                <div class="feature">
                    <h3>🌤️ Daily Weather Alerts</h3>
                    <p>Get weather updates every morning at 5:00 AM to plan your day better.</p>
                </div>
                
                <div class="feature">
                    <h3>💰 Price Alerts</h3>
                    <p>Stay informed about crop price changes in your local markets.</p>
                </div>
                
                <div class="feature">
                    <h3>🔬 AI Crop Analysis</h3>
                    <p>Upload crop photos for instant disease diagnosis and treatment recommendations.</p>
                </div>
                
                <div style="text-align: center; margin: 40px 0;">
                    <a href="${process.env.VERCEL_URL || 'https://agroai.vercel.app'}" class="btn">
                        🚀 Start Using AgroAI
                    </a>
                </div>
                
                <p><strong>📧 Email Notifications:</strong> You've been automatically enrolled for daily weather and price alerts. You can manage these preferences anytime in your profile.</p>
            </div>
            
            <div class="footer">
                <p>Welcome to the AgroAI family! 🌾</p>
                <p><a href="${process.env.VERCEL_URL || 'https://agroai.vercel.app'}/profile" style="color: #4facfe;">Manage your preferences</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  // Get weather-based farming tips
  private getWeatherBasedTips(weather: WeatherAlert): string {
    let tips = [];
    
    if (weather.temperature > 35) {
      tips.push("🔥 High temperature alert! Ensure adequate irrigation and consider shade protection for sensitive crops.");
    }
    
    if (weather.temperature < 10) {
      tips.push("🥶 Low temperature warning! Protect sensitive crops from frost damage.");
    }
    
    if (weather.humidity > 80) {
      tips.push("💧 High humidity levels may increase disease risk. Ensure good air circulation around plants.");
    }
    
    if (weather.wind > 25) {
      tips.push("💨 Strong winds expected! Secure loose structures and check plant supports.");
    }
    
    if (weather.condition.includes('rain')) {
      tips.push("🌧️ Rain expected! Delay spraying activities and ensure proper drainage.");
    }
    
    if (tips.length === 0) {
      tips.push("☀️ Good weather conditions for most farming activities. Great day for field work!");
    }
    
    return tips.map(tip => `<p style="margin: 10px 0;">${tip}</p>`).join('');
  }
}

export default EmailService;
