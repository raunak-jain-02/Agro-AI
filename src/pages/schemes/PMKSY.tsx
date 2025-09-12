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
  Droplets,
  Clock,
  Info,
  AlertTriangle,
  Sun,
  Zap
} from "lucide-react";
import NavBar from "@/components/NavBar";

const PMKSY = () => {
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
    irrigationType: "",
    waterSource: "",
    currentCrops: "",
    landRecords: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PMKSY Application submitted:", formData);
    alert("PMKSY Application submitted successfully! You will receive a confirmation SMS shortly.");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} currentPage="PMKSY Scheme" />

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
              <Badge className="bg-cyan-500 text-white px-4 py-2">
                <Droplets className="h-4 w-4 mr-2" />
                Irrigation
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Pradhan Mantri Krishi Sinchai Yojana (PMKSY)
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Water conservation and irrigation efficiency improvement for sustainable agriculture
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scheme Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Benefits */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-cyan-500" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Up to ₹50,000</p>
                        <p className="text-sm text-muted-foreground">Subsidy amount</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold">Water conservation</p>
                        <p className="text-sm text-muted-foreground">Efficient irrigation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <Sun className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">Solar pumps</p>
                        <p className="text-sm text-muted-foreground">Renewable energy</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                        <Zap className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-semibold">Micro irrigation</p>
                        <p className="text-sm text-muted-foreground">Drip & sprinkler</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Components */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Scheme Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Accelerated Irrigation Benefit Programme (AIBP)</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Major and medium irrigation projects
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Command area development
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Water distribution network
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Har Khet Ko Pani (HKKP)</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Ground water development
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Surface minor irrigation
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success" />
                            Repair, renovation and restoration
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Per Drop More Crop (PDMC)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Micro irrigation (drip & sprinkler)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Precision irrigation systems
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Water use efficiency improvement
                        </li>
                      </ul>
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
                      <span>Small and marginal farmers with cultivable landholding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Valid Aadhaar number and bank account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Land records and ownership documents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Water source availability or potential</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Willingness to adopt modern irrigation methods</span>
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
                        <p className="font-semibold">Visit Agriculture Department</p>
                        <p className="text-sm text-muted-foreground">Contact your nearest agriculture office or CSC</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                      <div>
                        <p className="font-semibold">Fill Application Form</p>
                        <p className="text-sm text-muted-foreground">Provide land details and irrigation requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                      <div>
                        <p className="font-semibold">Site Inspection</p>
                        <p className="text-sm text-muted-foreground">Officials visit your field for assessment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                      <div>
                        <p className="font-semibold">Approval & Sanction</p>
                        <p className="text-sm text-muted-foreground">Project is approved and sanctioned</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">5</div>
                      <div>
                        <p className="font-semibold">Implementation</p>
                        <p className="text-sm text-muted-foreground">Irrigation system is installed and commissioned</p>
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
                    PMKSY Application
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
                      <Label htmlFor="irrigationType">Type of Irrigation *</Label>
                      <Select onValueChange={(value) => handleInputChange("irrigationType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select irrigation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="drip">Drip Irrigation</SelectItem>
                          <SelectItem value="sprinkler">Sprinkler Irrigation</SelectItem>
                          <SelectItem value="solar-pump">Solar Pump</SelectItem>
                          <SelectItem value="well">Well Development</SelectItem>
                          <SelectItem value="pond">Pond Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="waterSource">Water Source *</Label>
                      <Select onValueChange={(value) => handleInputChange("waterSource", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select water source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="groundwater">Ground Water</SelectItem>
                          <SelectItem value="surface">Surface Water</SelectItem>
                          <SelectItem value="canal">Canal Water</SelectItem>
                          <SelectItem value="rainwater">Rain Water Harvesting</SelectItem>
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
                      Apply for PMKSY
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
                    <li>• Subsidy amount varies based on irrigation type and landholding</li>
                    <li>• Small farmers get higher subsidy percentage</li>
                    <li>• Solar pumps are encouraged for sustainable irrigation</li>
                    <li>• Micro irrigation systems improve water efficiency</li>
                    <li>• Regular maintenance is required for continued benefits</li>
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

export default PMKSY;
