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
import { FadeInUp, FadeInDown, FadeInLeft, FadeInRight, ScaleIn, StaggerContainer, StaggerItem } from "@/components/animations/AnimationWrapper"
import { FloatingShapes, GeometricShapes, AnimatedGradient } from "@/components/animations/BackgroundAnimations"
import { motion } from "framer-motion"

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
    <div className="min-h-screen bg-gradient-hero bg-pattern relative overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0">
        <AnimatedGradient />
        <FloatingShapes />
        <GeometricShapes />
      </div>
      
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 lg:px-6 z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Award Badge */}
          <FadeInDown delay={0.2}>
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8 hover-glow cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-3 h-3 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-sm sm:text-base font-semibold text-primary">
                🌟 Rated #1 Agricultural AI Platform of 2025
              </span>
            </motion.div>
          </FadeInDown>

          {/* Main Hero Content */}
          <StaggerContainer className="relative mb-6 sm:mb-8" staggerChildren={0.2} delayChildren={0.4}>
            <StaggerItem>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Your Farm,
                </motion.span>
                <br />
                <motion.span 
                  className="text-gradient"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                >
                  {displayedText}
                  {currentIndex < fullText.length && (
                    <motion.span 
                      className="typewriter-cursor"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    >
                      |
                    </motion.span>
                  )}
                </motion.span>
              </h1>
            </StaggerItem>
            
            <StaggerItem>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                🌱 Experience seamless agriculture with AI-powered crop analysis and instant connections to market insights.
              </p>
            </StaggerItem>

            {/* CTA Buttons */}
            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                <Link to="/crop-disease">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button
                      size="lg"
                      className="btn-primary-enhanced px-8 sm:px-10 py-4 text-base sm:text-lg w-full sm:w-auto relative overflow-hidden group"
                    >
                      <motion.span
                        className="relative z-10"
                        initial={{ x: 0 }}
                        whileHover={{ x: 2 }}
                      >
                        🚀 Get Started
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-light/20 to-primary/0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/about">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 sm:px-10 py-4 text-base sm:text-lg w-full sm:w-auto border-gradient hover-glow relative overflow-hidden group"
                    >
                      <motion.span
                        className="relative z-10"
                        initial={{ x: 0 }}
                        whileHover={{ x: 2 }}
                      >
                        📚 Learn More
                      </motion.span>
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeInUp delay={1}>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 px-4">
              🌾 Get instant crop disease analysis, real-time market prices, and access to government schemes - all designed
              specifically for farmers like you.
            </p>
          </FadeInUp>

          {/* Weather Widget */}
          <ScaleIn delay={1.2}>
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card className="mb-8 sm:mb-10 md:mb-12 card-enhanced shadow-card mx-4 sm:mx-0">
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
            </motion.div>
          </ScaleIn>

          {/* Feature Cards */}
          <StaggerContainer 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0"
            staggerChildren={0.2}
            delayChildren={1.5}
          >
            <StaggerItem>
              <Link to="/crop-disease">
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card className="group card-enhanced h-full relative overflow-hidden">
                    {/* Background Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <CardHeader className="text-center p-6 sm:p-8 relative z-10">
                      <div className="relative">
                        <motion.div 
                          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-primary flex items-center justify-center"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5,
                            boxShadow: "0 0 25px rgba(34, 197, 94, 0.4)"
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Leaf className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
                          </motion.div>
                        </motion.div>
                        <motion.div 
                          className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl text-gradient">
                        🔬 AI Crop Disease
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center p-6 sm:p-8 pt-0 relative z-10">
                      <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                        Upload crop photos and get instant disease diagnosis with treatment recommendations
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="w-full btn-primary-enhanced text-sm sm:text-base relative overflow-hidden">
                          <span className="relative z-10">
                            🌱 Analyze Crops
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary-light/20 via-primary-light/40 to-primary-light/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link to="/market-analysis">
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card className="group card-enhanced h-full relative overflow-hidden">
                    {/* Background Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <CardHeader className="text-center p-6 sm:p-8 relative z-10">
                      <div className="relative">
                        <motion.div 
                          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: -5,
                            boxShadow: "0 0 25px rgba(251, 146, 60, 0.4)"
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-accent-foreground" />
                          </motion.div>
                        </motion.div>
                        <motion.div 
                          className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        />
                      </div>
                      <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl text-gradient">
                        📈 Market Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center p-6 sm:p-8 pt-0 relative z-10">
                      <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                        Real-time mandi prices for crops in your area with wholesale and retail rates
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="w-full btn-primary-enhanced text-sm sm:text-base relative overflow-hidden">
                          <span className="relative z-10">
                            💰 View Prices
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link to="/government-schemes">
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Card className="group card-enhanced h-full relative overflow-hidden">
                    {/* Background Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <CardHeader className="text-center p-6 sm:p-8 relative z-10">
                      <div className="relative">
                        <motion.div 
                          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-success to-green-400 flex items-center justify-center"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5,
                            boxShadow: "0 0 25px rgba(34, 197, 94, 0.4)"
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          <motion.div
                            animate={{ 
                              rotateY: [0, 180, 360]
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                          >
                            <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                          </motion.div>
                        </motion.div>
                        <motion.div 
                          className="absolute -top-2 -right-2 w-4 h-4 bg-success rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        />
                      </div>
                      <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl text-gradient">
                        🏦 Government Schemes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center p-6 sm:p-8 pt-0 relative z-10">
                      <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                        Discover available schemes and check your eligibility for government benefits
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="w-full btn-primary-enhanced text-sm sm:text-base relative overflow-hidden">
                          <span className="relative z-10">
                            📋 Explore Schemes
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-success/20 via-success/40 to-success/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced Footer */}
      <FadeInUp delay={0.2}>
        <footer className="bg-gradient-to-br from-primary/8 via-accent/5 to-primary/8 border-t border-primary/20 py-16 sm:py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-pattern opacity-30">
            {/* Additional floating elements for footer */}
            <FloatingShapes />
          </div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        
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
        </div>
      </footer>
      </FadeInUp>
    </div>
  );
};

export default Index;
