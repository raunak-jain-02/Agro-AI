import axios from "axios";
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Leaf, TrendingUp, FileText, Cloud, Thermometer, Droplets, Wind, Github, MessageSquare } from "lucide-react"
import cropDiseaseIcon from "@/assets/crop-disease-nav.png"
import marketAnalysisIcon from "@/assets/market-analysis-icon.jpg"
import schemesIcon from "@/assets/schemes-icon.jpg"
import NavBar from "@/components/NavBar"

interface WeatherData {
  temperature: number;
  humidity: number;
  wind: number;
  condition: string;
}

const Index = () => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "Our Priority"

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

  const [weather, setWeather] = useState<WeatherData | null>(null);
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
    <div className="min-h-screen bg-gradient-hero bg-pattern">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Award Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8 animate-slide-up hover-glow">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse-slow" />
            <span className="text-sm sm:text-base font-semibold text-primary">
              🌟 Rated #1 Agricultural AI Platform of 2025
            </span>
          </div>

          {/* Main Hero Content */}
          <div className="relative mb-6 sm:mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
              Your Farm,
              <br />
              <span className="text-gradient">
                {displayedText}
                {currentIndex < fullText.length && <span className="typewriter-cursor">|</span>}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 animate-slide-up">
              🌱 Experience seamless agriculture with AI-powered crop analysis and instant connections to market insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 animate-scale-in">
              <Link to="/crop-disease">
                <Button
                  size="lg"
                  className="btn-primary-enhanced px-8 sm:px-10 py-4 text-base sm:text-lg w-full sm:w-auto hover-lift"
                >
                  🚀 Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 sm:px-10 py-4 text-base sm:text-lg w-full sm:w-auto border-gradient hover-lift hover-glow">
                  📚 Learn More
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 px-4 animate-fade-in">
            🌾 Get instant crop disease analysis, real-time market prices, and access to government schemes - all designed
            specifically for farmers like you.
          </p>

          {/* Weather Widget */}
          <Card className="mb-8 sm:mb-10 md:mb-12 card-enhanced shadow-card mx-4 sm:mx-0 animate-slide-up hover-lift">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0">
            <Link to="/crop-disease" className="animate-fade-in">
              <Card className="group card-enhanced h-full hover-lift">
                <CardHeader className="text-center p-6 sm:p-8">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Leaf className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse-slow" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl text-gradient">
                    🔬 AI Crop Disease
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6 sm:p-8 pt-0">
                  <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Upload crop photos and get instant disease diagnosis with treatment recommendations
                  </p>
                  <Button className="w-full btn-primary-enhanced hover-lift transition-transform duration-300 group-hover:scale-105 hover:scale-105 text-sm sm:text-base">
                    🌱 Analyze Crops
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/market-analysis" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Card className="group card-enhanced h-full hover-lift">
                <CardHeader className="text-center p-6 sm:p-8">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-accent-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-pulse-slow" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl text-gradient">
                    📊 Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6 sm:p-8 pt-0">
                  <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Real-time mandi prices for crops in your area with wholesale and retail rates
                  </p>
                  <Button
                    className="w-full btn-primary-enhanced hover-lift transition-transform duration-300 group-hover:scale-105 hover:scale-105 text-sm sm:text-base"
                  >
                    💰 View Prices
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/government-schemes" className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Card className="group card-enhanced h-full hover-lift" style={{ animationDelay: '1s' }}>
                <CardHeader className="text-center p-6 sm:p-8">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-success to-green-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-success rounded-full animate-pulse-slow" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl text-gradient">
                    🏛️ Government Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6 sm:p-8 pt-0">
                  <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    Discover available schemes and check your eligibility for government benefits
                  </p>
                  <Button
                    className="w-full btn-primary-enhanced hover-lift transition-transform duration-300 group-hover:scale-105 hover:scale-105 text-sm sm:text-base"
                  >
                    📋 Explore Schemes
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 border-t border-primary/20 py-16 sm:py-20 animate-fade-in relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3 animate-scale-in">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center animate-rotate-slow shadow-lg">
                  <Leaf className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-gradient">AgroAI</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                🌾 Your trusted partner for reliable agricultural insights and connecting with farming professionals. We
                combine AI technology with agricultural expertise to provide accurate information when you need it most.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3">
                <a
                  href="https://github.com/raunak-jain-02"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AgroAI on GitHub"
                  className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer hover-lift shadow-md"
                >
                  <Github className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://x.com/raunak_jain_02"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AgroAI on X"
                  className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer hover-lift shadow-md"
                >
                  <span className="text-white text-sm font-bold">𝕏</span>
                </a>
                <a
                  href="https://www.instagram.com/_raunak1029__?igsh=MXJpbG52dHVodXRi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AgroAI on Instagram"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer hover-lift shadow-md"
                >
                  <span className="text-white text-sm font-bold">ig</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/raunak-jain-ba2a4920a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AgroAI on LinkedIn"
                  className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer hover-lift shadow-md"
                >
                  <span className="text-white text-sm font-bold">in</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary border-l-4 border-primary pl-3 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quick Links
              </h3>
              <div className="space-y-3">
                <Link to="/crop-disease" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">
                  🔬 Crop Disease Analysis
                </Link>
                <Link to="/market-analysis" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">
                  📊 Market Analysis
                </Link>
                <Link to="/buy-sell-crops" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">
                  🛒 Buy/Sell Crops
                </Link>
                <Link to="/government-schemes" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">
                  🏛️ Government Schemes
                </Link>
                <Link to="/disease-database" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">
                  🗄️ Disease Database
                </Link>
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">
                  ℹ️ About Us
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 transform">
                  📞 Contact Us
                </Link>
              </div>
            </div>

            {/* Upcoming Features */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-accent border-l-4 border-accent pl-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Coming Soon
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm">🌱 Smart Irrigation System</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm">📱 Mobile App (iOS/Android)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm">🤖 AI Chat Assistant</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm">📈 Weather Forecasting</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm">💰 Crop Insurance Calculator</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm">🚚 Supply Chain Tracking</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-success border-l-4 border-success pl-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Get In Touch
              </h3>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start space-x-3 group">
                  <div className="w-5 h-5 mt-0.5 text-success group-hover:text-primary transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Email Us</p>
                    <a href="mailto:support@agroai.com" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300">
                      support@agroai.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3 group">
                  <div className="w-5 h-5 mt-0.5 text-success group-hover:text-primary transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Call Us</p>
                    <a href="tel:+919667811511" className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300">
                      +91 9667811511
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3 group">
                  <div className="w-5 h-5 mt-0.5 text-success group-hover:text-primary transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Visit Us</p>
                    <p className="text-sm font-medium text-foreground">
                      Agriculture Avenue, Tech District<br />
                      Vellore, Tamil Nadu - 632001<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start space-x-3 group">
                  <div className="w-5 h-5 mt-0.5 text-success group-hover:text-primary transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Hours</p>
                    <p className="text-sm font-medium text-foreground">
                      Mon-Fri: 8am - 8pm<br />
                      Weekend: 10am - 4pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-primary/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright & Compliance */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-bounce-gentle"></div>
                  <span>✅ Compliant with Agricultural Data Protection Guidelines</span>
                </div>
                <div className="hidden md:block w-px h-4 bg-border"></div>
                <div className="text-center md:text-left">
                  <p>© 2025 AgroAI. All rights reserved.</p>
                  <p>Built with ❤️ by <span className="text-primary font-medium">Raunak Jain</span></p>
                </div>
              </div>

              {/* Additional Links */}
              <div className="flex items-center space-x-6 text-sm">
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
