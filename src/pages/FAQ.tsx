import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const FAQ = () => {
  const [query, setQuery] = useState("");

  const faqs = [
    {
      q: "What is AgroAI and how does it help farmers?",
      a: "AgroAI provides AI-powered crop disease analysis, real-time market prices, and information about government schemes to help farmers make better decisions."
    },
    {
      q: "How do I analyze a crop disease?",
      a: "Go to the AI Crop Disease page, upload a clear photo of the affected plant, and follow the instructions to get an instant diagnosis and treatment suggestions."
    },
    {
      q: "Where do the market prices come from?",
      a: "Prices are sourced from public mandi data and trusted aggregators. Values are indicative and may vary by location and time."
    },
    {
      q: "Are the government schemes free to apply?",
      a: "Most schemes are free to apply from official portals. Beware of agents charging fees; always use official links."
    },
    {
      q: "How do I switch between light and dark mode?",
      a: "Use the sun/moon toggle in the top-right of the navigation bar to change the theme."
    },
    {
      q: "Who can I contact for support?",
      a: "Use the Contact page to reach our support team. We'll respond within 24–48 hours."
    }
  ];

  const filtered = faqs.filter(({ q, a }) =>
    (q + " " + a).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} currentPage="FAQ" />

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Input
                placeholder="Search questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              {filtered.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;





