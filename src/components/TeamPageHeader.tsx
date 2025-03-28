
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AdminPortalButton from '@/components/AdminPortalButton';

interface TeamPageHeaderProps {
  title: string;
  description: string;
}

const TeamPageHeader: React.FC<TeamPageHeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-50 py-10 border-b">
      <Helmet>
        <title>{title} | InnovateHub</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                      {title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600 max-w-2xl">{description}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <AdminPortalButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPageHeader;
