
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const BlogHighlight = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-white to-innovate-50/50 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
            Latest News
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 hero-text-gradient">
            Industry News & Updates
          </h2>
          <p className="text-lg text-gray-600">
            Stay informed about our partnerships and innovations
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl bg-white">
            {/* Decorative background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-innovate-100/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100/40 rounded-full blur-2xl"></div>
            
            <div className="grid md:grid-cols-5 gap-6 p-6 relative z-10">
              <div className="md:col-span-2">
                <div className="relative rounded-lg overflow-hidden h-full min-h-[240px] bg-gray-100">
                  <img 
                    src="/lovable-uploads/f0b7b62c-13ce-4b9c-bb0b-49b6bbd3e183.png"
                    alt="AllBank and InnovateHub Partnership" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 bg-innovate-600 text-white text-xs px-2 py-1 rounded">
                    March 5, 2025
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-innovate-100/50 text-innovate-800 rounded mb-3">
                    Partnership
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                    InnovateHub welcomes five new business partners in Batangas
                  </h3>
                  <p className="text-gray-600 mb-4">
                    InnovateHub Inc. is proud to announce the onboarding of five new business partners in Batangas region. The expansion includes partnerships with RMCL-Maricel, Majoy Bills Payment, BTS - MaryAnn Mercado, and several food establishments.
                  </p>
                  <p className="text-gray-600 mb-4 hidden md:block">
                    "We're excited to welcome these businesses to our network," said the CEO of InnovateHub. "These partnerships strengthen our presence in the Batangas region and help us deliver financial technology solutions to more communities."
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">Source: Company Press Release</span>
                  <Button variant="outline" className="text-innovate-600 border-innovate-200 hover:bg-innovate-50">
                    <Link to="/blog" className="flex items-center">
                      Read Full Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="text-innovate-600 border-innovate-200 hover:bg-innovate-50" asChild>
              <Link to="/blog">View All News</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlight;
