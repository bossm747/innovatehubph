
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserRound, Twitter, Facebook, Linkedin } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  delay?: number;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const getAvatarColor = (name: string) => {
  // Generate a deterministic color based on the name
  const colors = [
    "bg-gradient-to-br from-blue-500 to-blue-700", 
    "bg-gradient-to-br from-green-500 to-green-700",
    "bg-gradient-to-br from-purple-500 to-purple-700", 
    "bg-gradient-to-br from-amber-500 to-amber-700", 
    "bg-gradient-to-br from-rose-500 to-rose-700", 
    "bg-gradient-to-br from-cyan-500 to-cyan-700",
    "bg-gradient-to-br from-indigo-500 to-indigo-700", 
    "bg-gradient-to-br from-emerald-500 to-emerald-700", 
    "bg-gradient-to-br from-orange-500 to-orange-700",
    "bg-gradient-to-br from-lime-500 to-lime-700", 
    "bg-gradient-to-br from-pink-500 to-pink-700", 
    "bg-gradient-to-br from-teal-500 to-teal-700"
  ];
  
  // Sum the character codes in the name to get a deterministic index
  const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
};

const TeamMember = ({ name, role, delay = 0 }: TeamMemberProps) => (
  <Card className="border-0 shadow-none bg-transparent overflow-hidden opacity-0" style={{ 
    animationName: 'fadeUp',
    animationDuration: '0.6s',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
    animationDelay: `${delay}ms`
  }}>
    <div className="relative overflow-hidden rounded-lg group flex flex-col items-center">
      <div className="w-40 h-40 relative mb-4 transform transition-transform duration-300 group-hover:scale-105">
        {/* Enhanced 3D effect with shadow and border */}
        <div className="absolute inset-0 rounded-full shadow-xl z-0"></div>
        <Avatar className={`w-full h-full ${getAvatarColor(name)} shadow-inner border-4 border-white z-10`}>
          <AvatarFallback className="text-4xl font-bold text-white drop-shadow-md">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        {/* Enhanced 3D lighting effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-70 z-20"></div>
      </div>
      
      {/* Social media buttons with improved visibility */}
      <div className="absolute -bottom-2 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center z-30">
        <div className="flex gap-3 p-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
          <Button size="icon" variant="ghost" className="rounded-full w-9 h-9 bg-innovate-600 hover:bg-innovate-700 text-white">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full w-9 h-9 bg-sky-600 hover:bg-sky-700 text-white">
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    <CardContent className="pt-5 pb-0 px-0 text-center">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </CardContent>
  </Card>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Marc Roland Agbay",
      role: "Chairman of the Board"
    },
    {
      name: "Lyn Plata Agbay",
      role: "CEO & Founder"
    },
    {
      name: "Venus Pagunsan",
      role: "Operation & Corporate Relations Manager"
    },
    {
      name: "Maryann Mercado",
      role: "Admin & Finance Manager"
    },
    {
      name: "Zarah Caparro",
      role: "Project Manager"
    },
    {
      name: "Prince Cano",
      role: "Marketing Associates"
    },
    {
      name: "Rico Payoyo",
      role: "Sales Officer"
    },
    {
      name: "Gladys Marco",
      role: "Marketing Officer"
    },
    {
      name: "Jonalyn Plata",
      role: "Finance & Support"
    },
    {
      name: "Aron",
      role: "UI Designer & Support"
    },
    {
      name: "John Gerald Catague",
      role: "Back End, Security & Support"
    },
    {
      name: "BITS Solutions",
      role: "Software DEV Team"
    }
  ];

  return (
    <section id="team" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 opacity-0" style={{ 
          animationName: 'fadeUp',
          animationDuration: '0.6s',
          animationTimingFunction: 'ease-out',
          animationFillMode: 'forwards'
        }}>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">InnovateHub Management Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the talented team behind InnovateHub's success. Our experienced professionals work together to deliver exceptional solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              delay={index * 150}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center opacity-0" style={{ 
          animationName: 'fadeUp',
          animationDuration: '0.6s',
          animationTimingFunction: 'ease-out',
          animationFillMode: 'forwards',
          animationDelay: '600ms'
        }}>
          <h3 className="text-2xl font-semibold mb-4">Join Our Growing Team</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals to join our team and help us innovate for the future.
          </p>
          <a 
            href="#careers" 
            className="px-6 py-3 bg-innovate-600 text-white rounded-md hover:bg-innovate-700 transition-colors inline-flex items-center"
          >
            View Open Positions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
