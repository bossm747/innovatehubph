
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <Link to="/" className="mr-6 flex items-center space-x-2">
      <img 
        src="/logo.svg" 
        alt="InnovateHub Logo" 
        className="h-8 w-auto mr-1"
      />
      <span className="font-bold">
        <span className="text-black">Innovate</span>
        <span className="text-purple-500">Hub</span>
      </span>
    </Link>
  );
};

export default NavbarLogo;
