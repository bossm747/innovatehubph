
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SimpleServiceCardProps {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const SimpleServiceCard = ({ title, description, icon, isActive, onClick }: SimpleServiceCardProps) => {
  return (
    <div 
      className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
        isActive ? 'bg-innovate-50 border-innovate-200' : 'bg-white border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <img src={icon} alt={title} className="h-12 w-12 object-contain" />
        </div>
        <div className="flex-1">
          <h3 className={`font-medium ${isActive ? 'text-innovate-800' : 'text-gray-800'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">{description}</p>
        </div>
        <ChevronRight className={`w-5 h-5 ${isActive ? 'text-innovate-600' : 'text-gray-400'}`} />
      </div>
    </div>
  );
};

export default SimpleServiceCard;
