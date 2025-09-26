import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Leaf, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Sun,
  Moon,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  MapPin,
  Crop
} from "lucide-react";
import NavBar from "@/components/NavBar";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    farmLocation: "",
    farmSize: "",
    primaryCrops: "",
    // Notification preferences (default enabled)
    weatherAlerts: true,
    priceAlerts: true,
    generalNotifications: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate form
      if (!validateForm()) {
        return;
      }

      // Use Supabase authentication
      const success = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.farmLocation,
        farmSize: formData.farmSize,
        cropTypes: formData.primaryCrops ? formData.primaryCrops.split(',').map(crop => crop.trim()) : [],
        // Include notification preferences
        weatherAlerts: formData.weatherAlerts,
        priceAlerts: formData.priceAlerts,
        generalNotifications: formData.generalNotifications,
      });
      
      if (success) {
        setSuccess("Account created successfully! Please check your email to verify your account.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }

    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero bg-pattern">
      <NavBar />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 animate-slide-up"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center animate-rotate-slow">
                <Leaf className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-gradient">AgroAI</h1>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Join Our Farming Community</h2>
            <p className="text-muted-foreground">
              Create your account and start your agricultural journey with AI
            </p>
          </div>

          {/* Signup Form */}
          <Card className="card-enhanced shadow-elevated animate-scale-in">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center text-gradient">
                🌱 Create Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                        First Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                        Last Name *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="farmer@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Farm Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Farm Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Farm Location */}
                    <div className="space-y-2">
                      <Label htmlFor="farmLocation" className="text-sm font-medium text-foreground">
                        Farm Location
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="farmLocation"
                          name="farmLocation"
                          type="text"
                          placeholder="Village, District, State"
                          value={formData.farmLocation}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Farm Size */}
                    <div className="space-y-2">
                      <Label htmlFor="farmSize" className="text-sm font-medium text-foreground">
                        Farm Size (acres)
                      </Label>
                      <div className="relative">
                        <Crop className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="farmSize"
                          name="farmSize"
                          type="number"
                          placeholder="5"
                          value={formData.farmSize}
                          onChange={handleInputChange}
                          className="pl-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary Crops */}
                  <div className="space-y-2">
                    <Label htmlFor="primaryCrops" className="text-sm font-medium text-foreground">
                      Primary Crops (comma separated)
                    </Label>
                    <div className="relative">
                      <Crop className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="primaryCrops"
                        name="primaryCrops"
                        type="text"
                        placeholder="Wheat, Rice, Corn"
                        value={formData.primaryCrops}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Preferences Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    📧 Email Notifications
                  </h3>
                  
                  <div className="space-y-4 bg-muted/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Stay updated with weather alerts and market prices. You can change these preferences anytime in your profile.
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        id="weatherAlerts"
                        name="weatherAlerts"
                        type="checkbox"
                        checked={formData.weatherAlerts}
                        onChange={(e) => setFormData(prev => ({ ...prev, weatherAlerts: e.target.checked }))}
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <Label htmlFor="weatherAlerts" className="text-sm text-foreground flex items-center gap-2">
                        <span>🌤️ Daily Weather Alerts (5:00 AM)</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Recommended</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        id="priceAlerts"
                        name="priceAlerts"
                        type="checkbox"
                        checked={formData.priceAlerts}
                        onChange={(e) => setFormData(prev => ({ ...prev, priceAlerts: e.target.checked }))}
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <Label htmlFor="priceAlerts" className="text-sm text-foreground flex items-center gap-2">
                        <span>💰 Crop Price Alerts</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Recommended</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        id="generalNotifications"
                        name="generalNotifications"
                        type="checkbox"
                        checked={formData.generalNotifications}
                        onChange={(e) => setFormData(prev => ({ ...prev, generalNotifications: e.target.checked }))}
                        className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <Label htmlFor="generalNotifications" className="text-sm text-foreground">
                        <span>📢 General Updates & Tips</span>
                      </Label>
                    </div>
                    
                 
                  </div>
                </div>

                {/* Security Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Security
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 h-12 border-border focus:ring-primary focus:border-primary transition-all duration-300"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2 mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                        Privacy Policy
                      </Link>
                      . I understand that my information will be used to provide agricultural services and market insights.
                    </Label>
                  </div>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm animate-slide-up">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-md text-success text-sm animate-slide-up">
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{success}</span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 btn-primary-enhanced hover-lift text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "🌱 Create Account"
                  )}
                </Button>
              </form>


              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Signup;
