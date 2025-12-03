-- Create user_profiles table
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255),
    farm_size VARCHAR(50),
    crop_types TEXT[],
    -- Notification preferences
    weather_alerts BOOLEAN DEFAULT true,
    price_alerts BOOLEAN DEFAULT true,
    general_notifications BOOLEAN DEFAULT true,
    notification_time TIME DEFAULT '05:00:00',
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    preferred_crops_for_alerts TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (id)
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER on_user_profiles_updated
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Grant permissions
GRANT ALL ON public.user_profiles TO authenticated;
GRANT ALL ON public.user_profiles TO service_role;

-- Create marketplace_listings table
CREATE TABLE public.marketplace_listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('buy', 'sell')),
    commodity VARCHAR(100) NOT NULL,
    variety VARCHAR(100),
    quantity NUMERIC NOT NULL,
    unit VARCHAR(20) NOT NULL,
    price_per_unit NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    location VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    description TEXT,
    contact_name VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'purchased', 'cancelled')),
    seller_id UUID REFERENCES auth.users(id),
    buyer_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for marketplace_listings
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;

-- Policies for marketplace_listings
CREATE POLICY "Anyone can view active listings" ON public.marketplace_listings
    FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can create listings" ON public.marketplace_listings
    FOR INSERT WITH CHECK (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "Users can update their own listings" ON public.marketplace_listings
    FOR UPDATE USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "Users can delete their own listings" ON public.marketplace_listings
    FOR DELETE USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

-- Trigger for updated_at on marketplace_listings
CREATE TRIGGER on_marketplace_listings_updated
    BEFORE UPDATE ON public.marketplace_listings
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Grant permissions
GRANT ALL ON public.marketplace_listings TO authenticated;
GRANT ALL ON public.marketplace_listings TO service_role;
GRANT SELECT ON public.marketplace_listings TO anon;

-- Instructions:
-- 1. Copy this entire SQL and run it in your Supabase SQL Editor
-- 2. This will create the user_profiles table with proper RLS policies
-- 3. Users will only be able to access their own profile data

