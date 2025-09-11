import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, TrendingUp, FileText, User, Target, Users, Award, Lightbulb, Shield, Globe, Heart } from "lucide-react";

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamMembers = [
    {
      name: "Raunak Jain",
      role: "Web Developer",
      expertise: "Frontend Development",
      image: "🙎‍♂️"
    },
    {
      name: "Udit Parekh",
      role: "Project Manager",
      expertise: "Project Management",
      image: "🤵"
    },
    {
      name: "Akarsh Pandey",
      role: "Research Analyst",
      expertise: "Research and Development",
      image: "🙎‍♂️"
    },
    {
      name: "Tanmay Nanda",
      role: "AI Developer",
      expertise: "Artificial Intelligence",
      image: "👨‍💼"
    }
  ];

  const values = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precision Agriculture",
      description: "Using AI to provide accurate, data-driven insights for better farming decisions."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Farmer-Centric",
      description: "Every feature is designed with the farmer's needs and challenges in mind."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Reliability",
      description: "Building a platform that farmers can depend on for their daily agricultural needs."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Sustainable Future",
      description: "Promoting sustainable farming practices for a better tomorrow."
    }
  ];

  const stats = [
    { number: "50K+", label: "Farmers Served" },
    { number: "1M+", label: "Crop Images Analyzed" },
    { number: "95%", label: "Disease Detection Accuracy" },
    { number: "24/7", label: "Support Available" }
  ];

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
              <Link to="/government-schemes" className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <FileText className="h-4 w-4" />
                <span>Govt Schemes</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-2 text-primary font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <Heart className="h-4 w-4" />
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
              <Link to="/government-schemes" className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                <FileText className="h-5 w-5" />
              </Link>
              <Link to="/about" className="p-2 text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
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
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/crop-disease" className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium">
                <Leaf className="h-5 w-5 text-primary" />
                <span>AI Crop Disease</span>
              </Link>
              <Link to="/market-analysis" className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span>Real-Time Market</span>
              </Link>
              <Link to="/government-schemes" className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium">
                <FileText className="h-5 w-5 text-success" />
                <span>Government Schemes</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-primary/10 border border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-primary">About Us</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AgroAI</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Empowering farmers with cutting-edge AI technology to revolutionize agriculture and ensure food security for future generations.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card shadow-card text-center">
              <CardContent className="p-4 sm:p-6">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">{stat.number}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <Card className="mb-8 sm:mb-12 md:mb-16 bg-gradient-card shadow-card">
          <CardContent className="p-6 sm:p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                Our mission with Agro Mitra AI is to bridge the gap between agriculture and technology. We aim to provide farmers, agri-businesses, and researchers with reliable.

                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                AI-driven insights that help improve crop yields, reduce risks, and make smarter, data-informed decisions all through a simple, accessible, and an user-friendly platform.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Target className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-primary-foreground" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-6 sm:mb-8 md:mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-6 sm:mb-8 md:mb-12">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">{member.image}</div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">{member.name}</h3>
                  <p className="text-sm sm:text-base text-primary mb-2 sm:mb-3">{member.role}</p>
                  <Badge variant="secondary" className="text-xs sm:text-sm">{member.expertise}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <Card className="mb-8 sm:mb-12 md:mb-16 bg-gradient-card shadow-card">
          <CardContent className="p-6 sm:p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="flex justify-center order-2 md:order-1">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Lightbulb className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-primary-foreground" />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Our Technology
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  We leverage state-of-the-art machine learning algorithms, computer vision, and data analytics to provide accurate, real-time insights for modern farming.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm sm:text-base text-muted-foreground">Advanced Computer Vision for Disease Detection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm sm:text-base text-muted-foreground">Real-time Market Data Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm sm:text-base text-muted-foreground">Predictive Analytics for Crop Management</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-card">
          <CardContent className="p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using AgroAI to improve their crop yields and farming efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/crop-disease">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Start Analyzing Crops
                </Button>
              </Link>
              <Link to="/market-analysis">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  View Market Prices
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
