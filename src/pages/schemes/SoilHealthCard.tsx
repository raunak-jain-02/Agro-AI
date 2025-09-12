import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle, 
  FileText, 
  Download, 
  Calendar, 
  User, 
  MapPin, 
  Phone,
  Mail,
  Leaf,
  Clock,
  Info,
  AlertTriangle,
  TestTube,
  Droplets,
  Sun
} from "lucide-react";
import NavBar from "@/components/NavBar";

const SoilHealthCard = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    aadharNumber: "",
    mobileNumber: "",
    email: "",
    landHolding: "",
    state: "",
    district: "",
    village: "",
    pincode: "",
    soilType: "",
    currentCrops: "",
    landRecords: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Soil Health Card Application submitted:", formData);
    alert("Soil Health Card Application submitted successfully! You will receive a confirmation SMS shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} currentPage="Soil Health Card" />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/government-schemes">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Schemes
                </Button>
              </Link>
              <Badge className="bg-green-500 text-white px-4 py-2">
                <Leaf className="h-4 w-4 mr-2" />
                Soil Health
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Soil Health Card Scheme
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Free soil testing and recommendations for nutrient management to improve soil health and crop productivity
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scheme Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Benefits */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-green-500" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                        <TestTube className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Free soil testing</p>
                        <p className="text-sm text-muted-foreground">Complete analysis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold">Nutrient recommendations</p>
                        <p className="text-sm text-muted-foreground">Crop-specific advice</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">Water management</p>
                        <p className="text-sm text-muted-foreground">Irrigation guidance</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                        <Sun className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-semibold">Increased yield</p>
                        <p className="text-sm text-muted-foreground">Better productivity</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testing Parameters */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Soil Testing Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Physical Properties</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Soil texture and structure
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Water holding capacity
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Bulk density
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Porosity
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Chemical Properties</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            pH level
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Organic carbon content
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Available nitrogen
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Available phosphorus
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Available potassium
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Micronutrients
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Criteria */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>All farmers with cultivable landholding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Valid Aadhaar number and mobile number</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Land records and ownership documents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Willingness to follow recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>No cost involved - completely free service</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Application Process */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Application Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                      <div>
                        <p className="font-semibold">Visit Soil Testing Lab</p>
                        <p className="text-sm text-muted-foreground">Contact your nearest soil testing laboratory or CSC</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                      <div>
                        <p className="font-semibold">Fill Application Form</p>
                        <p className="text-sm text-muted-foreground">Provide personal details and land information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                      <div>
                        <p className="font-semibold">Soil Sample Collection</p>
                        <p className="text-sm text-muted-foreground">Lab technician collects soil samples from your field</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                      <div>
                        <p className="font-semibold">Laboratory Analysis</p>
                        <p className="text-sm text-muted-foreground">Soil samples are analyzed for various parameters</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                      <div>
                        <p className="font-semibold">Receive Soil Health Card</p>
                        <p className="text-sm text-muted-foreground">Get detailed report with recommendations within 15 days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card shadow-card sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Soil Testing Request
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="farmerName">Farmer Name *</Label>
                      <Input
                        id="farmerName"
                        value={formData.farmerName}
                        onChange={(e) => handleInputChange("farmerName", e.target.value)}
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="aadharNumber">Aadhaar Number *</Label>
                      <Input
                        id="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                        placeholder="12-digit Aadhaar number"
                        maxLength={12}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="landHolding">Land Holding (in acres) *</Label>
                      <Input
                        id="landHolding"
                        type="number"
                        value={formData.landHolding}
                        onChange={(e) => handleInputChange("landHolding", e.target.value)}
                        placeholder="Enter land area"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="soilType">Soil Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("soilType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="sandy">Sandy</SelectItem>
                          <SelectItem value="loamy">Loamy</SelectItem>
                          <SelectItem value="silty">Silty</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="currentCrops">Current Crops *</Label>
                      <Input
                        id="currentCrops"
                        value={formData.currentCrops}
                        onChange={(e) => handleInputChange("currentCrops", e.target.value)}
                        placeholder="e.g., Wheat, Rice, Maize"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="mobileNumber">Mobile Number *</Label>
                      <Input
                        id="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="punjab">Punjab</SelectItem>
                          <SelectItem value="haryana">Haryana</SelectItem>
                          <SelectItem value="up">Uttar Pradesh</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="district">District *</Label>
                      <Input
                        id="district"
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                        placeholder="Enter district name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="village">Village *</Label>
                      <Input
                        id="village"
                        value={formData.village}
                        onChange={(e) => handleInputChange("village", e.target.value)}
                        placeholder="Enter village name"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-primary">
                      Request Soil Testing
                    </Button>

                    <div className="text-center">
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Form
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Important Information */}
          <Card className="mt-8 bg-gradient-primary text-primary-foreground shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-primary-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Important Information</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• Soil testing is completely free of cost</li>
                    <li>• Soil Health Card is valid for 3 years</li>
                    <li>• Follow recommendations to improve soil health</li>
                    <li>• Regular testing helps maintain soil fertility</li>
                    <li>• Card provides crop-specific fertilizer recommendations</li>
                    <li>• For queries, contact your nearest agriculture department</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthCard;


