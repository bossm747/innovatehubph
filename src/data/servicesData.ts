
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
    id: "fintech-solutions",
    title: "Fintech Solutions",
    description: "Digital wallet and payment solutions that empower communities and create income opportunities for agents.",
    icon: "/lovable-uploads/97f0f4de-a8d2-4527-8374-3152c6e866c4.png",
    slug: "fintech-solutions",
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
    ctaLink: "/fintech-solutions"
  },
  {
    id: "digital-customizations",
    title: "Digital Customizations",
    description: "Tailor-made software solutions designed to meet your specific business needs and challenges.",
    icon: "/lovable-uploads/2a279838-b02e-478c-b41c-5f9480622eba.png",
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
    icon: "/lovable-uploads/e45ba6f6-0256-452d-a877-fb6a9c868d57.png",
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
    icon: "/lovable-uploads/d7a51504-2997-48f7-9e8a-32738ecc513d.png",
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
    id: "mobile-app-development",
    title: "Web & Mobile Apps",
    description: "Custom web and native mobile applications that deliver exceptional user experiences across all devices.",
    icon: "/lovable-uploads/91e21d7a-53f9-41d7-bd62-4a1f5dbe1d12.png",
    slug: "mobile-app-development",
    features: [
      {
        title: "Responsive Web Apps",
        description: "Web applications that function beautifully on any screen size or device."
      },
      {
        title: "Native iOS & Android",
        description: "Platform-specific applications that leverage the full power of mobile devices."
      },
      {
        title: "Cross-Platform Development",
        description: "Efficient solutions that work seamlessly across multiple operating systems."
      }
    ],
    ctaText: "Learn More",
    ctaLink: "/mobile-app-development"
  },
  {
    id: "global-expansion",
    title: "Global Expansion",
    description: "Strategic services to help your business expand internationally, with a focus on Dubai and UAE markets.",
    icon: "/lovable-uploads/f27d4bed-d671-41e9-a719-422eff0cd698.png",
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
