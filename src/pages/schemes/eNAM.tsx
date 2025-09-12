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
  ShoppingCart,
  Clock,
  Info,
  AlertTriangle,
  TrendingUp,
  Globe,
  Shield
} from "lucide-react";
import NavBar from "@/components/NavBar";

const eNAM = () => {
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
    commodityType: "",
    quantity: "",
    qualityGrade: "",
    landRecords: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("e-NAM Registration submitted:", formData);
    alert("e-NAM Registration submitted successfully! You will receive a confirmation SMS shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} currentPage="e-NAM Platform" />

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
              <Badge className="bg-orange-500 text-white px-4 py-2">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Marketing
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              National Agriculture Market (e-NAM)
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Online trading platform for agricultural commodities connecting farmers directly with buyers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scheme Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Benefits */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-orange-500" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Better prices</p>
                        <p className="text-sm text-muted-foreground">Transparent pricing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Globe className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold">Wider market</p>
                        <p className="text-sm text-muted-foreground">National reach</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">Secure payments</p>
                        <p className="text-sm text-muted-foreground">Online transactions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-semibold">24/7 trading</p>
                        <p className="text-sm text-muted-foreground">Round the clock</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Features */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Platform Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Trading Features</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Online commodity trading
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Real-time price discovery
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Quality assessment
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Electronic payment
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Mobile app access
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Supported Commodities</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Cereals (Wheat, Rice, Maize)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Pulses (Chana, Moong, Urad)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Oilseeds (Mustard, Soybean)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Spices (Turmeric, Coriander)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Vegetables & Fruits
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
                      <span>All farmers and agricultural traders</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Valid Aadhaar number and mobile number</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Bank account for payments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Quality agricultural produce</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Registration is completely free</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Registration Process */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Registration Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                      <div>
                        <p className="font-semibold">Visit e-NAM Portal</p>
                        <p className="text-sm text-muted-foreground">Go to enam.gov.in or download mobile app</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                      <div>
                        <p className="font-semibold">Create Account</p>
                        <p className="text-sm text-muted-foreground">Register with Aadhaar and mobile number</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                      <div>
                        <p className="font-semibold">Complete Profile</p>
                        <p className="text-sm text-muted-foreground">Add bank details and location information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                      <div>
                        <p className="font-semibold">Verify Documents</p>
                        <p className="text-sm text-muted-foreground">Upload required documents for verification</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                      <div>
                        <p className="font-semibold">Start Trading</p>
                        <p className="text-sm text-muted-foreground">List your produce and start trading online</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card shadow-card sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    e-NAM Registration
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
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="commodityType">Commodity Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("commodityType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select commodity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cereals">Cereals</SelectItem>
                          <SelectItem value="pulses">Pulses</SelectItem>
                          <SelectItem value="oilseeds">Oilseeds</SelectItem>
                          <SelectItem value="spices">Spices</SelectItem>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quantity">Expected Quantity (kg) *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                        placeholder="Enter quantity"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="qualityGrade">Quality Grade *</Label>
                      <Select onValueChange={(value) => handleInputChange("qualityGrade", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a-grade">A Grade (Premium)</SelectItem>
                          <SelectItem value="b-grade">B Grade (Good)</SelectItem>
                          <SelectItem value="c-grade">C Grade (Fair)</SelectItem>
                          <SelectItem value="d-grade">D Grade (Average)</SelectItem>
                        </SelectContent>
                      </Select>
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
                      Register on e-NAM
                    </Button>

                    <div className="text-center">
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download App
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
                    <li>• Registration on e-NAM is completely free</li>
                    <li>• Trading charges are minimal and transparent</li>
                    <li>• Payments are made directly to your bank account</li>
                    <li>• Quality assessment is done by certified agencies</li>
                    <li>• Mobile app available for easy access</li>
                    <li>• For queries, contact e-NAM helpline: 1800-180-1551</li>
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

export default eNAM;


