import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Upload, Camera, Download, Leaf, AlertTriangle, CheckCircle, Heart, Database, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { geminiModel } from "@/lib/gemini";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";

// Function to convert file to base64 with proper format
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix to get just the base64 data
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Function to create generative part for Gemini
function createGenerativePart(base64Data: string, mimeType: string) {
  return {
    inlineData: {
      data: base64Data,
      mimeType: mimeType
    },
  };
}

const CropDisease = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const validateAndProcessFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return false;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return false;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setAnalysisResult(null); // Clear previous results
    };
    reader.onerror = () => {
      toast({
        title: "Error reading file",
        description: "Failed to read the selected image",
        variant: "destructive",
      });
    };
    reader.readAsDataURL(file);
    return true;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      validateAndProcessFile(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage || !selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload a crop image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Convert file to base64
      const base64Data = await fileToBase64(selectedFile);
      
      // Create the generative part
      const imagePart = createGenerativePart(base64Data, selectedFile.type);
      
      // Enhanced prompt for better results
      const prompt = `You are an expert agricultural pathologist. Analyze this crop image for diseases, pests, or health issues. 

Please provide your analysis in the following JSON format:
{
  "disease": "Name of the identified disease/condition",
  "confidence": 85,
  "severity": "Low/Medium/High",
  "description": "Detailed description of the condition and symptoms observed",
  "treatment": [
    "Step 1 of treatment",
    "Step 2 of treatment",
    "Step 3 of treatment"
  ],
  "prevention": [
    "Prevention tip 1",
    "Prevention tip 2",
    "Prevention tip 3"
  ]
}

If no disease is detected, respond with:
{
  "disease": "Healthy",
  "confidence": 95,
  "severity": "None",
  "description": "The crop appears to be healthy with no visible signs of disease or pest damage.",
  "treatment": ["Continue regular care and monitoring"],
  "prevention": ["Maintain current care practices", "Regular monitoring for early detection", "Proper watering and fertilization"]
}

Analyze the image carefully and provide accurate information based on visible symptoms.`;

      console.log("Sending request to Gemini...");
      
      // Generate content with both prompt and image
      const result = await geminiModel.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = await response.text();
      
      console.log("Raw response:", text);
      
      // Check if API key is not set
      if (text.includes("AI features are currently unavailable") || text.includes("VITE_GEMINI_API_KEY")) {
        // Provide demo results when API key is not set
        const demoResults = {
          disease: "Leaf Spot Disease",
          confidence: 85,
          severity: "Medium",
          description: "This appears to be a fungal leaf spot disease. The symptoms include circular brown spots with yellow halos on the leaves. This is commonly caused by fungal pathogens and can spread rapidly in humid conditions.",
          treatment: [
            "Remove and destroy infected leaves immediately",
            "Apply fungicide containing copper or chlorothalonil",
            "Improve air circulation around plants",
            "Water at the base of plants, avoiding wetting the leaves"
          ],
          prevention: [
            "Ensure proper spacing between plants for air circulation",
            "Water early in the morning to allow leaves to dry",
            "Apply preventive fungicide treatments during humid seasons",
            "Remove plant debris from around the base of plants"
          ]
        };
        
        setAnalysisResult(demoResults);
        
        toast({
          title: "Demo Analysis Complete",
          description: "This is a demo result. Set up your Gemini API key for real AI analysis.",
        });
        
        return;
      }
      
      // Clean and parse the response
      let jsonResponse = text.replace(/```json|```/g, '').trim();
      
      // Remove any leading/trailing text that might not be JSON
      const jsonStart = jsonResponse.indexOf('{');
      const jsonEnd = jsonResponse.lastIndexOf('}') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        jsonResponse = jsonResponse.substring(jsonStart, jsonEnd);
      }

      console.log("Cleaned JSON response:", jsonResponse);

      // Validate that we have valid JSON
      if (!jsonResponse.startsWith('{') || !jsonResponse.endsWith('}')) {
        throw new Error("INVALID_JSON_RESPONSE");
      }

      const parsedResult = JSON.parse(jsonResponse);

      // Validate the parsed result has required fields
      if (!parsedResult.disease || !parsedResult.confidence) {
        throw new Error("Invalid response format from AI model");
      }

      setAnalysisResult(parsedResult);
      
      toast({
        title: "Analysis complete",
        description: `Disease identified: ${parsedResult.disease}`,
      });

    } catch (error) {
      console.error("Error analyzing image:", error);
      
      let errorMessage = "An error occurred during the analysis. Please try again.";
      
      if (error instanceof Error) {
        if (error.message === 'API_KEY_NOT_SET') {
          errorMessage = "AI analysis is currently unavailable. Please set up the Gemini API key in your environment variables to enable crop disease analysis.";
        } else if (error.message === 'INVALID_JSON_RESPONSE') {
          errorMessage = "Invalid response from AI model. Please try again.";
        } else if (error.message.includes('API key')) {
          errorMessage = "API key issue. Please check your configuration.";
        } else if (error.message.includes('quota')) {
          errorMessage = "API quota exceeded. Please try again later.";
        } else if (error.message.includes('JSON')) {
          errorMessage = "Failed to parse analysis results. Please try again.";
        }
      }
      
      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadReport = () => {
    if (!analysisResult) {
      toast({
        title: "No report to download",
        description: "Please analyze an image first",
        variant: "destructive",
      });
      return;
    }

    // Create a simple text report
    const reportContent = `
CROP DISEASE ANALYSIS REPORT
============================

Disease: ${analysisResult.disease}
Confidence: ${analysisResult.confidence}%
Severity: ${analysisResult.severity}

Description:
${analysisResult.description}

Treatment Plan:
${analysisResult.treatment?.map((step: string, index: number) => `${index + 1}. ${step}`).join('\n') || 'No treatment specified'}

Prevention Tips:
${analysisResult.prevention?.map((tip: string, index: number) => `${index + 1}. ${tip}`).join('\n') || 'No prevention tips specified'}

Generated on: ${new Date().toLocaleString()}
    `;

    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crop-analysis-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Your crop analysis report has been downloaded",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} currentPage="Crop Disease Analysis" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* API Key Notice */}
          {!import.meta.env.VITE_GEMINI_API_KEY && (
            <Card className="mb-4 sm:mb-6 bg-gradient-primary text-primary-foreground shadow-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">AI Analysis Setup Required</h3>
                    <p className="text-sm opacity-90 mb-3">
                      To enable real AI-powered crop disease analysis, please set up your Gemini API key. 
                      Currently showing demo results for testing purposes.
                    </p>
                    <div className="text-xs opacity-75">
                      <p>To set up: Create a .env file in your project root and add:</p>
                      <code className="bg-primary-foreground/20 px-2 py-1 rounded text-xs">VITE_GEMINI_API_KEY=your_api_key_here</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Upload Section */}
          <Card className="mb-4 sm:mb-6 md:mb-8 bg-gradient-card shadow-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Upload Crop Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div 
                ref={dropZoneRef}
                className={cn(
                  "border-2 border-dashed border-border rounded-lg p-3 sm:p-4 md:p-8 text-center transition-colors",
                  isDragging && "border-primary bg-primary/5"
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
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
                    <Upload className={cn(
                      "h-12 md:h-16 w-12 md:w-16 mx-auto transition-colors",
                      isDragging ? "text-primary" : "text-muted-foreground"
                    )} />
                    <div>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button variant="outline" className="cursor-pointer w-full md:w-auto" onClick={() => fileInputRef.current?.click()}>
                        Choose Image
                      </Button>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground px-2">
                      Upload a clear photo of your crop showing any visible symptoms
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Drag and drop an image here or click the button above
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
                      {analysisResult.treatment && analysisResult.treatment.map((step: string, index: number) => (
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
                      {analysisResult.prevention && analysisResult.prevention.map((tip: string, index: number) => (
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
                  Download Report
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