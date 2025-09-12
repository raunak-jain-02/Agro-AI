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
  Banknote,
  Shield,
  Clock,
  Info
} from "lucide-react";
import NavBar from "@/components/NavBar";

const PMKisan = () => {
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
    landRecords: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("PM-KISAN Application submitted:", formData);
    alert("Application submitted successfully! You will receive a confirmation SMS shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} currentPage="PM-KISAN Scheme" />

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
              <Badge className="bg-primary text-white px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Eligible
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              PM-KISAN Scheme
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Direct income support to farmer families under Pradhan Mantri Kisan Samman Nidhi
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scheme Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Benefits */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-primary" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Banknote className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">₹6,000 per year</p>
                        <p className="text-sm text-muted-foreground">Direct income support</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold">3 installments</p>
                        <p className="text-sm text-muted-foreground">₹2,000 each</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">All farmers</p>
                        <p className="text-sm text-muted-foreground">Small & marginal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-semibold">Ongoing</p>
                        <p className="text-sm text-muted-foreground">No deadline</p>
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
                      <span>Small and marginal farmer families with cultivable landholding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Landholding should be in the name of the farmer family member</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Valid Aadhaar number linked to bank account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Active bank account with IFSC code</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Valid mobile number for SMS updates</span>
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
                        <p className="font-semibold">Visit PM-KISAN Portal</p>
                        <p className="text-sm text-muted-foreground">Go to pmkisan.gov.in or visit your nearest Common Service Centre (CSC)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                      <div>
                        <p className="font-semibold">Fill Application Form</p>
                        <p className="text-sm text-muted-foreground">Provide all required details including Aadhaar, bank account, and land details</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                      <div>
                        <p className="font-semibold">Upload Documents</p>
                        <p className="text-sm text-muted-foreground">Upload land records, Aadhaar card, and bank passbook</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                      <div>
                        <p className="font-semibold">Verification & Approval</p>
                        <p className="text-sm text-muted-foreground">Your application will be verified by local authorities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                      <div>
                        <p className="font-semibold">Receive Benefits</p>
                        <p className="text-sm text-muted-foreground">Once approved, you'll receive ₹2,000 every 4 months</p>
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
                    Quick Application
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
                      <Label htmlFor="ifscCode">IFSC Code *</Label>
                      <Input
                        id="ifscCode"
                        value={formData.ifscCode}
                        onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                        placeholder="Bank IFSC code"
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

                    <Button type="submit" className="w-full bg-gradient-primary">
                      Submit Application
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
                <Info className="h-6 w-6 text-primary-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Important Information</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• Application is completely free of cost</li>
                    <li>• No middlemen or agents required</li>
                    <li>• Direct transfer to your bank account</li>
                    <li>• You will receive SMS updates on your registered mobile number</li>
                    <li>• Keep your Aadhaar and bank account details updated</li>
                    <li>• For any queries, contact PM-KISAN helpline: 1800-180-1551</li>
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

export default PMKisan;


