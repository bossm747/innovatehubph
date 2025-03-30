
import { Partner } from '@/components/partners/PartnerCard';

const partnersData: Partner[] = [
  {
    id: 1,
    name: "AllBank",
    logo: "/lovable-uploads/01b0f5ab-9687-4e68-aa2c-76b032dc4268.png",
    category: "Banking",
    description: "AllBank is a thrift bank in the Philippines offering various financial services to consumers and businesses.",
    details: "AllBank provides savings and checking accounts, personal and business loans, and digital banking services. As a partner, they help facilitate financial transactions through PlataPay's digital wallet system.",
    website: "https://www.allbank.ph/",
    integrations: [
      "Seamless fund transfers from AllBank accounts to PlataPay wallet",
      "Cash-in services for PlataPay users through AllBank branches",
      "API integration for transaction processing and verification"
    ]
  },
  {
    id: 2,
    name: "Netbank",
    logo: "/lovable-uploads/d4db533a-3f8c-4a2b-836e-50dbebfadc0a.png",
    category: "Banking",
    description: "Netbank is a digital banking platform providing secure online banking services in the Philippines.",
    details: "As a fully digital bank, Netbank provides innovative financial solutions with a focus on security and user experience. Their partnership with InnovateHub enhances the digital banking capabilities available to PlataPay users.",
    website: "https://www.netbank.ph/",
    integrations: [
      "Real-time account verification",
      "Secure API endpoints for financial transactions",
      "Joint cybersecurity initiatives to protect user data"
    ]
  },
  {
    id: 3,
    name: "Nationlink",
    logo: "/lovable-uploads/2d9edd2e-f7dc-4974-aaeb-7090e85b730f.png",
    category: "Financial Services",
    description: "Nationlink is a financial services provider offering ATM services and digital payment solutions.",
    details: "Nationlink operates one of the largest ATM networks in the Philippines, allowing PlataPay users to access cash withdrawal services from their digital wallets across the country.",
    website: "https://www.nationlink.com.ph/",
    integrations: [
      "ATM withdrawal support for PlataPay wallet users",
      "Cash deposit services through Nationlink terminals",
      "Bill payment processing through integrated systems"
    ]
  },
  {
    id: 4,
    name: "Security Bank",
    logo: "/lovable-uploads/f6f78c89-0ed7-46fd-b59e-c52c49c48dea.png",
    category: "Banking",
    description: "Security Bank is one of the Philippines' leading universal banks providing retail, commercial, and investment banking services.",
    details: "With a strong focus on security and customer service, Security Bank partners with InnovateHub to provide secure banking channels for PlataPay users and enterprise solutions for business clients.",
    website: "https://www.securitybank.com/",
    integrations: [
      "Enterprise banking solutions for business clients",
      "Secure payment gateway integration",
      "Corporate accounts management for large-scale operations"
    ]
  },
  {
    id: 5,
    name: "LBC",
    logo: "/lovable-uploads/a5d173a8-47a6-4bcd-9a20-b998e4327f75.png",
    category: "Logistics",
    description: "LBC Express is a leading courier, cargo, and remittance service provider in the Philippines with the slogan 'We Like To Move It'.",
    details: "LBC's extensive network across the Philippines and international presence makes it an ideal partner for cash remittance services and physical delivery of products purchased through e-commerce platforms built by InnovateHub.",
    website: "https://www.lbcexpress.com/",
    integrations: [
      "Cash remittance services through PlataPay",
      "Package delivery for e-commerce solutions",
      "International money transfer capabilities"
    ]
  },
  {
    id: 6,
    name: "Cebuana Lhuillier",
    logo: "/lovable-uploads/0c914d41-b946-4073-bc60-2f0b4c43c879.png",
    category: "Financial Services",
    description: "Cebuana Lhuillier is a Philippine financial services provider offering pawnshop, remittance, and microinsurance services.",
    details: "With thousands of branches nationwide, Cebuana Lhuillier provides PlataPay users with physical locations for cash-in and cash-out services, expanding the reach of digital financial services to underserved communities.",
    website: "https://www.cebuanalhuillier.com/",
    integrations: [
      "Nationwide cash-in and cash-out network",
      "Microinsurance products available through PlataPay",
      "Pawn services digitally accessible through integrated platforms"
    ]
  },
  {
    id: 7,
    name: "CTI CommuniGate Technologies Inc.",
    logo: "/lovable-uploads/aebcb4eb-e21d-432a-906c-3d3882f5a39c.png",
    category: "Technology",
    description: "CTI CommuniGate Technologies Inc. is a technology provider specializing in communication solutions and IT services.",
    details: "CTI provides the technological infrastructure and communication systems that power many of InnovateHub's digital solutions, ensuring reliable connectivity and data transmission for various applications.",
    website: "https://www.cti.com.ph/",
    integrations: [
      "Backend infrastructure support",
      "Communication systems integration",
      "SMS notification services for transaction alerts"
    ]
  },
  {
    id: 8,
    name: "eCPAY",
    logo: "/lovable-uploads/393a1d8f-69b7-4f99-9e58-3c98e1dd0db6.png",
    category: "Payment Solutions",
    description: "eCPAY is a payment solutions provider offering electronic payment channels for bills, services, and digital products.",
    details: "eCPAY's extensive biller network allows PlataPay users to pay for utilities, government fees, and various services digitally, making everyday financial transactions more convenient.",
    website: "https://www.ecpay.com.ph/",
    integrations: [
      "Bills payment processing",
      "E-load and gaming credits distribution",
      "Government service fee collection"
    ]
  },
  {
    id: 9,
    name: "Sterling Bank",
    logo: "/lovable-uploads/c482324a-e57b-4e5c-a15a-137cf7868b9a.png", 
    category: "Banking",
    description: "Sterling Bank is a financial institution providing innovative banking solutions and financial services.",
    details: "Sterling Bank partners with InnovateHub to offer digital banking services through PlataPay, enabling secure transactions and financial services for customers across the Philippines.",
    website: "https://www.sterlingbank.com/",
    integrations: [
      "Secure mobile banking integration",
      "Real-time transaction processing",
      "Corporate banking solutions for business clients"
    ]
  }
];

export default partnersData;
