import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Camera, MapPin, Calendar, Leaf, FileText, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    age: "42",
    income: "350000",
    location: "Ludhiana, Punjab",
    farmSize: "5.2",
    cropTypes: "Wheat, Rice, Sugarcane",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com"
  });

  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your farmer profile has been successfully updated.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-sm border-b border-border shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-primary" />
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-primary">AgroAI</h1>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/crop-disease" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
                <Leaf className="h-4 w-4" />
                <span>Crop Disease</span>
              </Link>
              <Link to="/market-analysis" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
                <TrendingUp className="h-4 w-4" />
                <span>Market Analysis</span>
              </Link>
              <Link to="/government-schemes" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
                <FileText className="h-4 w-4" />
                <span>Govt Schemes</span>
              </Link>
              <Link to="/profile" className="flex items-center space-x-2 text-primary font-medium">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </div>

            {/* Mobile Page Title */}
            <div className="md:hidden">
              <h2 className="text-sm font-semibold text-foreground">Profile</h2>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 gap-3">
              <Link to="/crop-disease" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-medium">AI Crop Disease</span>
              </Link>
              <Link to="/market-analysis" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="font-medium">Real-Time Market</span>
              </Link>
              <Link to="/government-schemes" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <FileText className="h-5 w-5 text-success" />
                <span className="font-medium">Government Schemes</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
                      {profileData.name.split(' ').map(n => n[0]).join('')}
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
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{profileData.name}</h2>
                  <div className="flex flex-col sm:flex-row md:flex-row gap-2 md:gap-4 text-sm md:text-base text-muted-foreground">
                    <div className="flex items-center justify-center md:justify-start gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{profileData.age} years old</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-1">
                      <span>₹{parseInt(profileData.income).toLocaleString()}/year</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} className="bg-gradient-primary">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
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
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    disabled={!isEditing}
                  />
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
                    disabled={!isEditing}
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
                  {isEditing ? (
                    <Select 
                      value={profileData.location.split(',')[1]?.trim()} 
                      onValueChange={(value) => handleInputChange('location', `${profileData.location.split(',')[0]}, ${value}`)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Punjab">Punjab</SelectItem>
                        <SelectItem value="Haryana">Haryana</SelectItem>
                        <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                        <SelectItem value="Gujarat">Gujarat</SelectItem>
                        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input value={profileData.location} disabled />
                  )}
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
                
                <div>
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    value={profileData.income}
                    onChange={(e) => handleInputChange('income', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
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