import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle, XCircle, Search, Filter, ExternalLink, Leaf, TrendingUp, User, Heart, Database, Info } from "lucide-react";

const GovernmentSchemes = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const schemes = [
    {
      id: 1,
      name: "PM-KISAN",
      description: "Direct income support to farmer families under PM-KISAN Scheme",
      amount: "₹6,000/year",
      eligibility: "Small and marginal farmers",
      status: "eligible",
      deadline: "31st March 2024",
      category: "Income Support"
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme providing protection against crop loss",
      amount: "Up to ₹2,00,000",
      eligibility: "All farmers with cultivable land",
      status: "eligible",
      deadline: "15th April 2024",
      category: "Insurance"
    },
    {
      id: 3,
      name: "Kisan Credit Card",
      description: "Flexible and hassle-free credit to farmers for cultivation needs",
      amount: "Based on crop requirement",
      eligibility: "Land-owning farmers",
      status: "not-eligible",
      deadline: "Ongoing",
      category: "Credit"
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      description: "Free soil testing and recommendations for nutrient management",
      amount: "Free service",
      eligibility: "All farmers",
      status: "eligible",
      deadline: "Ongoing",
      category: "Soil Health"
    },
    {
      id: 5,
      name: "Pradhan Mantri Krishi Sinchai Yojana",
      description: "Water conservation and irrigation efficiency improvement",
      amount: "Up to ₹50,000 subsidy",
      eligibility: "Small and marginal farmers",
      status: "eligible",
      deadline: "30th June 2024",
      category: "Irrigation"
    },
    {
      id: 6,
      name: "National Agriculture Market (e-NAM)",
      description: "Online trading platform for agricultural commodities",
      amount: "Free registration",
      eligibility: "All farmers and traders",
      status: "eligible",
      deadline: "Ongoing",
      category: "Marketing"
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "eligible") {
      return (
        <Badge className="bg-success text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Eligible
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Not Eligible
        </Badge>
      );
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Income Support": "bg-primary",
      "Insurance": "bg-blue-500",
      "Credit": "bg-purple-500",
      "Soil Health": "bg-green-500",
      "Irrigation": "bg-cyan-500",
      "Marketing": "bg-orange-500"
    };
    return colors[category] || "bg-gray-500";
  };

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
              <Link to="/market-analysis" className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                <span>Market Analysis</span>
              </Link>
              <Link to="/government-schemes" className="flex items-center space-x-2 text-primary font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <FileText className="h-4 w-4" />
                <span>Govt Schemes</span>
              </Link>
              <Link to="/disease-database" className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <Database className="h-4 w-4" />
                <span>Disease Database</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
            </div>

            {/* Tablet Navigation - Centered */}
            <div className="hidden md:flex lg:hidden items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/crop-disease" className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Leaf className="h-5 w-5" />
              </Link>
              <Link to="/market-analysis" className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <TrendingUp className="h-5 w-5" />
              </Link>
              <Link to="/government-schemes" className="p-2 text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <FileText className="h-5 w-5" />
              </Link>
              <Link to="/about" className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Info className="h-5 w-5" />
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
              <Link to="/market-analysis" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="font-medium">Real-Time Market</span>
              </Link>
              <Link to="/government-schemes" className="flex items-center space-x-3 p-3 rounded-lg bg-success/10 border border-success/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <FileText className="h-5 w-5 text-success" />
                <span className="font-medium text-success">Government Schemes</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <Info className="h-5 w-5 text-primary" />
                <span className="font-medium">About Us</span>
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
                Find Suitable Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Schemes</label>
                  <Input placeholder="Enter scheme name..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income Support</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="soil">Soil Health</SelectItem>
                      <SelectItem value="irrigation">Irrigation</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-gradient-primary">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter Results
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground">Total Schemes</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-success">5</p>
                <p className="text-sm text-muted-foreground">Eligible For</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-accent">₹2.6L</p>
                <p className="text-sm text-muted-foreground">Max Benefit</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-warning">3</p>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </CardContent>
            </Card>
          </div>

          {/* Schemes Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {schemes.map((scheme) => (
              <Card key={scheme.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{scheme.name}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getCategoryColor(scheme.category)} text-white`}>
                          {scheme.category}
                        </Badge>
                        {getStatusBadge(scheme.status)}
                      </div>
                    </div>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{scheme.description}</p>
                  
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Benefit Amount</p>
                      <p className="text-accent font-semibold">{scheme.amount}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Deadline</p>
                      <p className="text-muted-foreground">{scheme.deadline}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-foreground text-sm">Eligibility</p>
                    <p className="text-muted-foreground text-sm">{scheme.eligibility}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      disabled={scheme.status !== "eligible"}
                    >
                      {scheme.status === "eligible" ? "Apply Now" : "Not Eligible"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <Card className="mt-8 bg-gradient-primary text-primary-foreground shadow-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Need Help with Applications?</h3>
              <p className="opacity-90 mb-4">
                Our agricultural experts can help you understand eligibility criteria and application processes.
              </p>
              <Button variant="secondary">
                Get Expert Help
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;