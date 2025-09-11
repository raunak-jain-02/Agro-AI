import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Leaf, User, FileText, Heart, TrendingUp } from "lucide-react";
import { diseaseData } from "@/data/disease-data";

const DiseaseDatabase = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredDiseases = diseaseData.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.affectedCrops.some((crop) =>
        crop.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
              <Link to="/disease-database" className="flex items-center space-x-2 text-primary font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-3 py-2 rounded-md text-sm font-medium">
                <Heart className="h-4 w-4" />
                <span>Disease Database</span>
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
              <Link to="/disease-database" className="p-2 text-primary transition-all duration-300 hover:-translate-y-1 hover:scale-105">
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
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-4 sm:mb-6 md:mb-8 bg-gradient-card shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Search Disease Database
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <Input
                placeholder="Search by disease name or affected crop..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDiseases.map((disease, index) => (
              <Card key={index} className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle>{disease.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Affected Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {disease.affectedCrops.map((crop, i) => (
                        <Badge key={i} variant="secondary">{crop}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Symptoms</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {disease.symptoms.map((symptom, i) => (
                        <li key={i}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prevention</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {disease.prevention.map((prevent, i) => (
                        <li key={i}>{prevent}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Treatment</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {disease.treatment.map((treat, i) => (
                        <li key={i}>{treat}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDatabase;
