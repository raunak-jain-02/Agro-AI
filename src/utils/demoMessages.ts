// Demo messages for testing the contact system
export const addDemoMessages = () => {
  const demoMessages = [
    {
      id: "demo-1",
      name: "Rajesh Kumar",
      email: "rajesh.farmer@email.com",
      subject: "technical",
      message: "I'm having trouble uploading images for crop disease detection. The upload button doesn't seem to work on my mobile device. Could you please help me with this issue?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      status: "new" as const
    },
    {
      id: "demo-2",
      name: "Priya Sharma",
      email: "priya.agriculture@email.com",
      subject: "general",
      message: "I would like to know more about the government schemes available for small farmers in Punjab. Can you provide detailed information about eligibility criteria and application process?",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      status: "read" as const
    },
    {
      id: "demo-3",
      name: "Amit Singh",
      email: "amit.farming@email.com",
      subject: "feature",
      message: "It would be great if you could add support for more regional languages. Many farmers in my area would benefit from having the interface in Punjabi and Hindi.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      status: "responded" as const,
      response: "Thank you for your suggestion! We're currently working on adding support for multiple regional languages including Punjabi and Hindi. This feature will be available in our next major update. We'll notify you once it's ready!",
      responseTimestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString() // 20 hours ago
    },
    {
      id: "demo-4",
      name: "Sunita Devi",
      email: "sunita.crops@email.com",
      subject: "bug",
      message: "The market analysis page shows incorrect prices for wheat in my district. The displayed price is ₹1,800 per quintal, but the actual mandi rate is ₹2,100. Please check and fix this.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      status: "new" as const
    },
    {
      id: "demo-5",
      name: "Mohammad Ali",
      email: "ali.agriculture@email.com",
      subject: "account",
      message: "I forgot my password and the reset link is not working. I've tried multiple times but I'm not receiving any email. My registered email is correct. Please help me recover my account.",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      status: "responded" as const,
      response: "We've reset your password and sent you a new temporary password via email. Please check your inbox and spam folder. If you still don't receive it, please contact us directly at support@agroai.com.",
      responseTimestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
    }
  ];

  const existingMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
  
  // Only add demo messages if no messages exist
  if (existingMessages.length === 0) {
    localStorage.setItem("contactMessages", JSON.stringify(demoMessages));
    console.log("Demo contact messages added for testing!");
  }
};
