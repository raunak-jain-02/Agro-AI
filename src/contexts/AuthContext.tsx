import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase, type AuthUser } from '../lib/supabase';
import { User, AuthError, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  userProfile: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<ProfileData>) => Promise<boolean>;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  farmSize?: string;
  cropTypes?: string[];
  // Notification preferences
  weatherAlerts?: boolean;
  priceAlerts?: boolean;
  generalNotifications?: boolean;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  farmSize?: string;
  cropTypes?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setUserProfile({
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setUserProfile({
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata
          });
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setUserProfile(null);
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        toast.success('Successfully logged in!');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            location: userData.location,
            farmSize: userData.farmSize,
            cropTypes: userData.cropTypes,
          }
        }
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        // Create user profile in database
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: data.user.id,
              email: userData.email,
              first_name: userData.firstName,
              last_name: userData.lastName,
              phone: userData.phone,
              location: userData.location,
              farm_size: userData.farmSize,
              crop_types: userData.cropTypes,
              // Notification preferences
              weather_alerts: userData.weatherAlerts ?? true,
              price_alerts: userData.priceAlerts ?? true,
              general_notifications: userData.generalNotifications ?? true,
            }
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't return false here as the user is still created
        }

        // Send welcome email
        try {
          const response = await fetch('/api/send-welcome-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: data.user.id,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              location: userData.location
            })
          });

          if (!response.ok) {
            console.error('Failed to send welcome email:', await response.text());
          } else {
            console.log('Welcome email sent successfully');
          }
        } catch (emailError) {
          console.error('Error sending welcome email:', emailError);
          // Don't fail signup if email fails
        }

        toast.success('Account created successfully! Please check your email to verify your account and for your welcome message.');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Successfully logged out!');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred while logging out');
    }
  };

  const updateProfile = async (data: Partial<ProfileData>): Promise<boolean> => {
    try {
      if (!user) return false;

      setIsLoading(true);
      
      // Update auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          location: data.location,
          farmSize: data.farmSize,
          cropTypes: data.cropTypes,
        }
      });

      if (authError) {
        toast.error(authError.message);
        return false;
      }

      // Update profile in database
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          location: data.location,
          farm_size: data.farmSize,
          crop_types: data.cropTypes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        toast.error('Failed to update profile');
        return false;
      }

      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('An unexpected error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userProfile, 
      isAuthenticated, 
      isLoading, 
      login, 
      signup, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
