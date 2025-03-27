
import { cn } from "@/lib/utils";

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const Feature = ({ icon, title, description, className, delay = 0 }: FeatureProps) => (
  <div 
    className={cn(
      "bg-white rounded-xl p-6 shadow-soft flex flex-col items-center card-hover",
      "opacity-0 translate-y-4",
      className
    )}
    style={{ 
      animationDelay: `${delay}ms`,
      animationFillMode: 'forwards',
      animationName: 'fadeUp',
      animationDuration: '0.6s',
      animationTimingFunction: 'ease-out'
    }}
  >
    <img 
      src={icon} 
      alt={title} 
      className="h-28 w-auto object-contain mb-6 transition-transform hover:scale-105 duration-300" 
    />
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: "/lovable-uploads/cd2085af-aad8-4b80-bba9-675dbee01908.png",
      title: "Software Development",
      description: "Custom software development for your business needs, built with the latest technologies."
    },
    {
      icon: "/lovable-uploads/91381d0d-4da4-4d24-bb11-5970f5e2d23e.png",
      title: "Digital Transformation",
      description: "Comprehensive solutions to transform your business operations into digital processes."
    },
    {
      icon: "/lovable-uploads/6ad1a40f-6765-4470-9c90-9e9f8aebc540.png",
      title: "IT Consultation",
      description: "Strategic IT consultation to help you navigate the complex technology landscape."
    },
    {
      icon: "/lovable-uploads/ae1af8ab-fd44-41f7-a04f-cc8817d2b3e5.png",
      title: "AI & Machine Learning",
      description: "Cutting-edge AI solutions that help you leverage data for intelligent decision-making."
    },
    {
      icon: "/lovable-uploads/7f87021f-ff1f-40c1-9928-adcf5f825dd9.png",
      title: "Digital Marketing",
      description: "Strategic digital marketing to help you reach your target audience effectively."
    },
    {
      icon: "/lovable-uploads/aa140611-8402-49e4-856c-760e84dd4a61.png",
      title: "Cybersecurity",
      description: "Comprehensive cybersecurity solutions to protect your business from digital threats."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Circuit board decorative elements */}
      <div className="absolute top-0 right-0 -z-10">
        <img 
          src="/lovable-uploads/3f2bfe12-61d3-47da-b6a5-c633e9bb4d1a.png" 
          alt="" 
          className="w-64 h-auto opacity-20"
        />
      </div>
      <div className="absolute bottom-0 left-0 -z-10">
        <img 
          src="/lovable-uploads/e3f92cf2-08dc-4378-842a-da1ca1df4d15.png" 
          alt="" 
          className="w-72 h-auto opacity-20"
        />
      </div>
      
      {/* Network node icon */}
      <div className="absolute top-1/4 right-1/4 -z-10">
        <img 
          src="/lovable-uploads/b84a4b7b-96c8-4b01-9281-38b31f17fa75.png" 
          alt="" 
          className="w-16 h-auto opacity-30"
        />
      </div>
      
      <div className="container mx-auto">
        <div className="text-center mb-16 opacity-0 translate-y-4" style={{ 
          animationName: 'fadeUp',
          animationDuration: '0.6s',
          animationTimingFunction: 'ease-out',
          animationFillMode: 'forwards'
        }}>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Innovative Solutions for Modern Challenges</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide cutting-edge technology solutions to help businesses thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Circuit diagram in background */}
          <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-5">
            <img 
              src="/lovable-uploads/c3b4d9e4-1983-4f74-845a-cdd10db3d092.png" 
              alt="" 
              className="w-full max-w-4xl h-auto"
            />
          </div>
          
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
          
          {/* Toggle switches decoration */}
          <div className="absolute -bottom-4 right-4 -z-10">
            <img 
              src="/lovable-uploads/aaef245b-56e2-437c-81d7-d753e215eb60.png" 
              alt="" 
              className="w-16 h-auto opacity-40"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
