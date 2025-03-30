
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <Link to="/" className="mr-6 flex items-center space-x-2">
      <img 
        src="/logo.svg" 
        alt="InnovateHub Logo" 
        className="h-10 w-auto mr-2" // Increased size from h-8 to h-10 and added more margin
      />
      <span className="font-bold text-lg"> {/* Increased text size */}
        <span className="text-black">Innovate</span>
        <span className="text-purple-500">Hub</span>
      </span>
    </Link>
  );
};

export default NavbarLogo;
