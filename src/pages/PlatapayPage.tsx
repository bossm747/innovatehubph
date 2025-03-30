
// Fix for error: Type '"accent"' is not assignable to type '"default" | "primary" | "blue" | "purple" | "gradient" | "secondary" | "light-blue"'
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlatapayHero from '@/components/PlatapayHero';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSlider from '@/components/TestimonialSlider';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { Agent, CircleUserRound, Hand, Smartphone, Store, QrCode } from 'lucide-react';

const PlatapayPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>PlataPay | InnovateHub</title>
        <meta name="description" content="PlataPay - Digital payment solutions for Filipino businesses and consumers. E-Loading, bills payment, remittance, and more." />
      </Helmet>
      
      <Navbar />
      
      <main className="w-full py-0">
        <PlatapayHero />
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Digital Financial Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              PlataPay enables microentrepreneurs to offer essential financial services to their communities and earn additional income.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="shadow-md bg-white border-blue-100 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Agent size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">For Agents</h3>
                <p className="text-muted-foreground mb-4">
                  Earn additional income by offering digital financial services to your community.
                </p>
                <Button variant="blue" className="w-full">
                  Become an Agent
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-md bg-white border-blue-100 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Store size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">For Merchants</h3>
                <p className="text-muted-foreground mb-4">
                  Accept digital payments and offer valuable services to attract more customers.
                </p>
                <Button variant="primary" className="w-full">
                  Partner with Us
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-md bg-white border-blue-100 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <CircleUserRound size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">For Consumers</h3>
                <p className="text-muted-foreground mb-4">
                  Enjoy convenient access to digital financial services in your neighborhood.
                </p>
                <Button variant="secondary" className="w-full">
                  Find Nearby Agents
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="features" className="w-full mb-20">
            <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Smartphone size={20} />
                    </div>
                    <h3 className="text-lg font-medium mb-2">E-Loading & Bills Payment</h3>
                    <p className="text-muted-foreground text-sm">
                      Offer mobile load and process bills payment for all major utilities.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Hand size={20} />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Remittance Services</h3>
                    <p className="text-muted-foreground text-sm">
                      Process domestic remittances quickly with low fees.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <QrCode size={20} />
                    </div>
                    <h3 className="text-lg font-medium mb-2">QR Payments</h3>
                    <p className="text-muted-foreground text-sm">
                      Accept and process QR code payments from all major e-wallets.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="how-it-works">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-center">How PlataPay Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h4 className="font-medium mb-2">Register</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete a simple application form and verification process.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h4 className="font-medium mb-2">Get Trained</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive comprehensive training on the platform and services.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h4 className="font-medium mb-2">Start Earning</h4>
                    <p className="text-sm text-muted-foreground">
                      Begin offering services and earning commissions immediately.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Agent Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Additional income through transaction commissions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Increased foot traffic to your existing business</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Low capital requirement to start</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Free training and ongoing support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Customer Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Convenient access to financial services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Save time on bills payment and remittances</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Lower fees than traditional banks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Secure and reliable transactions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <FeatureSection 
          title="PlataPay Services"
          description="Our comprehensive suite of digital financial services helps communities access essential financial tools."
          features={[
            {
              title: "E-Loading",
              description: "Load all networks (Globe, Smart, DITO, etc.) and earn commissions on every transaction.",
              icon: "smartphone"
            },
            {
              title: "Bills Payment",
              description: "Process payments for utilities, government services, loans, and more.",
              icon: "receipt"
            },
            {
              title: "Remittance",
              description: "Send and receive money nationwide through our extensive network of partners.",
              icon: "send"
            },
            {
              title: "QR Payments",
              description: "Accept payments from GCash, Maya, and other e-wallets through QR codes.",
              icon: "qrCode"
            },
            {
              title: "Digital Wallet",
              description: "Secure digital wallet for managing funds and transactions.",
              icon: "wallet"
            },
            {
              title: "Micro Insurance",
              description: "Affordable insurance products for everyday Filipinos.",
              icon: "shield"
            },
          ]}
          variant="blue"
        />
        
        <TestimonialSlider 
          testimonials={[
            {
              quote: "PlataPay helped me expand my sari-sari store business by offering e-loading and bills payment. I now earn an additional ₱6,000 monthly from commissions.",
              author: "Maria Santos",
              role: "Sari-sari Store Owner, Batangas",
              avatarUrl: "/testimonials/maria.jpg"
            },
            {
              quote: "As a PlataPay agent, I've become the go-to person in our barangay for financial services. It's not just income - it's about providing valuable services to my community.",
              author: "Juan Reyes",
              role: "PlataPay Agent, Cavite",
              avatarUrl: "/testimonials/juan.jpg"
            },
            {
              quote: "The training and support from PlataPay has been excellent. They're always available to help with any questions or issues.",
              author: "Ana Lim",
              role: "Beauty Shop Owner & PlataPay Agent, Manila",
              avatarUrl: "/testimonials/ana.jpg"
            }
          ]}
        />
        
        <PricingSection 
          title="Agent Packages" 
          description="Choose the right package to start your PlataPay agent journey"
          plans={[
            {
              name: "Basic",
              price: "Free",
              description: "Perfect for small business owners looking to offer basic services",
              features: [
                "E-loading services",
                "Basic bills payment",
                "Web portal access",
                "Email support",
                "Basic training"
              ],
              buttonText: "Start Free",
              buttonLink: "/contact?service=platapay&plan=basic",
              highlighted: false
            },
            {
              name: "Standard",
              price: "₱999",
              description: "Complete solution for dedicated agents with higher commission rates",
              features: [
                "All Basic features",
                "Full bills payment suite",
                "Remittance services",
                "QR code payments",
                "Increased commission rates",
                "Priority support"
              ],
              buttonText: "Get Started",
              buttonLink: "/contact?service=platapay&plan=standard",
              highlighted: true
            },
            {
              name: "Premium",
              price: "₱2,499",
              description: "For businesses wanting to offer all services with branded materials",
              features: [
                "All Standard features",
                "Customized signage",
                "Marketing materials",
                "Highest commission rates",
                "Micro-insurance offerings",
                "Dedicated account manager"
              ],
              buttonText: "Contact Sales",
              buttonLink: "/contact?service=platapay&plan=premium",
              highlighted: false
            }
          ]}
        />
        
        <FAQSection 
          title="Frequently Asked Questions"
          faqs={[
            {
              question: "How do I become a PlataPay agent?",
              answer: "To become a PlataPay agent, you need to fill out an application form, submit the required documents for verification, complete training, and set up your initial working capital. The process typically takes 3-5 business days."
            },
            {
              question: "What are the requirements to become an agent?",
              answer: "Basic requirements include a valid government ID, proof of address, a smartphone or computer with internet connection, and initial working capital. For physical stores, you'll need business permits."
            },
            {
              question: "How much can I earn as a PlataPay agent?",
              answer: "Earnings vary based on transaction volume and services offered. On average, agents earn between ₱3,000 to ₱15,000 monthly, with some high-performing agents earning ₱30,000+ monthly."
            },
            {
              question: "Is there a capital requirement?",
              answer: "Yes, you'll need initial working capital starting from ₱3,000 for the Basic package. This capital is used to fund transactions and is fully recoverable if you decide to stop offering services."
            },
            {
              question: "Do I need a physical store to be an agent?",
              answer: "While having a physical location can help attract customers, it's not strictly required. Many agents operate from home or online, especially for e-loading services."
            },
            {
              question: "How does PlataPay ensure security?",
              answer: "PlataPay employs bank-grade security protocols, two-factor authentication, transaction monitoring, and regular security audits to ensure all transactions are secure and protected."
            }
          ]}
        />
        
        <CTASection
          title="Ready to become a PlataPay agent?"
          subtitle="Start offering essential financial services and earn additional income."
          buttonText="Apply Now"
          buttonLink="/contact?service=platapay"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default PlatapayPage;
