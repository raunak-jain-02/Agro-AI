import { useState, useEffect } from "react";
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Search, Leaf, User, FileText, Heart } from "lucide-react";

const MarketAnalysis = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=0&limit=10');
        setMarketData(response.data.records);
        setLoading(false);
      } catch (err) {
        setError('Error fetching market data.');
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className={`bg-card/80 border-b border-border shadow-soft sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-card/95' : 'backdrop-blur-sm bg-card/80'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <ArrowLeft className="h-5 w-5 text-primary" />
              <Leaf className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">AgroAI</h1>
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/crop-disease" className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <Leaf className="h-4 w-4" />
                <span>Crop Disease</span>
              </Link>
              <Link to="/market-analysis" className="flex items-center space-x-2 text-primary font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>Market Analysis</span>
              </Link>
              <Link to="/government-schemes" className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <FileText className="h-4 w-4" />
                <span>Govt Schemes</span>
              </Link>
              <Link to="/disease-database" className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <Heart className="h-4 w-4" />
                <span>Disease Database</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <Heart className="h-4 w-4" />
                <span>About</span>
              </Link>
            </div>

            {/* Tablet Navigation - Centered */}
            <div className="hidden md:flex lg:hidden items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/crop-disease" className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Leaf className="h-5 w-5" />
              </Link>
              <Link to="/market-analysis" className="p-2 text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <TrendingUp className="h-5 w-5" />
              </Link>
              <Link to="/government-schemes" className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <FileText className="h-5 w-5" />
              </Link>
              <Link to="/about" className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Heart className="h-5 w-5" />
              </Link>
              <Link to="/disease-database" className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Heart className="h-5 w-5" />
              </Link>
            </div>

            {/* Profile Button - Right */}
            <div className="flex items-center">
              <Link to="/profile">
                <Button variant="outline" size="sm" className="transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden xl:inline">Profile</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 gap-3">
              <Link to="/crop-disease" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-medium">AI Crop Disease</span>
              </Link>
              <Link to="/market-analysis" className="flex items-center space-x-3 p-3 rounded-lg bg-accent/10 border border-accent/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="font-medium text-accent">Real-Time Market</span>
              </Link>
              <Link to="/government-schemes" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <FileText className="h-5 w-5 text-success" />
                <span className="font-medium">Government Schemes</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Heart className="h-5 w-5 text-primary" />
                <span className="font-medium">About Us</span>
              </Link>
              <Link to="/disease-database" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Heart className="h-5 w-5 text-primary" />
                <span className="font-medium">Disease Database</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Section */}
          <Card className="mb-4 sm:mb-6 md:mb-8 bg-gradient-card shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Search Market Prices
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Crop</label>
                  <Input placeholder="Enter crop name..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                      <SelectItem value="mp">Madhya Pradesh</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-gradient-primary">
                    Search Prices
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Overview */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Price Increase</p>
                    <p className="text-2xl font-bold text-success">+12.5%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Markets</p>
                    <p className="text-2xl font-bold text-primary">247</p>
                  </div>
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="text-2xl font-bold text-foreground">2 min ago</p>
                  </div>
                  <div className="h-3 w-3 bg-success rounded-full animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Table */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Real-Time Mandi Prices (₹/Quintal)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Commodity</th>
                      <th className="text-left py-3 px-4 font-semibold">State</th>
                      <th className="text-left py-3 px-4 font-semibold">District</th>
                      <th className="text-left py-3 px-4 font-semibold">Market</th>
                      <th className="text-left py-3 px-4 font-semibold">Variety</th>
                      <th className="text-left py-3 px-4 font-semibold">Min Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Max Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Modal Price</th>
                      <th className="text-left py-3 px-4 font-semibold">Price Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={9} className="text-center py-8">Loading market data...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={9} className="text-center py-8 text-destructive">{error}</td>
                      </tr>
                    ) : marketData.map((item, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="py-4 px-4 font-medium">{item.commodity}</td>
                        <td className="py-4 px-4">{item.state}</td>
                        <td className="py-4 px-4">{item.district}</td>
                        <td className="py-4 px-4">{item.market}</td>
                        <td className="py-4 px-4">{item.variety}</td>
                        <td className="py-4 px-4 font-semibold">₹{parseInt(item.min_price).toLocaleString()}</td>
                        <td className="py-4 px-4 font-semibold">₹{parseInt(item.max_price).toLocaleString()}</td>
                        <td className="py-4 px-4 font-semibold">₹{parseInt(item.modal_price).toLocaleString()}</td>
                        <td className="py-4 px-4">{item.arrival_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Future Feature Teaser */}
          <Card className="mt-8 bg-gradient-primary text-primary-foreground shadow-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Coming Soon: Buy/Sell Marketplace</h3>
              <p className="opacity-90 mb-4">
                Connect directly with buyers and sellers in your area. Get the best prices for your crops!
              </p>
              <Button variant="secondary" disabled>
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;