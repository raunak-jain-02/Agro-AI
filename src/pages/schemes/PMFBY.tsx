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
  Shield,
  Clock,
  Info,
  AlertTriangle,
  Droplets,
  Sun,
  Zap
} from "lucide-react";
import NavBar from "@/components/NavBar";

const PMFBY = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    aadharNumber: "",
    bankAccount: "",
    ifscCode: "",
    mobileNumber: "",
    email: "",
    landHolding: "",
    state: "",
    district: "",
    village: "",
    pincode: "",
    cropType: "",
    season: "",
    landRecords: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PMFBY Application submitted:", formData);
    alert("Crop Insurance Application submitted successfully! You will receive a confirmation SMS shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} currentPage="PMFBY Scheme" />

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
              <Badge className="bg-blue-500 text-white px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Insurance
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Pradhan Mantri Fasal Bima Yojana
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Comprehensive crop insurance scheme providing protection against crop loss due to natural calamities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scheme Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Benefits */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Up to ₹2,00,000</p>
                        <p className="text-sm text-muted-foreground">Maximum coverage</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold">All crops covered</p>
                        <p className="text-sm text-muted-foreground">Food & oilseeds</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                        <Sun className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-semibold">Weather protection</p>
                        <p className="text-sm text-muted-foreground">Drought, flood, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <Zap className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">Pest & disease</p>
                        <p className="text-sm text-muted-foreground">Complete coverage</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coverage Details */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Coverage Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Risks Covered</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Natural calamities (drought, flood, cyclone)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Pests and diseases
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Fire and lightning
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Hailstorm and frost
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Premium Rates</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Kharif crops: 2% of sum insured
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Rabi crops: 1.5% of sum insured
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Commercial crops: 5% of sum insured
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Government pays remaining premium
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
                      <span>Valid Aadhaar number and bank account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Land records and crop details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Application must be submitted before sowing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Premium payment within specified time</span>
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
                        <p className="font-semibold">Visit Insurance Company</p>
                        <p className="text-sm text-muted-foreground">Contact your nearest insurance company or CSC</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                      <div>
                        <p className="font-semibold">Fill Application Form</p>
                        <p className="text-sm text-muted-foreground">Provide crop details, land information, and personal details</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                      <div>
                        <p className="font-semibold">Pay Premium</p>
                        <p className="text-sm text-muted-foreground">Pay your share of premium (1.5-5% of sum insured)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                      <div>
                        <p className="font-semibold">Crop Monitoring</p>
                        <p className="text-sm text-muted-foreground">Insurance company monitors your crop throughout the season</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                      <div>
                        <p className="font-semibold">Claim Settlement</p>
                        <p className="text-sm text-muted-foreground">In case of loss, claim is settled within 2 weeks</p>
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
                    Insurance Application
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
                      <Label htmlFor="cropType">Crop Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("cropType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="maize">Maize</SelectItem>
                          <SelectItem value="sugarcane">Sugarcane</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                          <SelectItem value="soybean">Soybean</SelectItem>
                          <SelectItem value="groundnut">Groundnut</SelectItem>
                          <SelectItem value="mustard">Mustard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="season">Season *</Label>
                      <Select onValueChange={(value) => handleInputChange("season", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                          <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                          <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="bankAccount">Bank Account Number *</Label>
                      <Input
                        id="bankAccount"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                        placeholder="Account number"
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

                    <Button type="submit" className="w-full bg-gradient-primary">
                      Apply for Insurance
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
                    <li>• Apply before sowing your crop for the season</li>
                    <li>• Premium rates vary by crop and season</li>
                    <li>• Government pays the remaining premium after your contribution</li>
                    <li>• Claims are settled based on crop cutting experiments or weather data</li>
                    <li>• Keep all documents ready for verification</li>
                    <li>• For queries, contact PMFBY helpline: 1800-180-1551</li>
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

export default PMFBY;
