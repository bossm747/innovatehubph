
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface NavLink {
  name: string;
  path: string;
}

interface FooterNavLinksProps {
  title: string;
  links: NavLink[];
}

const FooterNavLinks = ({ title, links }: FooterNavLinksProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-6 text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.path} 
              className="text-gray-300 hover:text-innovate-400 flex items-center group"
            >
              <ArrowRight className="h-3.5 w-3.5 mr-2 text-innovate-500 transition-transform group-hover:translate-x-1" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavLinks;
