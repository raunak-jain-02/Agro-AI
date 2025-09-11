import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, Clock, MessageSquare, Send, HelpCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create message object
    const newMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      subject: formData.subject || "general",
      message: formData.message,
      timestamp: new Date().toISOString(),
      status: 'new' as const
    };

    // Save to localStorage
    const existingMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    const updatedMessages = [newMessage, ...existingMessages];
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));

    // Show success message
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Touch</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We're here to help with any questions, feedback, or support you need. Reach out to our team today!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <MessageSquare className="h-5 w-5 text-primary" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="bg-background/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-background/50 border-border"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="bg-background/50 border-border">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="billing">Billing Questions</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    rows={6}
                    className="bg-background/50 border-border resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 text-base py-3"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Support Information */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="p-6">
                <CardTitle className="text-lg md:text-xl">Support Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground mb-1">For general inquiries and support</p>
                    <p className="text-sm font-medium text-foreground">support@agroai.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">Phone</h3>
                    <p className="text-sm text-muted-foreground mb-1">Call us for urgent support</p>
                    <p className="text-sm font-medium text-foreground">+91 9876543210</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">Hours</h3>
                    <p className="text-sm text-muted-foreground mb-1">Our support team is available</p>
                    <div className="text-sm font-medium text-foreground">
                      <p>Mon-Fri | 9:00 AM - 6:00 PM IST</p>
                      <p>Sat-Sun | 10:00 AM - 4:00 PM IST</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Find quick answers to common questions in our FAQ section.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Visit FAQ
                </Button>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Quick Response Time</h3>
                <p className="opacity-90 text-sm mb-4">
                  We typically respond to all inquiries within 2-4 hours during business hours.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="opacity-80">2-4 hours</p>
                  </div>
                  <div className="w-px h-8 bg-primary-foreground/20"></div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="opacity-80">Immediate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Admin Access Link (for development) */}
        <div className="text-center mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Admin Access (Development Only)</p>
          <Button
            variant="link"
            className="text-xs text-primary hover:text-primary/80"
            onClick={() => window.open('/admin/messages', '_blank')}
          >
            View Contact Messages Admin Panel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
