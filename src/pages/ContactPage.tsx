
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import { Helmet } from 'react-helmet';
import HeroBackground from '@/components/hero/HeroBackground';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { MessageCircle, Phone, Building2, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  // Scroll to top on page load
  useScrollToTop();

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>Contact Us | InnovateHub Inc.</title>
        <meta name="description" content="Reach out and let's co-create your digital future. We're here to help transform your business with innovative technology solutions." />
      </Helmet>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CircuitBackground 
          pattern="tech-circle" 
          className="absolute top-20 right-20" 
          size="lg" 
          opacity={0.1} 
          color="primary"
        />
        
        <CircuitBackground 
          pattern="blue-wave" 
          className="absolute -bottom-40 -left-40" 
          size="xl" 
          opacity={0.2} 
          color="primary"
        />
        
        <CircuitBackground 
          pattern="circuit-branches" 
          className="absolute top-1/3 left-1/4" 
          size="md" 
          opacity={0.1}
        />
      </div>
      
      <Navbar />
      
      {/* Hero Section with Contact Options */}
      <section className="relative py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
        <HeroBackground />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Get in <span className="text-blue-300">Touch</span>
            </h1>
            
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in">
              Have a project in mind or questions about our services? Our team is ready to assist you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Chat with Us */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat with Us</h3>
              <p className="text-blue-200 mb-4">Get instant support through our live chat service.</p>
              <Button variant="outline" className="mt-auto bg-transparent border-white/20 hover:bg-white/10">
                Start Chat
              </Button>
            </div>
            
            {/* Call Us */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-blue-200 mb-4">Speak directly with our team for immediate assistance.</p>
              <Button 
                variant="outline" 
                className="mt-auto bg-transparent border-white/20 hover:bg-white/10"
                asChild
              >
                <a href="tel:+639176851216">+63 917 685 1216</a>
              </Button>
            </div>
            
            {/* Visit Us */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-blue-200 mb-4">Come to our office for a face-to-face meeting.</p>
              <Button 
                variant="outline" 
                className="mt-auto bg-transparent border-white/20 hover:bg-white/10"
                asChild
              >
                <a 
                  href="https://maps.google.com/?q=RMCL+Bldg.+New+Bypass+Rd.+Bayanan+San+Pascual+Batangas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Button>
            </div>
            
            {/* Email Us */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-blue-200 mb-4">Send us an email and we'll respond as soon as possible.</p>
              <Button 
                variant="outline" 
                className="mt-auto bg-transparent border-white/20 hover:bg-white/10"
                asChild
              >
                <a href="mailto:businessdevelopment@innovatehub.ph">Send Email</a>
              </Button>
            </div>
            
            {/* Book an Appointment */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book an Appointment</h3>
              <p className="text-blue-200 mb-4">Schedule a meeting with our team at your convenience.</p>
              <Button 
                variant="outline" 
                className="mt-auto bg-transparent border-white/20 hover:bg-white/10"
                asChild
              >
                <Link to="/booking">Schedule Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-80 md:h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.321193931947!2d120.9157831!3d14.0634344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd78505318f7d7%3A0x6e5322e2b627e2dc!2sInnovate%20Hub!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="InnovateHub Location"
              className="w-full h-full"
            ></iframe>
          </div>
          
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Location</h2>
            <p className="text-gray-600">
              RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Business Hours:</strong> Monday - Friday: 9:00 AM - 5:00 PM PHT
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
