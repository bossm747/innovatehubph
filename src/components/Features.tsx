
import { cn } from "@/lib/utils";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const Feature = ({ icon, title, description, className, delay = 0 }: FeatureProps) => (
  <div 
    className={cn(
      "bg-white rounded-xl p-6 shadow-soft flex flex-col items-start card-hover",
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
    <div className="w-12 h-12 rounded-full bg-innovate-100 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Software Development",
      description: "Custom software development for your business needs, built with the latest technologies."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Digital Transformation",
      description: "Comprehensive solutions to transform your business operations into digital processes."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "IT Consultation",
      description: "Strategic IT consultation to help you navigate the complex technology landscape."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: "AI & Machine Learning",
      description: "Cutting-edge AI solutions that help you leverage data for intelligent decision-making."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Digital Marketing",
      description: "Strategic digital marketing to help you reach your target audience effectively."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Cybersecurity",
      description: "Comprehensive cybersecurity solutions to protect your business from digital threats."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Circuit board decorative elements */}
      <div className="absolute top-0 right-0 -z-10">
        <img 
          src="public/lovable-uploads/3f2bfe12-61d3-47da-b6a5-c633e9bb4d1a.png" 
          alt="" 
          className="w-64 h-auto opacity-20"
        />
      </div>
      <div className="absolute bottom-0 left-0 -z-10">
        <img 
          src="public/lovable-uploads/e3f92cf2-08dc-4378-842a-da1ca1df4d15.png" 
          alt="" 
          className="w-72 h-auto opacity-20"
        />
      </div>
      
      {/* Network node icon */}
      <div className="absolute top-1/4 right-1/4 -z-10">
        <img 
          src="public/lovable-uploads/b84a4b7b-96c8-4b01-9281-38b31f17fa75.png" 
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
              src="public/lovable-uploads/c3b4d9e4-1983-4f74-845a-cdd10db3d092.png" 
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
              src="public/lovable-uploads/aaef245b-56e2-437c-81d7-d753e215eb60.png" 
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
