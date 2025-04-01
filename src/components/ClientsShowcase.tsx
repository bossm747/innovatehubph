
import React, { useState, useEffect, useRef } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Eye, 
  User, 
  Store, 
  Calendar, 
  FileText, 
  Phone, 
  Mail, 
  MapPin,
  Filter,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Client {
  id: number;
  name: string;
  type: "agent" | "business" | "remittance" | "food" | "retail";
  joinDate?: string;
  username?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
  storeName?: string;
  businessPackage?: string;
  tinNumber?: string;
  activationDate?: string;
}

const CLIENTS: Client[] = [
  {
    id: 1,
    name: "Agent Platapay",
    username: "platapay-agent",
    email: "agent@platapay.ph",
    contactNumber: "9998483938",
    address: "Greenwoods South Batangas City",
    storeName: "Platapay",
    businessPackage: "PlataPay Premium Plan Subscription",
    tinNumber: "777-777-777-777",
    activationDate: "February 22, 2025",
    type: "agent"
  },
  {
    id: 2,
    name: "Lyn Agbay",
    username: "BarakoBrews",
    email: "platalyn@gmail.com",
    contactNumber: "9455181139",
    address: "Bypass Bayanan, San Pascual",
    storeName: "BarakoBrews",
    businessPackage: "PlataPay Basic Plan Subscription",
    tinNumber: "193-502-851-001",
    activationDate: "February 25, 2025",
    type: "food",
    joinDate: "February 25, 2025"
  },
  {
    id: 3,
    name: "Lyn Agbay",
    username: "MacLyn Bills Payment and Remittance",
    email: "govipsanantonio@gmail.com",
    contactNumber: "9949957812",
    address: "San Antonio, San Pascual Batangas",
    storeName: "MacLyn Bills Payment and Remittance",
    businessPackage: "PlataPay Enterprise Plan with Lottomatik",
    tinNumber: "193-502-851-000",
    activationDate: "February 26, 2025",
    type: "remittance",
    joinDate: "February 26, 2025"
  },
  {
    id: 4,
    name: "Marilets Abu",
    username: "Pio",
    email: "Marilets.Bautista@yahoo.com",
    contactNumber: "9531531201",
    address: "San Felipe, Cuenca Batangas City",
    storeName: "Pio Bills Payment and Lottomatik",
    businessPackage: "PlataPay Enterprise Plan with Lottomatik",
    tinNumber: "453-331-022-000",
    activationDate: "February 26, 2025",
    type: "business",
    joinDate: "February 26, 2025"
  },
  {
    id: 5,
    name: "Mylene Eborde",
    username: "TeamAustria@01",
    email: "myleneeborde12@gmail.com",
    contactNumber: "9958744057",
    address: "Saguing, Mabini Batangas City",
    storeName: "TM Seven",
    businessPackage: "PlataPay Enterprise Plan with Lottomatik",
    tinNumber: "309-295-564-000",
    activationDate: "February 27, 2025",
    type: "business",
    joinDate: "February 27, 2025"
  },
  {
    id: 6,
    name: "Ulysses Plata",
    username: "MMHA Business Center",
    email: "u01plata@gmail.com",
    contactNumber: "9614771949",
    address: "RR Station Barangay 24, Batangas City",
    storeName: "Michmara Business Center",
    businessPackage: "PlataPay Enterprise Plan with Lottomatik",
    tinNumber: "262-152-000-000",
    activationDate: "February 27, 2025",
    type: "business",
    joinDate: "February 27, 2025"
  },
  {
    id: 7,
    name: "Lucky Plata",
    username: "TEDBATANGAS",
    email: "theespressodepotbatangas@gmail.com",
    contactNumber: "9175020225",
    address: "2nd floor Unit 4 D InnovateHubBldg., San Antonio,San Pascual,Batangas",
    storeName: "The Espressso Depot Batangas",
    businessPackage: "PlataPay Enterprise Plan with Lottomatik",
    tinNumber: "656-021-732-000",
    activationDate: "March 1, 2025",
    type: "business",
    joinDate: "March 1, 2025"
  },
  {
    id: 8,
    name: "Gladys Marco",
    username: "Miss G",
    email: "gladysmarco530@gmail.com",
    contactNumber: "9658212671",
    address: "Lutucan 1, Sitio Ulbok, Sariaya Quezon",
    storeName: "Miss G Payment Center",
    businessPackage: "PlataPay Enterprise Plan with Lottomatik",
    tinNumber: "308-991-232-000",
    activationDate: "March 04, 2025",
    type: "retail",
    joinDate: "March 04, 2025"
  },
  {
    id: 9,
    name: "Maricel Malaso Panopio",
    username: "Maricel",
    email: "panopiomaricel092@gmail.com",
    contactNumber: "9567525270",
    address: "Alalum, Batangas City",
    storeName: "RMCL/ PlataPay Business Center",
    businessPackage: "PlataPay Plus Plan Subscription",
    tinNumber: "001-813-046-000",
    activationDate: "March 15, 2025",
    type: "business",
    joinDate: "March 15, 2025"
  },
  {
    id: 10,
    name: "Mary Joy Incio Dorado",
    username: "Ma Joy",
    email: "maryjoydorado81@gmail.com",
    contactNumber: "9101484635",
    address: "Sto.Niño, Batangas",
    storeName: "Ma Joy Bills Payment",
    businessPackage: "PlataPay Basic Plan Subscription",
    tinNumber: "432-393-778-000",
    activationDate: "March 15, 2025",
    type: "remittance",
    joinDate: "March 15, 2025"
  },
  {
    id: 11,
    name: "Mario Jr. Mercado",
    username: "maryannlava",
    email: "maryann_lava@yahoo.com",
    contactNumber: "9491498223",
    address: "Gerason Subdivision, Sta.Rita, Batangas City",
    storeName: "BTS Business Center",
    businessPackage: "PlataPay Premium Plan",
    tinNumber: "453-630-778-000",
    activationDate: "March 15, 2025",
    type: "business",
    joinDate: "March 15, 2025"
  },
  {
    id: 12,
    name: "Nicole John Paul Sevilla",
    username: "Nikol",
    email: "nikolsevilla15@gmail.com",
    contactNumber: "9612450437",
    address: "Lot 3 Paldit, Sison, Region I (Ilocos Region)",
    storeName: "D.I.Y FOOD MART/ PLATAPAY",
    businessPackage: "PlataPay Premium Plan plus Lottomatik",
    tinNumber: "658-258-268-000",
    activationDate: "March 18, 2025",
    type: "food",
    joinDate: "March 18, 2025"
  },
  {
    id: 13,
    name: "Rico Gutierrez Payoyo",
    username: "Rico",
    email: "rgpayoyo@gmail.com",
    contactNumber: "9175485328",
    address: "Diokno St., De Joya Capitol Village, Kumintang Ilaya, Batangas City",
    storeName: "Precy Store",
    businessPackage: "PlataPay Basic Plan Subscription",
    tinNumber: "922-072-489-000",
    activationDate: "March 20, 2025",
    type: "retail",
    joinDate: "March 20, 2025"
  },
  {
    id: 14,
    name: "Mark Rivera",
    storeName: "Landos Grill (Marc and Lyn Eatery)",
    type: "food",
    joinDate: "February 22, 2025"
  },
  {
    id: 15,
    name: "Flay Cabral",
    storeName: "Flayla Snack House",
    type: "food"
  }
];

const ClientCard = ({ client }: { client: Client }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-64 flex flex-col group">
      <div className="p-5 flex flex-col items-center justify-between h-full relative">
        {/* Avatar section with gradient background */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full overflow-hidden flex items-center justify-center mb-4 border-2 border-gray-100 flex-shrink-0 transition-all duration-300 group-hover:scale-105">
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute w-full h-full bg-gradient-to-br from-blue-400/80 to-indigo-600/80"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 relative z-10">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
        
        {/* Client info */}
        <div className="flex flex-col items-center flex-grow justify-center">
          <h3 className="text-lg font-semibold text-center mb-2 line-clamp-1">{client.storeName || client.name}</h3>
          <p className="text-sm text-gray-500 mb-2">Client Partner</p>
          <Badge className={`${getTypeBadgeColor(client.type)}`}>
            {formatType(client.type)}
          </Badge>
          {client.joinDate && (
            <p className="text-xs text-gray-500 mt-2">
              Joined: {client.joinDate}
            </p>
          )}
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-full group-hover:bg-blue-50">
              <Eye className="h-4 w-4 mr-1" /> View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-5 rounded-lg border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full overflow-hidden flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{client.storeName}</h3>
                    <p className="text-sm text-gray-500">{formatType(client.type)}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="w-5 h-5 mt-0.5 mr-2 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Owner</p>
                      <p>{client.name}</p>
                    </div>
                  </div>
                  
                  {client.username && (
                    <div className="flex items-start">
                      <User className="w-5 h-5 mt-0.5 mr-2 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Username</p>
                        <p>{client.username}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.email && (
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mt-0.5 mr-2 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p>{client.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.contactNumber && (
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mt-0.5 mr-2 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Contact Number</p>
                        <p>+63 {client.contactNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Business Information</h4>
                
                <div className="space-y-3">
                  {client.address && (
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mt-0.5 mr-2 text-indigo-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p>{client.address}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.businessPackage && (
                    <div className="flex items-start">
                      <Store className="w-5 h-5 mt-0.5 mr-2 text-indigo-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Business Package</p>
                        <p>{client.businessPackage}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.tinNumber && (
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 mt-0.5 mr-2 text-indigo-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">TIN Number</p>
                        <p>{client.tinNumber}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.activationDate && (
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mt-0.5 mr-2 text-indigo-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Activation Date</p>
                        <p>{client.activationDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const getTypeBadgeColor = (type: Client['type']): string => {
  switch (type) {
    case 'agent':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'business':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    case 'remittance':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'food':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
    case 'retail':
      return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getTypeColor = (type: Client['type']): string => {
  switch (type) {
    case 'agent':
      return 'bg-blue-100 text-blue-800';
    case 'business':
      return 'bg-purple-100 text-purple-800';
    case 'remittance':
      return 'bg-green-100 text-green-800';
    case 'food':
      return 'bg-amber-100 text-amber-800';
    case 'retail':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatType = (type: Client['type']): string => {
  switch (type) {
    case 'agent':
      return 'PlataPay Agent';
    case 'business':
      return 'Business Center';
    case 'remittance':
      return 'Remittance Service';
    case 'food':
      return 'Food & Beverage';
    case 'retail':
      return 'Retail Store';
    default:
      return type;
  }
};

type ClientsShowcaseProps = {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  showFilters?: boolean;
  maxItems?: number;
  className?: string;
  showDetailView?: boolean;
  autoSlide?: boolean;
}

const ClientsShowcase = ({ 
  title = "Our Valued Clients", 
  subtitle = "Businesses and entrepreneurs who trust InnovateHub's solutions",
  showAll = false,
  showFilters = true,
  maxItems = 8,
  className = "",
  showDetailView = false,
  autoSlide = false
}: ClientsShowcaseProps) => {
  const [activeFilter, setActiveFilter] = useState<Client['type'] | 'all'>('all');
  const [displayedClients, setDisplayedClients] = useState<Client[]>(
    showAll ? CLIENTS : CLIENTS.slice(0, maxItems)
  );
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showFiltersMenu, setShowFiltersMenu] = useState(false);
  const carouselRef = useRef<any>(null);
  const autoSlideIntervalRef = useRef<number | null>(null);

  // Filter clients based on activeFilter
  React.useEffect(() => {
    if (activeFilter === 'all') {
      setDisplayedClients(showAll ? CLIENTS : CLIENTS.slice(0, maxItems));
    } else {
      const filtered = CLIENTS.filter(client => client.type === activeFilter);
      setDisplayedClients(showAll ? filtered : filtered.slice(0, maxItems));
    }
  }, [activeFilter, showAll, maxItems]);

  // Set up auto-sliding if enabled
  React.useEffect(() => {
    if (autoSlide && carouselRef.current) {
      const startAutoSlide = () => {
        autoSlideIntervalRef.current = window.setInterval(() => {
          if (carouselRef.current?.scrollNext) {
            carouselRef.current.scrollNext();
          }
        }, 3000); // Slide every 3 seconds
      };

      startAutoSlide();

      // Cleanup interval on unmount
      return () => {
        if (autoSlideIntervalRef.current !== null) {
          clearInterval(autoSlideIntervalRef.current);
        }
      };
    }
  }, [autoSlide, displayedClients]);

  // Clean up interval on component unmount
  React.useEffect(() => {
    return () => {
      if (autoSlideIntervalRef.current !== null) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, []);

  return (
    <section className={`py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50 ${className}`}>
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8 fade-up">
          {showFilters && (
            <div className="md:flex flex-wrap gap-2 hidden">
              <Button 
                variant={activeFilter === 'all' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('all')}
                className="rounded-full"
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'agent' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('agent')}
                className="rounded-full"
              >
                PlataPay Agents
              </Button>
              <Button 
                variant={activeFilter === 'business' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('business')}
                className="rounded-full"
              >
                Business Centers
              </Button>
              <Button 
                variant={activeFilter === 'food' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('food')}
                className="rounded-full"
              >
                Food & Beverage
              </Button>
              <Button 
                variant={activeFilter === 'remittance' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('remittance')}
                className="rounded-full"
              >
                Remittance
              </Button>
              <Button 
                variant={activeFilter === 'retail' ? "default" : "outline"} 
                size="sm"
                onClick={() => setActiveFilter('retail')}
                className="rounded-full"
              >
                Retail
              </Button>
            </div>
          )}

          {/* Mobile filters dropdown */}
          {showFilters && (
            <div className="md:hidden flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFiltersMenu(!showFiltersMenu)}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              
              {showFiltersMenu && (
                <div className="absolute z-10 mt-2 bg-white rounded-md shadow-lg p-2 top-full left-0 right-0 mx-6">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={activeFilter === 'all' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        setActiveFilter('all');
                        setShowFiltersMenu(false);
                      }}
                      className="w-full"
                    >
                      All
                    </Button>
                    <Button 
                      variant={activeFilter === 'agent' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        setActiveFilter('agent');
                        setShowFiltersMenu(false);
                      }}
                      className="w-full"
                    >
                      PlataPay Agents
                    </Button>
                    <Button 
                      variant={activeFilter === 'business' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        setActiveFilter('business');
                        setShowFiltersMenu(false);
                      }}
                      className="w-full"
                    >
                      Business Centers
                    </Button>
                    <Button 
                      variant={activeFilter === 'food' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        setActiveFilter('food');
                        setShowFiltersMenu(false);
                      }}
                      className="w-full"
                    >
                      Food & Beverage
                    </Button>
                    <Button 
                      variant={activeFilter === 'remittance' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        setActiveFilter('remittance');
                        setShowFiltersMenu(false);
                      }}
                      className="w-full"
                    >
                      Remittance
                    </Button>
                    <Button 
                      variant={activeFilter === 'retail' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        setActiveFilter('retail');
                        setShowFiltersMenu(false);
                      }}
                      className="w-full"
                    >
                      Retail
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {showAll && (
            <div className="flex gap-2 ml-auto">
              <Button 
                variant={viewMode === 'cards' ? "default" : "outline"} 
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                <LayoutGrid className="h-4 w-4 mr-2" /> Card View
              </Button>
              <Button 
                variant={viewMode === 'table' ? "default" : "outline"} 
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4 mr-2" /> Table View
              </Button>
            </div>
          )}
        </div>
        
        {displayedClients.length > 0 ? (
          <div className="fade-up">
            {viewMode === 'cards' ? (
              <Carousel
                ref={carouselRef}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {displayedClients.map((client) => (
                    <CarouselItem 
                      key={client.id} 
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <ClientCard client={client} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-4 flex justify-center gap-2">
                  <CarouselPrevious 
                    className="static transform-none h-8 w-8 rounded-full"
                    variant="outline"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </CarouselPrevious>
                  <CarouselNext 
                    className="static transform-none h-8 w-8 rounded-full"
                    variant="outline"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </CarouselNext>
                </div>
              </Carousel>
            ) : (
              <div className="rounded-lg border overflow-hidden bg-white shadow-sm">
                <ScrollArea className="h-[600px]">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="font-semibold">Store Name</TableHead>
                          <TableHead className="font-semibold">Owner</TableHead>
                          <TableHead className="font-semibold">Type</TableHead>
                          <TableHead className="font-semibold">Contact</TableHead>
                          <TableHead className="font-semibold">Business Package</TableHead>
                          <TableHead className="font-semibold">Activation Date</TableHead>
                          <TableHead className="font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayedClients.map((client) => (
                          <TableRow key={client.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{client.storeName}</TableCell>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>
                              <Badge className={`${getTypeBadgeColor(client.type)}`}>
                                {formatType(client.type)}
                              </Badge>
                            </TableCell>
                            <TableCell>{client.contactNumber ? `+63 ${client.contactNumber}` : "-"}</TableCell>
                            <TableCell>{client.businessPackage || "-"}</TableCell>
                            <TableCell>{client.activationDate || client.joinDate || "-"}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1" /> View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>Client Details</DialogTitle>
                                  </DialogHeader>
                                  
                                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div className="bg-gray-50 p-5 rounded-lg">
                                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                                      <Table>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell className="font-medium">Name</TableCell>
                                            <TableCell>{client.name}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell className="font-medium">Username</TableCell>
                                            <TableCell>{client.username || "-"}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell className="font-medium">Email</TableCell>
                                            <TableCell>{client.email || "-"}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell className="font-medium">Contact Number</TableCell>
                                            <TableCell>{client.contactNumber ? `+63 ${client.contactNumber}` : "-"}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell className="font-medium">Address</TableCell>
                                            <TableCell>{client.address || "-"}</TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-5 rounded-lg">
                                      <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                                      <Table>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell className="font-medium">Store Name</TableCell>
                                            <TableCell>{client.storeName || "-"}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell className="font-medium">Business Type</TableCell>
                                            <TableCell>{formatType(client.type)}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell className="font-medium">Business Package</TableCell>
                                            <TableCell>{client.businessPackage || "-"}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell className="font-medium">TIN Number</TableCell>
                                            <TableCell>{client.tinNumber || "-"}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                            <TableCell className="font-medium">Activation Date</TableCell>
                                            <TableCell>{client.activationDate || client.joinDate || "-"}</TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 fade-up">
            <p className="text-gray-500">No clients found for this filter.</p>
          </div>
        )}
        
        {!showAll && CLIENTS.length > maxItems && (
          <div className="text-center mt-10 fade-up">
            <Button 
              variant="outline" 
              size="lg"
              className="border-innovate-600 text-innovate-600 hover:bg-innovate-50"
              asChild
            >
              <a href="/clients">
                View All Clients
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsShowcase;
