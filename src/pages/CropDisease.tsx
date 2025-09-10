import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Camera, Download, Leaf, AlertTriangle, CheckCircle, TrendingUp, FileText, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CropDisease = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload a crop image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual Gemini API call)
    setTimeout(() => {
      setAnalysisResult({
        disease: "Late Blight",
        confidence: 87,
        severity: "Moderate",
        description: "Late blight is a fungal disease that affects potato and tomato plants, causing dark spots on leaves and stems.",
        treatment: [
          "Remove affected leaves immediately",
          "Apply copper-based fungicide spray",
          "Improve air circulation around plants",
          "Avoid overhead watering"
        ],
        prevention: [
          "Plant disease-resistant varieties",
          "Ensure proper spacing between plants",
          "Apply preventive fungicide during wet seasons",
          "Remove plant debris after harvest"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const downloadReport = () => {
    toast({
      title: "Download started",
      description: "Your crop analysis report is being prepared for offline access",
    });
  };

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
              <Link to="/crop-disease" className="flex items-center space-x-2 text-primary font-medium">
                <Leaf className="h-4 w-4" />
                <span>Crop Disease</span>
              </Link>
              <Link to="/market-analysis" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
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
              <h2 className="text-sm font-semibold text-foreground">Crop Disease</h2>
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
              <Link to="/crop-disease" className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">AI Crop Disease</span>
              </Link>
              <Link to="/market-analysis" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="font-medium">Real-Time Market</span>
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
        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          <Card className="mb-6 md:mb-8 bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Camera className="h-5 w-5 text-primary" />
                Upload Crop Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-4 md:p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected crop" 
                      className="max-w-full md:max-w-md mx-auto rounded-lg shadow-soft"
                    />
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="bg-gradient-primary w-full md:w-auto"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Disease"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 md:h-16 w-12 md:w-16 text-muted-foreground mx-auto" />
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button variant="outline" className="cursor-pointer w-full md:w-auto">
                          Choose Image
                        </Button>
                      </label>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground px-2">
                      Upload a clear photo of your crop showing any visible symptoms
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Disease Detection Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Identified Disease</h3>
                      <p className="text-2xl font-bold text-destructive mb-2">{analysisResult.disease}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Confidence:</span>
                          <span className="font-semibold">{analysisResult.confidence}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Severity:</span>
                          <span className="font-semibold text-warning">{analysisResult.severity}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Description</h3>
                      <p className="text-muted-foreground">{analysisResult.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                      Treatment Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.treatment.map((step: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-success">
                      <CheckCircle className="h-5 w-5" />
                      Prevention Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.prevention.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Leaf className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center pt-4">
                <Button onClick={downloadReport} variant="outline" className="gap-2 w-full md:w-auto">
                  <Download className="h-4 w-4" />
                  Download PDF Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropDisease;