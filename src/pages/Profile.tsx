import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { User, Camera, MapPin, Calendar, Loader2 } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, type UserProfile } from "@/lib/supabase";

const Profile = () => {
  const { user, userProfile, isAuthenticated, isLoading: authLoading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    farmSize: "",
    cropTypes: "",
    // Notification preferences
    weatherAlerts: true,
    priceAlerts: true,
    generalNotifications: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load user profile data
  useEffect(() => {
    const loadProfileData = async () => {
      if (user && userProfile) {
        try {
          // Fetch additional profile data from database
          const { data: dbProfile, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
            console.error('Error fetching profile:', error);
          }

          // Combine auth data with database data
          const combinedData = {
            firstName: userProfile.user_metadata?.firstName || dbProfile?.first_name || '',
            lastName: userProfile.user_metadata?.lastName || dbProfile?.last_name || '',
            email: userProfile.email || user.email || '',
            phone: userProfile.user_metadata?.phone || dbProfile?.phone || '',
            location: userProfile.user_metadata?.location || dbProfile?.location || '',
            farmSize: userProfile.user_metadata?.farmSize || dbProfile?.farm_size || '',
            cropTypes: Array.isArray(userProfile.user_metadata?.cropTypes) 
              ? userProfile.user_metadata.cropTypes.join(', ') 
              : Array.isArray(dbProfile?.crop_types)
              ? dbProfile.crop_types.join(', ')
              : userProfile.user_metadata?.cropTypes || '',
            // Notification preferences
            weatherAlerts: dbProfile?.weather_alerts ?? true,
            priceAlerts: dbProfile?.price_alerts ?? true,
            generalNotifications: dbProfile?.general_notifications ?? true,
          };

          setProfileData(combinedData);
        } catch (error) {
          console.error('Error loading profile data:', error);
          toast({
            title: "Error",
            description: "Failed to load profile data. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      } else if (!authLoading) {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [user, userProfile, authLoading, toast]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update user metadata through auth context
      const success = await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        location: profileData.location,
        farmSize: profileData.farmSize,
        cropTypes: profileData.cropTypes ? profileData.cropTypes.split(',').map(crop => crop.trim()) : [],
      });

      if (success) {
        // Also update notification preferences directly in database
        const { error: notificationError } = await supabase
          .from('user_profiles')
          .update({
            weather_alerts: profileData.weatherAlerts === 'true' || profileData.weatherAlerts === true,
            price_alerts: profileData.priceAlerts === 'true' || profileData.priceAlerts === true,
            general_notifications: profileData.generalNotifications === 'true' || profileData.generalNotifications === true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user?.id);

        if (notificationError) {
          console.error('Error updating notification preferences:', notificationError);
          toast({
            title: "Warning",
            description: "Profile updated but notification preferences may not have been saved.",
            variant: "destructive",
          });
        } else {
          setIsEditing(false);
          toast({
            title: "Profile updated",
            description: "Your farmer profile and notification preferences have been successfully updated.",
          });
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Show loading spinner while data is loading
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <NavBar showBackButton={true} />
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading your profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <NavBar showBackButton={true} />
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="max-w-md">
              <CardContent className="p-6 text-center">
                <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Please Sign In</h3>
                <p className="text-muted-foreground mb-4">You need to be logged in to view your profile.</p>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Go to Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
  const displayName = fullName || 'User';

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6 md:mb-8 bg-gradient-card shadow-card">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 md:h-32 md:w-32">
                    <AvatarImage src="/placeholder-farmer.jpg" alt="Farmer profile" />
                    <AvatarFallback className="text-xl md:text-2xl bg-primary text-primary-foreground">
                      {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full p-2"
                    disabled={!isEditing}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{displayName}</h2>
                  <div className="flex flex-col sm:flex-row md:flex-row gap-2 md:gap-4 text-sm md:text-base text-muted-foreground">
                    <div className="flex items-center justify-center md:justify-start gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location || 'Location not provided'}</span>
                    </div>
                    {profileData.farmSize && (
                      <div className="flex items-center justify-center md:justify-start gap-1">
                        <span>{profileData.farmSize} acres</span>
                      </div>
                    )}
                    {profileData.email && (
                      <div className="flex items-center justify-center md:justify-start gap-1">
                        <span>{profileData.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} className="bg-gradient-primary" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full md:w-auto">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Farm Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Village, District, State"
                  />
                </div>
                
                <div>
                  <Label htmlFor="farmSize">Farm Size (Acres)</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    step="0.1"
                    value={profileData.farmSize}
                    onChange={(e) => handleInputChange('farmSize', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cropTypes">Primary Crops</Label>
                  <Input
                    id="cropTypes"
                    value={profileData.cropTypes}
                    onChange={(e) => handleInputChange('cropTypes', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Wheat, Rice, Cotton"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📧</span>
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your email notification preferences. Changes are saved automatically.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600">🌤️</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Weather Alerts</p>
                        <p className="text-xs text-muted-foreground">Daily weather updates at 5:00 AM</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.weatherAlerts}
                      onChange={(e) => handleInputChange('weatherAlerts', e.target.checked.toString())}
                      disabled={!isEditing}
                      className="h-5 w-5 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600">💰</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Price Alerts</p>
                        <p className="text-xs text-muted-foreground">Crop price changes and market updates</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.priceAlerts}
                      onChange={(e) => handleInputChange('priceAlerts', e.target.checked.toString())}
                      disabled={!isEditing}
                      className="h-5 w-5 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600">📢</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">General Notifications</p>
                        <p className="text-xs text-muted-foreground">Tips, updates, and farming insights</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.generalNotifications}
                      onChange={(e) => handleInputChange('generalNotifications', e.target.checked.toString())}
                      disabled={!isEditing}
                      className="h-5 w-5 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="text-xs text-muted-foreground p-2 bg-blue-50 border border-blue-200 rounded">
                    💡 Changes will be applied when you save your profile. Your notification preferences will be updated immediately.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Eligibility Status */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Scheme Eligibility Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg border-2 border-success/20 bg-success/10">
                  <div className="text-2xl font-bold text-success mb-2">5</div>
                  <p className="text-sm text-success">Eligible Schemes</p>
                </div>
                <div className="text-center p-4 rounded-lg border-2 border-warning/20 bg-warning/10">
                  <div className="text-2xl font-bold text-warning mb-2">2</div>
                  <p className="text-sm text-warning">Pending Applications</p>
                </div>
                <div className="text-center p-4 rounded-lg border-2 border-accent/20 bg-accent/10">
                  <div className="text-2xl font-bold text-accent mb-2">₹56,000</div>
                  <p className="text-sm text-accent">Total Benefits Received</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Privacy Notice */}
          <div className="mt-6 md:mt-8 text-center">
            <p className="text-xs md:text-sm text-muted-foreground px-4">
              Your profile information is used to determine scheme eligibility and provide personalized recommendations. 
              All data is securely stored and never shared without your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
