
export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  features: ServiceFeature[];
  ctaText: string;
  ctaLink: string;
}

export const servicesData: Service[] = [
  {
    id: "platapay",
    title: "PlataPay",
    description: "Digital wallet and payment solutions that empower communities and create income opportunities for agents.",
    icon: "/lovable-uploads/e093393f-ce20-401d-be26-6d54dda3ace1.png",
    slug: "platapay",
    features: [
      {
        title: "Digital Wallet",
        description: "Secure and user-friendly digital wallet for easy transactions."
      },
      {
        title: "Bills Payment",
        description: "Convenient payment solutions for utilities, loans, and more."
      },
      {
        title: "Agent Network",
        description: "Become part of our growing network of financial service providers."
      }
    ],
    ctaText: "Learn More",
    ctaLink: "/platapay"
  },
  {
    id: "digital-customizations",
    title: "Digital Customizations",
    description: "Tailor-made software solutions designed to meet your specific business needs and challenges.",
    icon: "/lovable-uploads/cd2085af-aad8-4b80-bba9-675dbee01908.png",
    slug: "digital-customizations",
    features: [
      {
        title: "Custom Software",
        description: "Bespoke applications built from the ground up for your unique requirements."
      },
      {
        title: "Business Model Development",
        description: "Strategic digital solutions that enhance your business model and operations."
      },
      {
        title: "IT Consulting",
        description: "Expert guidance on technology adoption and digital transformation."
      }
    ],
    ctaText: "Learn More",
    ctaLink: "/digital-customizations"
  },
  {
    id: "ecommerce",
    title: "E-Commerce Development",
    description: "Comprehensive online store solutions that help businesses sell products and services effectively.",
    icon: "/lovable-uploads/91381d0d-4da4-4d24-bb11-5970f5e2d23e.png",
    slug: "ecommerce",
    features: [
      {
        title: "Online Stores",
        description: "Custom-built e-commerce platforms optimized for your products and target market."
      },
      {
        title: "Payment Integration",
        description: "Seamless integration with multiple payment gateways and processors."
      },
      {
        title: "Order Management",
        description: "Efficient systems for tracking and fulfilling customer orders."
      }
    ],
    ctaText: "Learn More",
    ctaLink: "/ecommerce"
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    description: "Cutting-edge artificial intelligence technologies to automate processes and gain competitive advantages.",
    icon: "/lovable-uploads/ae1af8ab-fd44-41f7-a04f-cc8817d2b3e5.png",
    slug: "ai-solutions",
    features: [
      {
        title: "Chatbots",
        description: "Intelligent virtual assistants for customer service and internal support."
      },
      {
        title: "Predictive Analytics",
        description: "Data-driven insights to anticipate market trends and customer behavior."
      },
      {
        title: "Process Automation",
        description: "AI-powered systems that streamline operations and reduce manual work."
      }
    ],
    ctaText: "Learn More",
    ctaLink: "/ai-solutions"
  },
  {
    id: "global-expansion",
    title: "Global Expansion",
    description: "Strategic services to help your business expand internationally, with a focus on Dubai and UAE markets.",
    icon: "/lovable-uploads/7f87021f-ff1f-40c1-9928-adcf5f825dd9.png",
    slug: "global-expansion",
    features: [
      {
        title: "Dubai Trade License",
        description: "Assistance with obtaining business licenses and establishing legal presence in Dubai."
      },
      {
        title: "International Fintech",
        description: "Specialized services for fintech companies looking to operate globally."
      },
      {
        title: "Market Entry Strategy",
        description: "Customized plans for entering new markets with minimal risks."
      }
    ],
    ctaText: "Learn More",
    ctaLink: "/global-expansion"
  }
];
