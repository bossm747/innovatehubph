
export interface EditableContent {
  id: string;
  pageName: string;
  sectionName: string;
  sectionType: 'hero' | 'features' | 'services' | 'testimonials' | 'team' | 'contact' | 'cta' | 'partners';
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    imagePath?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    textColor?: string;
    items?: Array<{
      id: string;
      title?: string;
      description?: string;
      imagePath?: string;
      link?: string;
    }>;
  };
}

// Initial sample data for the content management system
export const initialContentData: EditableContent[] = [
  {
    id: "home-hero",
    pageName: "Home",
    sectionName: "Hero",
    sectionType: "hero",
    content: {
      title: "Empowering the Future with Digital Innovation",
      subtitle: "Customized fintech, AI, and e-commerce solutions for a connected world",
      description: "We create tailored technology solutions that drive business growth and enhance user experience in a rapidly evolving digital landscape.",
      buttonText: "Explore Our Services",
      buttonLink: "/services",
      imagePath: "/lovable-uploads/d51f3d08-0518-4808-af9d-83ddda86ee94.png",
      backgroundColor: "bg-gradient-to-r from-innovate-900/10 to-innovate-700/5",
    }
  },
  {
    id: "home-services",
    pageName: "Home",
    sectionName: "Services Showcase",
    sectionType: "services",
    content: {
      title: "Our Services",
      subtitle: "What We Do",
      description: "Smart Solutions for the Digital Economy - We offer a wide range of technology services to help your business thrive.",
      backgroundColor: "bg-gray-50",
      items: [
        {
          id: "service-1",
          title: "PlataPay",
          description: "Digital wallet and payment solutions that empower communities.",
          imagePath: "/lovable-uploads/e093393f-ce20-401d-be26-6d54dda3ace1.png",
          link: "/platapay"
        },
        {
          id: "service-2",
          title: "Digital Customizations",
          description: "Tailor-made software solutions designed to meet your specific business needs.",
          imagePath: "/lovable-uploads/cd2085af-aad8-4b80-bba9-675dbee01908.png",
          link: "/digital-customizations"
        }
      ]
    }
  },
  {
    id: "about-hero",
    pageName: "About",
    sectionName: "Hero",
    sectionType: "hero",
    content: {
      title: "Who We Are",
      subtitle: "Passionate Innovators in the Philippine Tech Landscape",
      description: "InnovateHub is a Philippine-based technology company dedicated to developing customized digital solutions for businesses of all sizes.",
      backgroundColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
      imagePath: "/lovable-uploads/2da10da7-aef0-4d88-b480-d864d7b2daf7.png"
    }
  },
  {
    id: "platapay-hero",
    pageName: "PlataPay",
    sectionName: "Hero",
    sectionType: "hero",
    content: {
      title: "PlataPay – Empowering Micropreneurs Through Digital Finance",
      subtitle: "A secure and income-generating platform for communities",
      description: "PlataPay revolutionizes how communities access financial services with its comprehensive digital wallet platform.",
      backgroundColor: "bg-gradient-to-r from-blue-50 to-purple-50",
      imagePath: "/lovable-uploads/e093393f-ce20-401d-be26-6d54dda3ace1.png"
    }
  }
];
