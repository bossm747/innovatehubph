
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  path: string;
  label: string;
}

const FooterSocialLinks = () => {
  const socialLinks: SocialLink[] = [
    { icon: <Facebook className="h-5 w-5" />, path: "https://facebook.com/platapayinc", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, path: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, path: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, path: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <div className="flex space-x-3">
      {socialLinks.map((link, index) => (
        <a 
          key={index} 
          href={link.path} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white transition-all"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default FooterSocialLinks;
