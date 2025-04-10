
import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

interface ContactItem {
  icon: React.ReactNode;
  text: string;
  href: string;
}

const FooterContactInfo = () => {
  const contactInfo: ContactItem[] = [
    { 
      icon: <MapPin className="h-5 w-5 text-innovate-500" />, 
      text: "Main Office: RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas",
      href: "https://maps.google.com/?q=RMCL+Bldg.,+New+Bypass+Rd.,+Bayanan,+San+Pascual,+Batangas"
    },
    { 
      icon: <MapPin className="h-5 w-5 text-innovate-500" />, 
      text: "Satellite Office: Unit 13 InnovateHub Commercial Building, National Highway, San Antonio, San Pascual Batangas",
      href: "https://maps.google.com/?q=InnovateHub+Commercial+Building,+National+Highway,+San+Antonio,+San+Pascual+Batangas" 
    },
    { 
      icon: <Phone className="h-5 w-5 text-innovate-500" />, 
      text: "+63 917 685 1216",
      href: "tel:+639176851216" 
    },
    { 
      icon: <Phone className="h-5 w-5 text-innovate-500" />, 
      text: "+63 918 215 6660",
      href: "tel:+639182156660" 
    },
    { 
      icon: <Phone className="h-5 w-5 text-innovate-500" />, 
      text: "+63 945 518 1139",
      href: "tel:+639455181139" 
    },
    { 
      icon: <Mail className="h-5 w-5 text-innovate-500" />, 
      text: "businessdevelopment@innovatehub.ph",
      href: "mailto:businessdevelopment@innovatehub.ph" 
    },
    { 
      icon: <MessageCircle className="h-5 w-5 text-innovate-500" />, 
      text: "Chat with us on Facebook",
      href: "https://m.me/platapayinc" 
    },
  ];

  return (
    <ul className="space-y-4">
      {contactInfo.map((info, index) => (
        <li key={index}>
          <a 
            href={info.href} 
            className="flex group"
            target={info.href.startsWith('http') ? "_blank" : undefined}
            rel={info.href.startsWith('http') ? "noopener noreferrer" : undefined}
          >
            <span className="flex-shrink-0 mt-1">{info.icon}</span>
            <span className="ml-3 text-gray-300 group-hover:text-innovate-400">{info.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FooterContactInfo;
