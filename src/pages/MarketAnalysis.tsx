import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Search, Leaf } from "lucide-react";

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
      <nav className="bg-card/80 backdrop-blur-sm border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-primary" />
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">AgroAI</h1>
            </Link>
            <h2 className="text-lg font-semibold text-foreground">Market Analysis</h2>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Section */}
          <Card className="mb-8 bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search Market Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
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
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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