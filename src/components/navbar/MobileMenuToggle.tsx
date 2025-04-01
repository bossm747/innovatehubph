
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle = ({ isOpen, onToggle }: MobileMenuToggleProps) => {
  return (
    <button 
      onClick={onToggle} 
      className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors focus:outline-none" 
      aria-label="Toggle Menu"
    >
      {isOpen ? (
        <X className="h-5 w-5 text-gray-700" />
      ) : (
        <Menu className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
};

export default MobileMenuToggle;
