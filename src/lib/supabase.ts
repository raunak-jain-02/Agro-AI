import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types
export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  location?: string
  farm_size?: string
  crop_types?: string[]
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    firstName?: string
    lastName?: string
    phone?: string
    location?: string
    farmSize?: string
    cropTypes?: string[]
  }
}
