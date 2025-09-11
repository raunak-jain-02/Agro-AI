"use client"

import axios from "axios";
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Leaf, TrendingUp, FileText, User, Cloud, Thermometer, Droplets, Wind, Heart } from "lucide-react"
import cropDiseaseIcon from "@/assets/crop-disease-icon.jpg"
import marketAnalysisIcon from "@/assets/market-analysis-icon.jpg"
import schemesIcon from "@/assets/schemes-icon.jpg"



const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "Our Priority"

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 150) // 150ms delay between each character

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  // Restart animation when component mounts
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [])

const [weather, setWeather] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchWeather = async () => {
    try {
      const apiKey = "ff421bf921c9fd1149571dfd57e12f37"; // <-- replace with your key
      const city = "Ludhiana"; // or make it dynamic later
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      const data = response.data;
      setWeather({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].description,
      });
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchWeather();

  // refresh every 10 minutes
  const interval = setInterval(fetchWeather, 600000);
  return () => clearInterval(interval);
}, []);


  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav
        className={`bg-card/80 border-b border-border shadow-soft sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-card/95" : "backdrop-blur-sm bg-card/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <Leaf className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">AgroAI</h1>
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/crop-disease"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Leaf className="h-4 w-4" />
                <span>Crop Disease</span>
              </Link>
              <Link
                to="/market-analysis"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Market Analysis</span>
              </Link>
              <Link
                to="/government-schemes"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium"
              >
                <FileText className="h-4 w-4" />
                <span>Govt Schemes</span>
              </Link>
              <Link
                to="/disease-database"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Heart className="h-4 w-4" />
                <span>Disease Database</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Heart className="h-4 w-4" />
                <span>About</span>
              </Link>

            </div>

            {/* Tablet Navigation - Centered */}
            <div className="hidden md:flex lg:hidden items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/crop-disease"
                className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <Leaf className="h-5 w-5" />
              </Link>
              <Link
                to="/market-analysis"
                className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <TrendingUp className="h-5 w-5" />
              </Link>
              <Link
                to="/government-schemes"
                className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <FileText className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="p-2 text-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <Heart className="h-5 w-5" />
              </Link>
            </div>

            {/* Profile Button - Right */}
            <div className="flex items-center">
              <Link to="/profile">
                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all duration-300 hover:-translate-y-1 hover:scale-105 bg-transparent"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden xl:inline">Profile</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/crop-disease"
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium"
              >
                <Leaf className="h-5 w-5 text-primary" />
                <span>AI Crop Disease</span>
              </Link>
              <Link
                to="/market-analysis"
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium"
              >
                <TrendingUp className="h-5 w-5 text-accent" />
                <span>Real-Time Market</span>
              </Link>
              <Link
                to="/government-schemes"
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium"
              >
                <FileText className="h-5 w-5 text-success" />
                <span>Government Schemes</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium"
              >
                <Heart className="h-5 w-5 text-primary" />
                <span>About Us</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Award Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              Rated #1 Agricultural AI Platform of 2025
            </span>
          </div>

          {/* Main Hero Content */}
          <div className="relative mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
              Your Farm,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {displayedText}
                {currentIndex < fullText.length && <span className="typewriter-cursor">|</span>}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              Experience seamless agriculture with AI-powered crop analysis and instant connections to market insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 px-4">
            Get instant crop disease analysis, real-time market prices, and access to government schemes - all designed
            specifically for farmers like you.
          </p>

          {/* Weather Widget */}
          <Card className="mb-8 sm:mb-10 md:mb-12 bg-gradient-card shadow-card mx-4 sm:mx-0">
  <CardHeader className="pb-3 sm:pb-4">
    <CardTitle className="flex items-center justify-center gap-2 text-base sm:text-lg">
      <Cloud className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      Today's Weather
    </CardTitle>
  </CardHeader>
  <CardContent className="px-3 sm:px-6">
    {loading ? (
      <p className="text-center text-muted-foreground">Loading weather...</p>
    ) : weather ? (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="text-center p-2 sm:p-3">
          <Thermometer className="h-5 w-5 sm:h-6 sm:w-6 text-accent mx-auto mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-muted-foreground">Temperature</p>
          <p className="font-semibold text-sm sm:text-base">{weather.temperature}°C</p>
        </div>
        <div className="text-center p-2 sm:p-3">
          <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mx-auto mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-muted-foreground">Humidity</p>
          <p className="font-semibold text-sm sm:text-base">{weather.humidity}%</p>
        </div>
        <div className="text-center p-2 sm:p-3">
          <Wind className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-muted-foreground">Wind</p>
          <p className="font-semibold text-sm sm:text-base">{weather.wind} km/h</p>
        </div>
        <div className="text-center p-2 sm:p-3">
          <Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mx-auto mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-muted-foreground">Condition</p>
          <p className="font-semibold text-sm sm:text-base capitalize">{weather.condition}</p>
        </div>
      </div>
    ) : (
      <p className="text-center text-red-500">Failed to load weather</p>
    )}
  </CardContent>
</Card>


          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            <Link to="/crop-disease">
              <Card className="group hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card h-full border-primary/20 hover:border-primary/40">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="relative">
                    <img
                      src={cropDiseaseIcon || "/placeholder.svg"}
                      alt="Crop Disease Analysis"
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full animate-pulse" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2 text-base sm:text-lg">
                    <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    AI Crop Disease
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6 pt-0">
                  <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    Upload crop photos and get instant disease diagnosis with treatment recommendations
                  </p>
                  <Button className="w-full bg-gradient-primary hover:opacity-90 group-hover:scale-105 transition-transform duration-300 text-sm sm:text-base">
                    Analyze Crops
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/market-analysis">
              <Card className="group hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card h-full border-accent/20 hover:border-accent/40">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="relative">
                    <img
                      src={marketAnalysisIcon || "/placeholder.svg"}
                      alt="Market Analysis"
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full animate-pulse" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6 pt-0">
                  <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    Real-time mandi prices for crops in your area with wholesale and retail rates
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full group-hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                  >
                    View Prices
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/government-schemes">
              <Card className="group hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card h-full border-success/20 hover:border-success/40 sm:col-span-2 lg:col-span-1">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="relative">
                    <img
                      src={schemesIcon || "/placeholder.svg"}
                      alt="Government Schemes"
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-success rounded-full animate-pulse" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2 text-base sm:text-lg">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                    Government Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6 pt-0">
                  <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    Discover available schemes and check your eligibility for government benefits
                  </p>
                  <Button
                    variant="outline"
                    className="w-full group-hover:scale-105 transition-transform duration-300 text-sm sm:text-base bg-transparent"
                  >
                    Explore Schemes
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">AgroAI</span>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed">
                Your trusted partner for reliable agricultural insights and connecting with farming professionals. We
                combine AI technology with agricultural expertise to provide accurate information when you need it most.
              </p>
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-semibold">f</span>
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-semibold">t</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-semibold">ig</span>
                </div>
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-semibold">in</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-success">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Compliant with Agricultural Data Protection Guidelines</span>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary border-l-4 border-primary pl-3">Contact Us</h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 text-primary">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Us</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">support@agroai.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 text-primary">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call Us</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">+91 9876543210</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 text-primary">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Visit Us</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">
                      Agriculture Avenue, Tech District
                      <br />
                      Vellore , Tamil Nadu - 632001
                      <br />
                      India
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-0.5 text-primary">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operating Hours</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">
                      Monday - Friday: 8am - 8pm
                      <br />
                      Weekend: 10am - 4pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
