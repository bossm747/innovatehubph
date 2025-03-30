
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <Link to="/" className="mr-6 flex items-center space-x-2">
      <img 
        src="/lovable-uploads/e057441a1-afb4-4ef6-9528-d2b5677d9842.png" 
        alt="InnovateHub Logo" 
        className="h-8 w-auto mr-1"
      />
      <span className="font-bold">
        <span className="text-white">Innovate</span>
        <span className="text-purple-500">Hub</span>
      </span>
    </Link>
  );
};

export default NavbarLogo;
