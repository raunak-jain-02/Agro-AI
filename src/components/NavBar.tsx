import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  TrendingUp, 
  FileText, 
  User, 
  Database, 
  Info,
  MessageSquare,
  ArrowLeft 
} from "lucide-react";
import cropDiseaseIcon from "@/assets/crop-disease-nav.png";

interface NavBarProps {
  showBackButton?: boolean;
  currentPage?: string;
}

const NavBar = ({ showBackButton = false, currentPage = "" }: NavBarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`bg-card/80 border-b border-border shadow-soft sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-card/95" : "backdrop-blur-sm bg-card/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            {showBackButton && <ArrowLeft className="h-5 w-5 text-primary" />}
            <Leaf className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">AgroAI</h1>
          </Link>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/crop-disease"
              className={`flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium ${
                isActivePage("/crop-disease") 
                  ? "text-primary font-medium" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              <Leaf className="h-4 w-4" />
              <span>Crop Disease</span>
            </Link>
            <Link
              to="/market-analysis"
              className={`flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium ${
                isActivePage("/market-analysis")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Market Analysis</span>
            </Link>
            <Link
              to="/government-schemes"
              className={`flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium ${
                isActivePage("/government-schemes")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Govt Schemes</span>
            </Link>
            <Link
              to="/disease-database"
              className={`flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium ${
                isActivePage("/disease-database")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <Database className="h-4 w-4" />
              <span>Disease Database</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium ${
                isActivePage("/about")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium ${
                isActivePage("/contact")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Tablet Navigation - Centered */}
          <div className="hidden md:flex lg:hidden items-center space-x-3 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/crop-disease"
              className={`p-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                isActivePage("/crop-disease") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <img src={cropDiseaseIcon} alt="Crop Disease" className="h-5 w-5 object-contain" />
            </Link>
            <Link
              to="/market-analysis"
              className={`p-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                isActivePage("/market-analysis") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <TrendingUp className="h-5 w-5" />
            </Link>
            <Link
              to="/government-schemes"
              className={`p-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                isActivePage("/government-schemes") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <FileText className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className={`p-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                isActivePage("/about") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <Info className="h-5 w-5" />
            </Link>
            <Link
              to="/disease-database"
              className={`p-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                isActivePage("/disease-database") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <Database className="h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className={`p-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                isActivePage("/contact") ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
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
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium ${
                isActivePage("/crop-disease")
                  ? "bg-primary/10 border border-primary/20 text-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <Leaf className="h-5 w-5 text-primary" />
              <span>AI Crop Disease</span>
            </Link>
            <Link
              to="/market-analysis"
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium ${
                isActivePage("/market-analysis")
                  ? "bg-accent/10 border border-accent/20 text-accent"
                  : "hover:bg-muted/50"
              }`}
            >
              <TrendingUp className="h-5 w-5 text-accent" />
              <span>Real-Time Market</span>
            </Link>
            <Link
              to="/government-schemes"
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium ${
                isActivePage("/government-schemes")
                  ? "bg-success/10 border border-success/20 text-success"
                  : "hover:bg-muted/50"
              }`}
            >
              <FileText className="h-5 w-5 text-success" />
              <span>Government Schemes</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium ${
                isActivePage("/about")
                  ? "bg-primary/10 border border-primary/20 text-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <Info className="h-5 w-5 text-primary" />
              <span>About Us</span>
            </Link>
            <Link
              to="/disease-database"
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium ${
                isActivePage("/disease-database")
                  ? "bg-primary/10 border border-primary/20 text-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <Database className="h-5 w-5 text-primary" />
              <span>Disease Database</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-base font-medium ${
                isActivePage("/contact")
                  ? "bg-primary/10 border border-primary/20 text-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
