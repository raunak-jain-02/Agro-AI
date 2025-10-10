import { createClient } from '@supabase/supabase-js';
import EmailService, { type UserNotificationPreferences } from './lib/email-service';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, email, firstName, lastName, location } = req.body;

    // Validate required fields
    if (!userId || !email || !firstName) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['userId', 'email', 'firstName']
      });
    }

    console.log(`Sending welcome email to: ${email}`);

    // Prepare user data for email service
    const userData: UserNotificationPreferences = {
      email,
      firstName,
      lastName: lastName || '',
      location,
      weatherAlerts: true, // Default enabled
      priceAlerts: true,   // Default enabled
    };

    // Send welcome email
    const emailService = EmailService.getInstance();
    const result = await emailService.sendWelcomeEmail(userData);

    if (result.success) {
      // Log the welcome email send in database (optional)
      try {
        await supabase
          .from('user_profiles')
          .update({ 
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);
      } catch (dbError) {
        console.error('Error updating user profile after welcome email:', dbError);
        // Don't fail the entire request if database update fails
      }

      console.log(`Welcome email sent successfully to ${email}`);
      
      return res.status(200).json({
        success: true,
        message: 'Welcome email sent successfully',
        email: email
      });
    } else {
      console.error('Failed to send welcome email:', result.error);
      
      return res.status(500).json({
        success: false,
        error: 'Failed to send welcome email',
        details: result.error
      });
    }

  } catch (error) {
    console.error('Error in welcome email handler:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// You can also add a function to resend welcome emails if needed
export async function resendWelcomeEmail(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Get user data from database
    const { data: user, error: userError } = await supabase
      .from('user_profiles')
      .select('email, first_name, last_name, location')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare user data for email service
    const userData: UserNotificationPreferences = {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      location: user.location,
      weatherAlerts: true,
      priceAlerts: true,
    };

    // Send welcome email
    const emailService = EmailService.getInstance();
    const result = await emailService.sendWelcomeEmail(userData);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Welcome email resent successfully',
        email: user.email
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Failed to resend welcome email',
        details: result.error
      });
    }

  } catch (error) {
    console.error('Error resending welcome email:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
