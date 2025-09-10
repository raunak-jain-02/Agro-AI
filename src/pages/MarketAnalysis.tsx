import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Search, Leaf, User, FileText } from "lucide-react";

const MarketAnalysis = () => {
  const marketData = [
    {
      crop: "Wheat",
      wholesale: 2200,
      retail: 2500,
      change: +150,
      trend: "up",
      market: "Delhi Mandi"
    },
    {
      crop: "Rice",
      wholesale: 3200,
      retail: 3600,
      change: -80,
      trend: "down",
      market: "Punjab Mandi"
    },
    {
      crop: "Sugarcane",
      wholesale: 350,
      retail: 400,
      change: +25,
      trend: "up",
      market: "UP Mandi"
    },
    {
      crop: "Cotton",
      wholesale: 5800,
      retail: 6200,
      change: +200,
      trend: "up",
      market: "Gujarat Mandi"
    },
    {
      crop: "Maize",
      wholesale: 1800,
      retail: 2100,
      change: -50,
      trend: "down",
      market: "Maharashtra Mandi"
    },
    {
      crop: "Soybean",
      wholesale: 4200,
      retail: 4600,
      change: +120,
      trend: "up",
      market: "MP Mandi"
    }
  ];

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
              <Link to="/market-analysis" className="flex items-center space-x-2 text-primary font-medium">
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

            {/* Mobile Page Title & Menu */}
            <div className="flex items-center space-x-2 md:hidden">
              <h2 className="text-sm font-semibold text-foreground">Market Analysis</h2>
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
              <Link to="/market-analysis" className="flex items-center space-x-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="font-medium text-accent">Real-Time Market</span>
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
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Section */}
          <Card className="mb-6 md:mb-8 bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Search className="h-5 w-5 text-primary" />
                Search Market Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
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
                      <th className="text-left py-3 px-4 font-semibold">Crop</th>
                      <th className="text-left py-3 px-4 font-semibold">Wholesale</th>
                      <th className="text-left py-3 px-4 font-semibold">Retail</th>
                      <th className="text-left py-3 px-4 font-semibold">Change</th>
                      <th className="text-left py-3 px-4 font-semibold">Market</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.map((item, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="font-medium">{item.crop}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold">₹{item.wholesale.toLocaleString()}</td>
                        <td className="py-4 px-4 font-semibold">₹{item.retail.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <Badge 
                            variant={item.trend === "up" ? "default" : "destructive"}
                            className="flex items-center gap-1"
                          >
                            {item.trend === "up" ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {item.trend === "up" ? "+" : ""}₹{Math.abs(item.change)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {item.market}
                          </div>
                        </td>
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