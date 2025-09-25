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
  AlertCircle
} from "lucide-react";
import NavBar from "@/components/NavBar";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }

      if (!formData.email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }

      // Use Supabase authentication
      const success = await login(formData.email, formData.password);
      
      if (success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }

    } catch (err) {
      setError("Login failed. Please try again.");
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
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center animate-rotate-slow">
                <Leaf className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-gradient">AgroAI</h1>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">
              Sign in to access your agricultural dashboard
            </p>
          </div>

          {/* Login Form */}
          <Card className="card-enhanced shadow-elevated animate-scale-in">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-center text-gradient">
                🌱 Sign In
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
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

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    Forgot password?
                  </Link>
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
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "🌱 Sign In"
                  )}
                </Button>
              </form>


              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                  >
                    Sign up here
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

export default Login;
