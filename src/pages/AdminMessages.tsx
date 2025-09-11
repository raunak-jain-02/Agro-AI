import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Clock, 
  Eye, 
  Reply, 
  Trash2, 
  Search,
  Filter,
  MessageSquare,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import NavBar from "@/components/NavBar";
import { useToast } from "@/hooks/use-toast";
import { addDemoMessages } from "@/utils/demoMessages";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'responded';
  response?: string;
  responseTimestamp?: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [responseText, setResponseText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load messages from localStorage on component mount
  useEffect(() => {
    // Add demo messages if none exist
    addDemoMessages();
    
    const savedMessages = localStorage.getItem("contactMessages");
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      setMessages(parsedMessages);
      setFilteredMessages(parsedMessages);
    }
  }, []);

  // Filter messages based on search term and status
  useEffect(() => {
    let filtered = messages;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(message => message.status === statusFilter);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, statusFilter]);

  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId && msg.status === 'new'
        ? { ...msg, status: 'read' as const }
        : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
  };

  const sendResponse = () => {
    if (!selectedMessage || !responseText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response message.",
        variant: "destructive",
      });
      return;
    }

    const updatedMessages = messages.map(msg =>
      msg.id === selectedMessage.id
        ? {
            ...msg,
            status: 'responded' as const,
            response: responseText,
            responseTimestamp: new Date().toISOString()
          }
        : msg
    );

    setMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));

    // Simulate sending email (in a real app, this would be an API call)
    toast({
      title: "Response Sent!",
      description: `Your response has been sent to ${selectedMessage.email}`,
    });

    setResponseText("");
    setSelectedMessage(null);
    setIsResponseDialogOpen(false);
  };

  const deleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
    
    toast({
      title: "Message Deleted",
      description: "The message has been permanently deleted.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500 hover:bg-blue-600"><AlertCircle className="h-3 w-3 mr-1" />New</Badge>;
      case 'read':
        return <Badge variant="secondary"><Eye className="h-3 w-3 mr-1" />Read</Badge>;
      case 'responded':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="h-3 w-3 mr-1" />Responded</Badge>;
      default:
        return null;
    }
  };

  const getSubjectLabel = (subject: string) => {
    const labels: { [key: string]: string } = {
      'general': 'General Inquiry',
      'technical': 'Technical Support',
      'bug': 'Bug Report',
      'feature': 'Feature Request',
      'account': 'Account Issues',
      'billing': 'Billing Questions',
      'partnership': 'Partnership',
      'other': 'Other'
    };
    return labels[subject] || subject;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    responded: messages.filter(m => m.status === 'responded').length
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar showBackButton={true} />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Messages</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Manage and respond to customer inquiries and support requests.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Messages</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{stats.new}</p>
              <p className="text-sm text-muted-foreground">New Messages</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-500">{stats.read}</p>
              <p className="text-sm text-muted-foreground">Read Messages</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{stats.responded}</p>
              <p className="text-sm text-muted-foreground">Responded</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 md:mb-8 bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search Messages</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Filter by Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Messages</SelectItem>
                    <SelectItem value="new">New Messages</SelectItem>
                    <SelectItem value="read">Read Messages</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
                  className="w-full"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Messages Found</h3>
                <p className="text-muted-foreground">
                  {messages.length === 0 
                    ? "No contact messages have been received yet." 
                    : "No messages match your current filter criteria."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card key={message.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-3">
                        <h3 className="font-semibold text-lg">{message.name}</h3>
                        {getStatusBadge(message.status)}
                      </div>
                      
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{message.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{getSubjectLabel(message.subject)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(message.timestamp)}</span>
                        </div>
                      </div>

                      <p className="text-foreground line-clamp-2 mb-4">
                        {message.message}
                      </p>

                      {message.response && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Your Response:</p>
                          <p className="text-sm text-green-700 dark:text-green-300">{message.response}</p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                            Sent: {message.responseTimestamp && formatDate(message.responseTimestamp)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row md:flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(message.id)}
                        disabled={message.status !== 'new'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-gradient-primary"
                            onClick={() => {
                              setSelectedMessage(message);
                              markAsRead(message.id);
                            }}
                          >
                            <Reply className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Respond to {selectedMessage?.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <p className="text-sm font-medium mb-2">Original Message:</p>
                              <p className="text-sm text-muted-foreground">{selectedMessage?.message}</p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="response">Your Response</Label>
                              <Textarea
                                id="response"
                                placeholder="Type your response here..."
                                value={responseText}
                                onChange={(e) => setResponseText(e.target.value)}
                                rows={6}
                                className="resize-none"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={sendResponse} className="bg-gradient-primary">
                                Send Response
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMessage(message.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
