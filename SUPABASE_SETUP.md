# Supabase Authentication Setup

This guide will help you set up Supabase authentication for your AgroAI application.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Setup Steps

### 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **Anon Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

### 3. Set Up Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the entire content from `supabase_schema.sql` file
4. Paste it into the SQL editor and run it
5. This will create:
   - `user_profiles` table
   - Row Level Security (RLS) policies
   - Triggers for automatic timestamps

### 4. Configure Authentication Settings

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Configure the following settings:
   
   **Site URL:**
   - Add `http://localhost:8080` for development
   - Add your production domain when deploying

   **Redirect URLs:**
   - Add `http://localhost:8080/**` for development
   - Add your production domain pattern when deploying

   **Email Templates (optional):**
   - Customize the signup confirmation email
   - Customize the password reset email

### 5. Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:8080/signup`
3. Create a test account
4. Check your email for the verification link
5. Try logging in at `http://localhost:8080/login`

## Features Included

- ✅ **User Registration** with email verification
- ✅ **User Login** with email and password
- ✅ **User Profile Storage** in custom database table
- ✅ **Password Reset** (built-in Supabase feature)
- ✅ **Row Level Security** - users can only access their own data
- ✅ **Automatic Session Management**
- ✅ **Real-time Authentication State Updates**

## User Profile Data Structure

The `user_profiles` table stores the following information:

```typescript
interface UserProfile {
  id: string              // UUID from Supabase Auth
  email: string           // User's email address
  first_name: string      // User's first name
  last_name: string       // User's last name
  phone?: string          // Optional phone number
  location?: string       // Optional farm location
  farm_size?: string      // Optional farm size in acres
  crop_types?: string[]   // Optional array of crop types
  created_at: string      // Auto-generated timestamp
  updated_at: string      // Auto-updated timestamp
}
```

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error:**
   - Check that your `.env` file has the correct Supabase URL and anon key
   - Make sure the `.env` file is in the root directory

2. **Database access errors:**
   - Ensure you've run the SQL schema from `supabase_schema.sql`
   - Check that RLS policies are properly set up

3. **Email verification not working:**
   - Check your Supabase project's email settings
   - Verify your site URL is correctly configured

4. **Authentication state not persisting:**
   - Check browser console for errors
   - Ensure Supabase client is properly initialized

### Getting Help:

- Check the [Supabase Documentation](https://supabase.com/docs)
- Visit the [Supabase Community](https://github.com/supabase/supabase/discussions)

## Security Notes

- Never commit your `.env` file to version control
- The anon key is safe to use in client-side code
- RLS policies ensure users can only access their own data
- Always validate user input on both client and server side
