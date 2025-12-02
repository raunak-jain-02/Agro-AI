import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Award, Leaf, Lightbulb, Shield, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import raunakPhoto from "@/assets/agro-hero.jpg";


const About = () => {

  const teamMembers = [
    {
      name: "Raunak Jain",
      role: "Developer",
      expertise: "Full-Stack Development • AI Integration • API Integration",
      photo: raunakPhoto,
      description:
        "I design and build AgroAI end-to-end, blending AI with practical farming needs to deliver clear, reliable experiences for farmers.",
    },
  ];

  const values = [
    hi
    {
      icon: <Users className="h-6 w-6" />,
      title: "Farmer-Centric",
      description: "Every feature is designed with the farmer's needs and challenges in mind."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Reliability",
      description: "Building a platform that farmers can depend on for their daily agricultural needs."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Sustainable Future",
      description: "Promoting sustainable farming practices for a better tomorrow."
    }
  ];

  const stats = [
    { number: "50K+", label: "Farmers Served" },
    { number: "1M+", label: "Crop Images Analyzed" },
    { number: "95%", label: "Disease Detection Accuracy" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AgroAI</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Empowering farmers with cutting-edge AI technology to revolutionize agriculture and ensure food security for future generations.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card shadow-card text-center">
              <CardContent className="p-4 sm:p-6">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">{stat.number}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <Card className="mb-8 sm:mb-12 md:mb-16 bg-gradient-card shadow-card">
          <CardContent className="p-6 sm:p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Our Mission
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                Our mission with Agro-AI is to bridge the gap between agriculture and technology. We aim to provide farmers, agri-businesses, and researchers with reliable.

                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                AI-driven insights that help improve crop yields, reduce risks, and make smarter, data-informed decisions all through a simple, accessible, and an user-friendly platform.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Target className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-primary-foreground" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-6 sm:mb-8 md:mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-6 sm:mb-8 md:mb-12">
            Meet The Developer
          </h2>
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-gradient-card shadow-card max-w-6xl mx-auto">
              <CardContent className="p-6 sm:p-10">
                <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                  <div className="order-1">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 object-cover rounded-full mx-auto shadow-md ring-2 ring-primary/40 ring-offset-4 ring-offset-background"
                    />
                  </div>
                  <div className="order-2 text-left">
                    <div className="mb-3">
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-foreground uppercase">
                        {member.name}
                      </h3>
                      <p className="italic text-muted-foreground">{member.role}</p>
                    </div>
                    <Badge variant="secondary" className="mb-4">{member.expertise}</Badge>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                      {member.description}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Focus areas: Front-End Development, Back-End Development, AI Integration, API Integration
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Section */}
        <Card className="mb-8 sm:mb-12 md:mb-16 bg-gradient-card shadow-card">
          <CardContent className="p-6 sm:p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="flex justify-center order-2 md:order-1">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Lightbulb className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-primary-foreground" />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Our Technology
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                 Farming today is no longer just about soil, seeds, and weather—it’s about smart decisions powered by technology. That’s where we come in.
                 We use advanced machine learning, computer vision, and real-time data to give farmers simple, clear, and actionable insights.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm sm:text-base text-muted-foreground">🌱 Spot plant diseases early with powerful computer vision</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm sm:text-base text-muted-foreground">📊 Track Real-Time market trends so you know when to sell</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm sm:text-base text-muted-foreground">🔮 Predict crop needs and plan smarter with data-driven insights</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-card">
          <CardContent className="p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using AgroAI to improve their crop yields and farming efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/crop-disease">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Start Analyzing Crops
                </Button>
              </Link>
              <Link to="/market-analysis">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Market Prices
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
