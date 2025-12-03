import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, ShoppingCart, Package, MessageCircle } from "lucide-react";
import NavBar from "@/components/NavBar";

interface MarketplaceListing {
  id: string;
  type: 'buy' | 'sell';
  commodity: string;
  variety: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  location: string;
  state: string;
  district: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  createdAt: string;
  status: 'active' | 'sold' | 'purchased' | 'cancelled';
  sellerId?: string;
  buyerId?: string;
}

// Generate mock marketplace data
const generateMockMarketplaceData = (): MarketplaceListing[] => {
  const commodities = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Bajra', 'Maize', 'Mustard', 'Groundnut'];
  const states = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Gujarat', 'Rajasthan'];
  const varieties = ['Bold', 'Medium', 'Fine', 'Extra Fine', 'FAQ', 'Superior'];


  // Map commodities to their standard units
  const getUnitForCommodity = (commodity: string): string => {
    const lowerCommodity = commodity.toLowerCase();
    if (lowerCommodity.includes('cotton')) return 'Bales';
    if (lowerCommodity.includes('sugarcane')) return 'Ton';
    if (lowerCommodity.includes('coconut')) return 'Thousands';
    return 'Quintal'; // Default for grains like Wheat, Rice, etc.
  };
  const names = ['Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sunita Devi', 'Vikram Patel', 'Meera Jain'];

  return Array.from({ length: 12 }, (_, i) => {
    const commodity = commodities[i % commodities.length];
    const state = states[i % states.length];
    const variety = varieties[i % varieties.length];
    const unit = getUnitForCommodity(commodity);
    const quantity = Math.floor(Math.random() * 50) + 10;
    const pricePerUnit = 1800 + (i * 200) + Math.floor(Math.random() * 500);
    const type = i % 3 === 0 ? 'buy' : 'sell';

    return {
      id: `listing-${i + 1}`,
      type,
      commodity,
      variety,
      quantity,
      unit,
      pricePerUnit,
      totalPrice: quantity * pricePerUnit,
      location: `${state} Mandi`,
      state,
      district: `${state.split(' ')[0]} District ${(i % 3) + 1}`,
      description: `High quality ${commodity} ${variety} variety. Freshly harvested and properly stored.`,
      contactName: names[i % names.length],
      contactPhone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      contactEmail: `contact${i + 1}@example.com`,
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active' as const,
      sellerId: type === 'sell' ? `seller-${i + 1}` : undefined,
      buyerId: type === 'buy' ? `buyer-${i + 1}` : undefined,
    };
  });
};

const BuySellCrops = () => {
  const { userProfile, isAuthenticated } = useAuth();
  // Marketplace states
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [listingType, setListingType] = useState<'buy' | 'sell'>('sell');
  const [marketplaceSearch, setMarketplaceSearch] = useState("");
  const [marketplaceFilter, setMarketplaceFilter] = useState<'all' | 'buy' | 'sell'>('all');

  // Form states for creating listings
  const [newListing, setNewListing] = useState({
    commodity: '',
    variety: '',
    quantity: '',
    unit: 'Quintal',
    pricePerUnit: '',
    location: '',
    state: '',
    district: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map snake_case to camelCase
        const mappedListings: MarketplaceListing[] = data.map(item => ({
          id: item.id,
          type: item.type,
          commodity: item.commodity,
          variety: item.variety,
          quantity: Number(item.quantity),
          unit: item.unit,
          pricePerUnit: Number(item.price_per_unit),
          totalPrice: Number(item.total_price),
          location: item.location,
          state: item.state,
          district: item.district,
          description: item.description,
          contactName: item.contact_name,
          contactPhone: item.contact_phone,
          contactEmail: item.contact_email,
          createdAt: item.created_at,
          status: item.status,
          sellerId: item.seller_id,
          buyerId: item.buyer_id
        }));
        setMarketplaceListings(mappedListings);
      } else {
        // If no data in DB, use mock data for demo purposes
        // In production, you might want to show "No listings found" instead
        setMarketplaceListings(generateMockMarketplaceData());
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      // Fallback to mock data on error
      setMarketplaceListings(generateMockMarketplaceData());
    } finally {
      setLoading(false);
    }
  };

  // Filter marketplace listings
  const filteredMarketplaceListings = useMemo(() => {
    let filtered = marketplaceListings.filter(listing => listing.status === 'active');

    if (marketplaceFilter !== 'all') {
      filtered = filtered.filter(listing => listing.type === marketplaceFilter);
    }

    if (marketplaceSearch) {
      filtered = filtered.filter(listing =>
        listing.commodity.toLowerCase().includes(marketplaceSearch.toLowerCase()) ||
        listing.variety.toLowerCase().includes(marketplaceSearch.toLowerCase()) ||
        listing.location.toLowerCase().includes(marketplaceSearch.toLowerCase()) ||
        listing.state.toLowerCase().includes(marketplaceSearch.toLowerCase())
      );
    }

    return filtered;
  }, [marketplaceListings, marketplaceFilter, marketplaceSearch]);

  // Handle creating new listing
  const handleCreateListing = async () => {
    if (!newListing.commodity || !newListing.quantity || !newListing.pricePerUnit || !newListing.contactName || !newListing.contactPhone) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const listingData = {
        type: listingType,
        commodity: newListing.commodity,
        variety: newListing.variety,
        quantity: parseFloat(newListing.quantity),
        unit: newListing.unit,
        price_per_unit: parseFloat(newListing.pricePerUnit),
        total_price: parseFloat(newListing.quantity) * parseFloat(newListing.pricePerUnit),
        location: newListing.location,
        state: newListing.state,
        district: newListing.district,
        description: newListing.description,
        contact_name: newListing.contactName,
        contact_phone: newListing.contactPhone,
        contact_email: newListing.contactEmail,
        status: 'active',
        seller_id: listingType === 'sell' ? (userProfile?.id || null) : null,
        buyer_id: listingType === 'buy' ? (userProfile?.id || null) : null,
      };

      const { data, error } = await supabase
        .from('marketplace_listings')
        .insert([listingData])
        .select();

      if (error) throw error;

      if (data) {
        // Refresh listings
        fetchListings();
        setShowCreateListing(false);
        setNewListing({
          commodity: '',
          variety: '',
          quantity: '',
          unit: 'Quintal',
          pricePerUnit: '',
          location: '',
          state: '',
          district: '',
          description: '',
          contactName: '',
          contactPhone: '',
          contactEmail: ''
        });
        alert('Listing created successfully!');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    }
  };

  // Handle contact action
  const handleContact = (listing: MarketplaceListing) => {
    const message = `Hi ${listing.contactName}, I'm interested in your ${listing.type === 'sell' ? 'sale' : 'purchase'} listing for ${listing.commodity} ${listing.variety}. Please contact me to discuss further.`;
    // In a real app, this would open a messaging system or email client
    alert(`Contact Information:\nName: ${listing.contactName}\nPhone: ${listing.contactPhone}\nEmail: ${listing.contactEmail}\n\nMessage: ${message}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <NavBar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Buy/Sell Crops Marketplace
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect directly with farmers and buyers. Get the best prices for your crops without middlemen!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 mx-auto text-primary mb-2" />
                <h3 className="text-2xl font-bold text-primary">{marketplaceListings.filter(l => l.type === 'sell').length}</h3>
                <p className="text-muted-foreground">Crops for Sale</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-8 w-8 mx-auto text-secondary mb-2" />
                <h3 className="text-2xl font-bold text-secondary">{marketplaceListings.filter(l => l.type === 'buy').length}</h3>
                <p className="text-muted-foreground">Buy Requests</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 mx-auto text-accent mb-2" />
                <h3 className="text-2xl font-bold text-accent">{marketplaceListings.length}</h3>
                <p className="text-muted-foreground">Total Listings</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Marketplace */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-accent" />
                  Active Listings
                </CardTitle>
                <Dialog open={showCreateListing} onOpenChange={setShowCreateListing}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Listing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New {listingType === 'sell' ? 'Sell' : 'Buy'} Listing</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          variant={listingType === 'sell' ? 'default' : 'outline'}
                          onClick={() => setListingType('sell')}
                          className="flex-1"
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Sell Crops
                        </Button>
                        <Button
                          variant={listingType === 'buy' ? 'default' : 'outline'}
                          onClick={() => setListingType('buy')}
                          className="flex-1"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy Crops
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="commodity">Commodity *</Label>
                          <Input
                            id="commodity"
                            placeholder="e.g., Wheat, Rice, Cotton"
                            value={newListing.commodity}
                            onChange={(e) => {
                              const val = e.target.value;
                              let unit = newListing.unit;

                              // Auto-select unit based on commodity
                              if (val.toLowerCase().includes('cotton')) unit = 'Bales';
                              else if (val.toLowerCase().includes('sugarcane')) unit = 'Ton';
                              else if (val.toLowerCase().includes('coconut')) unit = 'Thousands';

                              setNewListing(prev => ({ ...prev, commodity: val, unit }));
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="variety">Variety</Label>
                          <Input
                            id="variety"
                            placeholder="e.g., Bold, Medium, Fine"
                            value={newListing.variety}
                            onChange={(e) => setNewListing(prev => ({ ...prev, variety: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity *</Label>
                          <Input
                            id="quantity"
                            type="number"
                            placeholder="Enter quantity"
                            value={newListing.quantity}
                            onChange={(e) => setNewListing(prev => ({ ...prev, quantity: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="unit">Unit</Label>
                          <Select value={newListing.unit} onValueChange={(value) => setNewListing(prev => ({ ...prev, unit: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Quintal">Quintal</SelectItem>
                              <SelectItem value="Ton">Ton</SelectItem>
                              <SelectItem value="Kg">Kg</SelectItem>
                              <SelectItem value="Bales">Bales</SelectItem>
                              <SelectItem value="Thousands">Thousands</SelectItem>
                              <SelectItem value="Bags">Bags</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="pricePerUnit">Price per {newListing.unit} *</Label>
                          <Input
                            id="pricePerUnit"
                            type="number"
                            placeholder="Enter price per unit"
                            value={newListing.pricePerUnit}
                            onChange={(e) => setNewListing(prev => ({ ...prev, pricePerUnit: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Market/Location *</Label>
                          <Input
                            id="location"
                            placeholder="e.g., Delhi Mandi, Local Market"
                            value={newListing.location}
                            onChange={(e) => setNewListing(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            placeholder="Enter state"
                            value={newListing.state}
                            onChange={(e) => setNewListing(prev => ({ ...prev, state: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="district">District *</Label>
                          <Input
                            id="district"
                            placeholder="Enter district"
                            value={newListing.district}
                            onChange={(e) => setNewListing(prev => ({ ...prev, district: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your crop quality, storage conditions, etc."
                          value={newListing.description}
                          onChange={(e) => setNewListing(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactName">Contact Name *</Label>
                          <Input
                            id="contactName"
                            placeholder="Your full name"
                            value={newListing.contactName}
                            onChange={(e) => setNewListing(prev => ({ ...prev, contactName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="contactPhone">Phone Number *</Label>
                          <Input
                            id="contactPhone"
                            placeholder="+91 9876543210"
                            value={newListing.contactPhone}
                            onChange={(e) => setNewListing(prev => ({ ...prev, contactPhone: e.target.value }))}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="contactEmail">Email</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            placeholder="your.email@example.com"
                            value={newListing.contactEmail}
                            onChange={(e) => setNewListing(prev => ({ ...prev, contactEmail: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowCreateListing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateListing} className="bg-gradient-primary">
                          Create Listing
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by crop, variety, or location..."
                      value={marketplaceSearch}
                      onChange={(e) => setMarketplaceSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={marketplaceFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => setMarketplaceFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={marketplaceFilter === 'sell' ? 'default' : 'outline'}
                      onClick={() => setMarketplaceFilter('sell')}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Sell
                    </Button>
                    <Button
                      variant={marketplaceFilter === 'buy' ? 'default' : 'outline'}
                      onClick={() => setMarketplaceFilter('buy')}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy
                    </Button>
                  </div>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMarketplaceListings.map((listing) => (
                    <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant={listing.type === 'sell' ? 'default' : 'secondary'}>
                            {listing.type === 'sell' ? 'For Sale' : 'Want to Buy'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(listing.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="font-semibold text-lg mb-2">
                          {listing.commodity} {listing.variety && `- ${listing.variety}`}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Quantity:</span>
                            <span className="font-medium">{listing.quantity} {listing.unit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Price per {listing.unit}:</span>
                            <span className="font-medium">₹{listing.pricePerUnit.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Total Price:</span>
                            <span className="font-bold text-primary">₹{listing.totalPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Location:</span>
                            <span className="font-medium">{listing.location}, {listing.district}</span>
                          </div>
                        </div>

                        {listing.description && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {listing.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <p className="font-medium">{listing.contactName}</p>
                            <p className="text-muted-foreground">{listing.state}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleContact(listing)}
                            className="bg-gradient-primary"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredMarketplaceListings.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No listings found</h3>
                    <p className="text-muted-foreground mb-4">
                      {marketplaceSearch || marketplaceFilter !== 'all'
                        ? 'Try adjusting your search criteria or filters.'
                        : 'Be the first to create a listing in your area!'
                      }
                    </p>
                    <Button onClick={() => setShowCreateListing(true)} className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Listing
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuySellCrops;
