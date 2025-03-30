
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgentRegistrationForm from '@/components/platapay/AgentRegistrationForm';
import PlatapayFAQ from '@/components/PlatapayFAQ';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Info } from 'lucide-react';

const PlatapayAgentPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleRegistrationSuccess = () => {
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <>
      <Helmet>
        <title>Become a PlataPay Agent | InnovateHub Inc.</title>
        <meta 
          name="description" 
          content="Join PlataPay's growing network of agents. Offer digital financial services and earn additional income. Apply now to become an authorized PlataPay agent."
        />
      </Helmet>
      
      <Navbar />
      
      <main>
        <section className="bg-gradient-to-b from-blue-900 to-blue-800 py-12 md:py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Become a PlataPay Agent</h1>
              <p className="text-xl text-blue-100 mb-6">
                Join our network of successful agents and entrepreneurs earning additional income 
                by providing valuable digital financial services to your community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 p-4 rounded-lg flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center mb-3">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Apply</h3>
                  <p className="text-sm text-center">Complete the application form below</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center mb-3">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Verify</h3>
                  <p className="text-sm text-center">Complete the verification process</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center mb-3">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Start Earning</h3>
                  <p className="text-sm text-center">Begin offering services and earning commission</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {showSuccess ? (
              <Card className="max-w-3xl mx-auto border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Application Submitted Successfully!</h2>
                    <p className="text-green-700 mb-4">
                      Thank you for applying to become a PlataPay agent. Our team will review your application 
                      and contact you within 3-5 business days.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-green-200 text-left w-full mb-4">
                      <h3 className="font-medium flex items-center text-gray-800 mb-2">
                        <Info className="w-4 h-4 mr-2 text-blue-600" />
                        Next Steps:
                      </h3>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>1. Check your email for a confirmation of your application.</li>
                        <li>2. Prepare a copy of your ID for the verification process.</li>
                        <li>3. Our team will contact you to schedule an orientation session.</li>
                        <li>4. Once approved, you will receive your agent credentials.</li>
                      </ul>
                    </div>
                    <p className="text-gray-600 text-sm">
                      For any questions, please contact our support team at <a href="mailto:support@platapay.ph" className="text-blue-600">support@platapay.ph</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="max-w-3xl mx-auto">
                <AgentRegistrationForm onSuccess={handleRegistrationSuccess} />
              </div>
            )}
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Agent Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Additional Income</h3>
                <p className="text-gray-600">
                  Earn commissions on every transaction processed through your account. The more services you offer, the more you earn.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Low Startup Cost</h3>
                <p className="text-gray-600">
                  Start with minimal investment. All you need is a smartphone and an internet connection to begin offering services.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Support</h3>
                <p className="text-gray-600">
                  Receive training, marketing materials, technical support, and regular updates to help grow your business.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <PlatapayFAQ />
      </main>
      
      <Footer />
    </>
  );
};

export default PlatapayAgentPage;
