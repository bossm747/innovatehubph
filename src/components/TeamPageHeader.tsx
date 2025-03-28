
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight, UserPlus, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import StaffPortalButton from '@/components/StaffPortalButton';

const TeamPageHeader = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-blue-300 filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 rounded-full bg-white/10">
              <Users className="h-5 w-5" />
            </div>
            <div className="text-lg font-medium text-blue-200">Our People</div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Team Behind<br />
            <span className="text-blue-300">InnovateHub's Success</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
            From tech innovators to finance experts, our diverse team brings together the talents needed to revolutionize digital finance in the Philippines and beyond.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              variant="primary"
              width="fixed"
              asChild
            >
              <Link to="#team-section">
                <Users className="h-4 w-4 mr-2" />
                Meet the Team
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="green"
              width="fixed"
              asChild
            >
              <Link to="/contact?subject=careers">
                <UserPlus className="h-4 w-4 mr-2" />
                Join Our Team
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="purple"
              width="fixed"
              asChild
            >
              <Link to="/admin/dashboard">
                <LockKeyhole className="h-4 w-4 mr-2" />
                Staff Portal
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPageHeader;
