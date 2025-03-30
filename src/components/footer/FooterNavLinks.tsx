
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterNavLinkProps {
  title: string;
  links: {
    label: string;
    url: string;
    isExternal?: boolean;
  }[];
}

const FooterNavLinks: React.FC<FooterNavLinkProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            {link.isExternal ? (
              <a 
                href={link.url} 
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link 
                to={link.url}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const navLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", url: "/about-us" },
      { label: "Team", url: "/team" },
      { label: "Clients", url: "/clients" },
      { label: "Partners", url: "/partners" },
      { label: "Contact Us", url: "/contact-us" }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "PlataPay", url: "/platapay" },
      { label: "Fintech Solutions", url: "/fintech-solutions" },
      { label: "Digital Customizations", url: "/digital-customizations" },
      { label: "E-commerce Solutions", url: "/ecommerce" },
      { label: "AI Solutions", url: "/ai-solutions" },
      { label: "Global Expansion", url: "/global-expansion" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", url: "/blog" },
      { label: "AI Tools", url: "/ai-tools" },
      { label: "FAQ", url: "#" },
      { label: "Privacy Policy", url: "/privacy-policy" },
      { label: "Terms of Service", url: "#" }
    ]
  },
  {
    title: "PlataPay",
    links: [
      { label: "Agent Portal", url: "https://app.platapay.ph", isExternal: true },
      { label: "Become an Agent", url: "/inquiry?service=platapay" },
      { label: "Services", url: "/platapay" },
      { label: "Support", url: "/contact-us" },
      { label: "PlataPay Website", url: "https://platapay.ph", isExternal: true }
    ]
  }
];

const FooterNavLinksSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {navLinks.map((section, index) => (
        <FooterNavLinks 
          key={index}
          title={section.title}
          links={section.links}
        />
      ))}
    </div>
  );
};

export default FooterNavLinksSection;
