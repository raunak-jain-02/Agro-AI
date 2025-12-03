import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import NavBar from "@/components/NavBar";
import { diseaseData } from "@/data/disease-data";

const DiseaseDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Available SVG files mapping
  const svgMapping: { [key: string]: string } = {
    "late-blight": "/images/late-blight.svg",
    "powdery-mildew": "/images/powdery-mildew.svg", 
    "rust": "/images/rust.svg",
    "bacterial-leaf-spot": "/images/bacterial-leaf-spot.svg",
    "fusarium-wilt": "/images/fusarium-wilt.svg",
    "anthracnose": "/images/anthracnose.svg",
    "black-sigatoka": "/images/black-sigatoka.svg",
    "ergot": "/images/ergot.svg",
    "clubroot": "/images/clubroot.svg",
    "citrus-canker": "/images/citrus-canker.svg",
    "verticillium-wilt": "/images/verticillium-wilt.svg",
    "rice-blast": "/images/rice-blast.svg",
    "smut": "/images/smut.svg",
    "leaf-curl-virus": "/images/leaf-curl-virus.svg",
    "yellow-rust": "/images/yellow-rust.svg",
    "alternaria-leaf-spot": "/images/alternaria-leaf-spot.svg"
  };

  const getDiseaseImage = (diseaseName: string) => {
    const key = diseaseName.toLowerCase().replace(/ /g, '-');
    return svgMapping[key] || "/placeholder.svg";
  };

  const filteredDiseases = diseaseData.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.affectedCrops.some((crop) =>
        crop.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} />

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
                <CardHeader className="flex items-center gap-4">
                  <div className="disease-image-container w-12 h-12 flex-shrink-0">
                    <img 
                      src={getDiseaseImage(disease.name)} 
                      alt={`${disease.name} image`} 
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <CardTitle className="text-sm sm:text-base">{disease.name}</CardTitle>
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
