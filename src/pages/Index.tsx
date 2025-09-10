import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, TrendingUp, FileText, User, Cloud, Thermometer, Droplets, Wind } from "lucide-react";
import heroImage from "@/assets/agro-hero.jpg";
import cropDiseaseIcon from "@/assets/crop-disease-icon.jpg";
import marketAnalysisIcon from "@/assets/market-analysis-icon.jpg";
import schemesIcon from "@/assets/schemes-icon.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-sm border-b border-border shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-primary">AgroAI</h1>
            </div>

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
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
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

      {/* Hero Section */}
      <section className="relative py-8 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-elevated">
            <img 
              src={heroImage} 
              alt="Agricultural fields with farmer using smartphone"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <div className="text-white text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">
                  Smart Farming
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90">
                  AI-powered solutions for modern agriculture
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            Get instant crop disease analysis, real-time market prices, and access to government schemes - 
            all designed specifically for farmers like you.
          </p>

          {/* Weather Widget */}
          <Card className="mb-12 bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                Today's Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <Thermometer className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="font-semibold">28°C</p>
                </div>
                <div className="text-center">
                  <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-semibold">65%</p>
                </div>
                <div className="text-center">
                  <Wind className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="font-semibold">12 km/h</p>
                </div>
                <div className="text-center">
                  <Cloud className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <p className="font-semibold">Partly Cloudy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Link to="/crop-disease">
              <Card className="hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card h-full">
                <CardHeader className="text-center">
                  <img 
                    src={cropDiseaseIcon} 
                    alt="Crop Disease Analysis"
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  />
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    AI Crop Disease
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Upload crop photos and get instant disease diagnosis with treatment recommendations
                  </p>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Analyze Crops
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/market-analysis">
              <Card className="hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card h-full">
                <CardHeader className="text-center">
                  <img 
                    src={marketAnalysisIcon} 
                    alt="Market Analysis"
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  />
                  <CardTitle className="flex items-center justify-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Real-time mandi prices for crops in your area with wholesale and retail rates
                  </p>
                  <Button variant="secondary" className="w-full">
                    View Prices
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/government-schemes">
              <Card className="hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card h-full">
                <CardHeader className="text-center">
                  <img 
                    src={schemesIcon} 
                    alt="Government Schemes"
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  />
                  <CardTitle className="flex items-center justify-center gap-2">
                    <FileText className="h-5 w-5 text-success" />
                    Government Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Discover available schemes and check your eligibility for government benefits
                  </p>
                  <Button variant="outline" className="w-full">
                    Explore Schemes
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-primary">AgroAI</span>
          </div>
          <p className="text-muted-foreground">
            Empowering farmers with smart agricultural solutions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;