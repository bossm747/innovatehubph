
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail, 
  Briefcase, 
  Award, 
  Calendar
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

interface TeamMemberProps {
  id: string;
  name: string;
  role: string;
  bio?: string;
  achievements?: string[];
  experience?: string;
  email?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  imageSrc?: string;
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

const TeamMember = ({ 
  id,
  name, 
  role, 
  bio, 
  achievements, 
  experience, 
  email, 
  socials, 
  imageSrc,
  delay = 0
}: TeamMemberProps) => {
  const [showBioDialog, setShowBioDialog] = useState(false);

  return (
    <>
      <Card 
        className="border-0 shadow-none bg-transparent overflow-hidden opacity-0 cursor-pointer hover:scale-105 transition-transform duration-300" 
        style={{ 
          animationName: 'fadeUp',
          animationDuration: '0.6s',
          animationTimingFunction: 'ease-out',
          animationFillMode: 'forwards',
          animationDelay: `${delay}ms`
        }}
        onClick={() => setShowBioDialog(true)}
      >
        <div className="relative overflow-hidden rounded-lg group flex flex-col items-center">
          <div className="w-40 h-40 relative mb-4 transform transition-transform duration-300 group-hover:scale-105">
            {/* Enhanced 3D effect with shadow and border */}
            <div className="absolute inset-0 rounded-full shadow-xl z-0"></div>
            <Avatar className={`w-full h-full ${!imageSrc ? getAvatarColor(name) : ''} shadow-inner border-4 border-white z-10`}>
              {imageSrc ? (
                <AvatarImage src={imageSrc} alt={name} className="object-cover" />
              ) : (
                <AvatarFallback className="text-4xl font-bold text-white drop-shadow-md">
                  {getInitials(name)}
                </AvatarFallback>
              )}
            </Avatar>
            
            {/* Enhanced 3D lighting effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-70 z-20"></div>
          </div>
          
          {/* Social media buttons with improved visibility */}
          <div className="absolute -bottom-2 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center z-30">
            <div className="flex gap-3 p-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
              {socials?.twitter && (
                <Button size="icon" variant="ghost" className="rounded-full w-9 h-9 bg-innovate-600 hover:bg-innovate-700 text-white" 
                  onClick={(e) => { e.stopPropagation(); window.open(socials.twitter, '_blank'); }}>
                  <Twitter className="h-4 w-4" />
                </Button>
              )}
              {socials?.facebook && (
                <Button size="icon" variant="ghost" className="rounded-full w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => { e.stopPropagation(); window.open(socials.facebook, '_blank'); }}>
                  <Facebook className="h-4 w-4" />
                </Button>
              )}
              {socials?.linkedin && (
                <Button size="icon" variant="ghost" className="rounded-full w-9 h-9 bg-sky-600 hover:bg-sky-700 text-white"
                  onClick={(e) => { e.stopPropagation(); window.open(socials.linkedin, '_blank'); }}>
                  <Linkedin className="h-4 w-4" />
                </Button>
              )}
              {email && (
                <Button size="icon" variant="ghost" className="rounded-full w-9 h-9 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${email}`; }}>
                  <Mail className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <CardContent className="pt-5 pb-0 px-0 text-center">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-600">{role}</p>
        </CardContent>
      </Card>

      <Dialog open={showBioDialog} onOpenChange={setShowBioDialog}>
        <DialogContent className="sm:max-w-[500px] md:max-w-[600px] p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className={`${!imageSrc ? getAvatarColor(name) : 'bg-gray-100'} p-6 md:w-1/3 flex items-center justify-center`}>
              <div className="w-32 h-32 md:w-full md:h-auto aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl">
                {imageSrc ? (
                  <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-5xl font-bold text-gray-600">{getInitials(name)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 md:w-2/3">
              <DialogHeader>
                <DialogTitle className="text-2xl">{name}</DialogTitle>
                <DialogDescription className="text-lg font-medium text-innovate-600">{role}</DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                {bio && <p className="text-gray-700">{bio}</p>}
                
                {achievements && achievements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center"><Award className="w-4 h-4 mr-2" /> Achievements</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {experience && (
                  <div className="flex items-start">
                    <Briefcase className="w-4 h-4 mr-2 mt-1" />
                    <div>
                      <h4 className="font-semibold">Experience</h4>
                      <p className="text-gray-700">{experience}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex justify-start gap-3 mt-6">
                {socials?.linkedin && (
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.open(socials.linkedin, '_blank')}>
                    <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
                  </Button>
                )}
                {email && (
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.location.href = `mailto:${email}`}>
                    <Mail className="h-4 w-4 mr-1" /> Email
                  </Button>
                )}
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const TeamSection = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      id: "marc",
      name: "Marc Roland Agbay",
      role: "Chairman of the Board",
      bio: "Marc Roland Agbay brings over 15 years of experience in fintech leadership, guiding InnovateHub's strategic vision and long-term growth initiatives.",
      achievements: [
        "Led the company's BSP certification process",
        "Orchestrated InnovateHub's Dubai expansion",
        "Former executive at a leading Philippines financial institution"
      ],
      experience: "15+ years in fintech leadership and strategic planning",
      email: "marc@innovatehub.ph",
      socials: {
        linkedin: "https://linkedin.com/in/marcagbay",
      },
      imageSrc: "/lovable-uploads/e631387a-febd-43e4-a620-a6bdc8a4f081.png"
    },
    {
      id: "lyn",
      name: "Lyn Plata Agbay",
      role: "CEO & Founder",
      bio: "As the visionary founder of InnovateHub, Lyn combines her deep expertise in digital finance with a passion for empowering local communities through technology.",
      achievements: [
        "Founded InnovateHub in 2024",
        "Developed the core PlataPay concept",
        "Established key partnerships with LBC and Dubai financial institutions"
      ],
      experience: "12+ years in digital banking and microenterprise solutions",
      email: "lyn@innovatehub.ph",
      socials: {
        linkedin: "https://linkedin.com/in/lynagbay",
        facebook: "https://facebook.com/lynagbay"
      },
      imageSrc: "/lovable-uploads/3113cd1e-8a6f-4c4b-b8a8-c7e24d9aa394.png"
    },
    {
      id: "venus",
      name: "Venus Pagunsan",
      role: "Operation & Corporate Relations Manager",
      bio: "Venus oversees day-to-day operations and manages InnovateHub's critical corporate partnerships, ensuring smooth execution of business initiatives.",
      experience: "8+ years in operations management and corporate relations",
      email: "venus@innovatehub.ph",
      socials: {
        linkedin: "https://linkedin.com/in/venuspagunsan"
      },
      imageSrc: "/lovable-uploads/60c28117-5e6a-45ad-ae8f-38d4c7c0240f.png"
    },
    {
      id: "maryann",
      name: "Maryann Mercado",
      role: "Admin & Finance Manager",
      bio: "Maryann manages InnovateHub's financial operations, ensuring compliance with BSP regulations and maintaining the company's financial health.",
      experience: "10+ years in financial management and administration",
      email: "maryann@innovatehub.ph",
      socials: {
        linkedin: "https://linkedin.com/in/maryannmercado"
      },
      imageSrc: "/lovable-uploads/60fc5fce-299b-4f14-b006-947a5cd409ba.png"
    },
    {
      id: "zarah",
      name: "Zarah Caparro",
      role: "Project Manager",
      bio: "Zarah leads InnovateHub's project management team, overseeing the development and implementation of client solutions and internal initiatives.",
      achievements: [
        "Managed the deployment of PlataPay's agent network",
        "Led multiple successful fintech implementations"
      ],
      experience: "7+ years in project management and software development",
      email: "zarah@innovatehub.ph",
      socials: {
        linkedin: "https://linkedin.com/in/zarahcaparro"
      }
    },
    {
      id: "prince",
      name: "Prince Cano",
      role: "Marketing Associates",
      bio: "Prince develops and executes InnovateHub's marketing strategies, focusing on building brand awareness and driving adoption of the PlataPay platform.",
      experience: "5+ years in digital marketing and brand development",
      email: "prince@innovatehub.ph",
      socials: {
        twitter: "https://twitter.com/princecano",
        facebook: "https://facebook.com/princecano"
      }
    },
    {
      id: "rico",
      name: "Rico Payoyo",
      role: "Sales Officer",
      bio: "Rico leads the sales team at InnovateHub, building client relationships and expanding the PlataPay agent and merchant network across the Philippines.",
      experience: "8+ years in B2B sales and relationship management",
      email: "rico@innovatehub.ph",
      socials: {
        linkedin: "https://linkedin.com/in/ricopayoyo"
      }
    },
    {
      id: "gladys",
      name: "Gladys Marco",
      role: "Marketing Officer",
      bio: "Gladys coordinates InnovateHub's marketing campaigns and social media presence, helping to raise awareness of PlataPay's services among potential users.",
      experience: "4+ years in social media marketing and content creation",
      email: "gladys@innovatehub.ph",
      socials: {
        facebook: "https://facebook.com/gladysmarco",
        twitter: "https://twitter.com/gladysmarco"
      }
    },
    {
      id: "jonalyn",
      name: "Jonalyn Plata",
      role: "Finance & Support",
      bio: "Jonalyn provides critical support to the finance team, helping to manage transactions and provide administrative assistance across the organization.",
      experience: "6+ years in finance and administrative support",
      email: "jonalyn@innovatehub.ph"
    },
    {
      id: "aron",
      name: "Aron",
      role: "UI Designer & Support",
      bio: "Aron creates intuitive user experiences for InnovateHub's digital products, focusing on making financial technology accessible to all users.",
      experience: "5+ years in UI/UX design and front-end development",
      email: "aron@innovatehub.ph",
      socials: {
        linkedin: "https://linkedin.com/in/arondesigner"
      }
    },
    {
      id: "john",
      name: "John Gerald Catague",
      role: "Back End, Security & Support",
      bio: "John ensures the security and reliability of InnovateHub's technology infrastructure, with a focus on maintaining compliance with financial regulations.",
      achievements: [
        "Implemented BSP-compliant security protocols",
        "Designed secure payment processing system for PlataPay"
      ],
      experience: "9+ years in backend development and cybersecurity",
      email: "john@innovatehub.ph",
      socials: {
        linkedin: "https://linkedin.com/in/johncatague"
      }
    },
    {
      id: "bits",
      name: "BITS Solutions",
      role: "Software DEV Team",
      bio: "BITS Solutions is our trusted software development partner, delivering high-quality code and innovative solutions for our technology needs.",
      experience: "Collaborative team with expertise in fintech application development",
      email: "contact@bitssolutions.ph"
    }
  ];

  // Job openings data
  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      location: "Batangas, Philippines",
      type: "Full-time"
    },
    {
      title: "UI/UX Designer",
      location: "Remote / Batangas, Philippines",
      type: "Full-time"
    },
    {
      title: "PlataPay Agent Relations Specialist",
      location: "Batangas, Philippines",
      type: "Full-time"
    },
    {
      title: "Digital Marketing Specialist",
      location: "Batangas, Philippines",
      type: "Full-time"
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
              key={member.id}
              id={member.id}
              name={member.name}
              role={member.role}
              bio={member.bio}
              achievements={member.achievements}
              experience={member.experience}
              email={member.email}
              socials={member.socials}
              imageSrc={member.imageSrc}
              delay={index * 150}
            />
          ))}
        </div>
        
        {/* Careers Section */}
        <div className="mt-24 opacity-0" style={{ 
          animationName: 'fadeUp',
          animationDuration: '0.6s',
          animationTimingFunction: 'ease-out',
          animationFillMode: 'forwards',
          animationDelay: '600ms'
        }}>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
              Careers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're looking for talented individuals to join our team as we innovate for the future of digital finance in the Philippines and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {openPositions.map((position, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-innovate-100">
                      <Briefcase className="h-5 w-5 text-innovate-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{position.title}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{position.type}</span>
                      </div>
                      <p className="text-gray-600 mt-1 text-sm">{position.location}</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-innovate-600 hover:bg-innovate-700">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <div className="p-8 border border-gray-200 rounded-lg max-w-3xl mx-auto bg-gradient-to-br from-white to-innovate-50">
              <h3 className="text-xl font-semibold mb-2">Don't see the right position?</h3>
              <p className="text-gray-600 mb-6">
                We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Resume
                </Button>
                <Button className="bg-innovate-600 hover:bg-innovate-700">
                  View All Positions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
