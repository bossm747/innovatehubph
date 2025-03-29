
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export interface ServiceDetailProps {
  id: string;
  title: string;
  detailTitle: string;
  detailDesc: string;
  image: string;
}

const ServiceDetail = ({ id, title, detailTitle, detailDesc, image }: ServiceDetailProps) => {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden fade-up">
      <div className="relative h-60 md:h-72 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-innovate-600/40 to-innovate-900/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
              {title}
            </h3>
            <div className="w-20 h-1 bg-innovate-500 mx-auto"></div>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <h4 className="text-xl font-semibold mb-4">{detailTitle}</h4>
        <p className="text-gray-600 mb-6">{detailDesc}</p>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-700">Expert team with specialized skills</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-700">Tailored solutions for your business needs</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-700">Ongoing support and maintenance</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-gray-700">Fast delivery and implementation</span>
          </li>
        </ul>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine"
            asChild
          >
            <Link to={`${id === 'ai-solutions' ? '/ai-solutions' : '/services'}`}>
              Learn More
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-innovate-200 text-innovate-700 hover:bg-innovate-50"
            asChild
          >
            <Link to="/contact">
              Request a Demo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
