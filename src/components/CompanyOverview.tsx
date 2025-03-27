
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const CompanyOverview = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Company Overview</h2>
          <p className="text-lg text-gray-600">
            From a small startup in Batangas to expanding in Dubai, our journey has been defined by innovation, 
            excellence and a commitment to transforming businesses through technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white border border-gray-100 shadow-soft hover:shadow-medium transition-shadow duration-300 card-hover fade-up">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-innovate-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-innovate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To empower businesses through innovative digital solutions that drive growth, 
                efficiency, and competitive advantage in an increasingly connected world.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-100 shadow-soft hover:shadow-medium transition-shadow duration-300 card-hover fade-up">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-innovate-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-innovate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To be a global leader in digital innovation, recognized for transforming businesses 
                and communities through technology solutions that are accessible, effective, and sustainable.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-100 shadow-soft hover:shadow-medium transition-shadow duration-300 card-hover fade-up">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-innovate-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-innovate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Core Values</h3>
              <p className="text-gray-600">
                Innovation, Integrity, Excellence, Collaboration, and Client Success are the 
                foundation of everything we do at InnovateHub.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <h3 className="text-2xl font-bold mb-6">From Batangas to Dubai: Our Growth Journey</h3>
            <p className="text-gray-600 mb-6">
              Founded in 2010 in San Pascual, Batangas, InnovateHub began as a small team of passionate developers 
              with a vision to transform the local tech landscape. Over the years, we've grown steadily, expanding 
              our team and capabilities to meet the evolving needs of our clients.
            </p>
            <p className="text-gray-600 mb-6">
              In 2018, we established our presence in Dubai, marking a significant milestone in our international 
              expansion. This strategic move has allowed us to serve a global clientele and bring our innovative 
              solutions to new markets.
            </p>
            <p className="text-gray-600">
              Today, with offices in the Philippines and Dubai, we continue to push the boundaries of what's possible 
              in fintech, AI solutions, and e-commerce development, helping businesses of all sizes navigate the 
              digital landscape with confidence.
            </p>
          </div>
          
          <div className="relative fade-up">
            <img 
              src="public/lovable-uploads/d06dbf6f-eafc-4d26-97e4-b5ee5dac0416.png" 
              alt="Our journey" 
              className="w-full h-auto rounded-xl shadow-medium"
            />
            <div className="absolute -bottom-6 -right-6 bg-innovate-600 text-white rounded-lg p-4 shadow-medium">
              <p className="text-2xl font-bold">Since 2010</p>
              <p className="text-sm">Delivering Excellence</p>
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold mb-8">Why Choose InnovateHub</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 border border-gray-100 rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 fade-up">
              <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Speed</h4>
              <p className="text-gray-600">Fast development and implementation of solutions.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 fade-up">
              <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Security</h4>
              <p className="text-gray-600">Top-tier security measures for all solutions.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 fade-up">
              <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Satisfaction</h4>
              <p className="text-gray-600">98% client satisfaction rate.</p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 fade-up">
              <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Innovation</h4>
              <p className="text-gray-600">Cutting-edge solutions for modern problems.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
