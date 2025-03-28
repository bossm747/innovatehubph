import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Maria Santos',
    role: 'Chief Executive Officer',
    bio: 'With over 15 years in fintech leadership, Maria drives our vision forward with passion and strategic insight.',
    image: '/team/maria-santos.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/maria-santos',
      twitter: 'https://twitter.com/mariasantos',
      email: 'maria@innovatehub.com'
    }
  },
  {
    id: 2,
    name: 'Juan Reyes',
    role: 'Chief Technology Officer',
    bio: 'Juan brings extensive experience in blockchain and payment systems, leading our technical innovation.',
    image: '/team/juan-reyes.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/juan-reyes',
      twitter: 'https://twitter.com/juanreyes',
      email: 'juan@innovatehub.com'
    }
  },
  {
    id: 3,
    name: 'Sofia Lim',
    role: 'Head of Product',
    bio: 'Sofia excels at translating complex technical concepts into user-friendly products that solve real problems.',
    image: '/team/sofia-lim.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/sofia-lim',
      twitter: 'https://twitter.com/sofialim',
      email: 'sofia@innovatehub.com'
    }
  },
  {
    id: 4,
    name: 'Miguel Cruz',
    role: 'Chief Financial Officer',
    bio: 'Miguel's financial expertise ensures our growth is sustainable while maximizing value for our clients.',
    image: '/team/miguel-cruz.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/miguel-cruz',
      twitter: 'https://twitter.com/miguelcruz',
      email: 'miguel@innovatehub.com'
    }
  },
  {
    id: 5,
    name: 'Isabella Tan',
    role: 'Head of Marketing',
    bio: 'Isabella crafts our brand story and ensures our solutions reach the businesses that need them most.',
    image: '/team/isabella-tan.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/isabella-tan',
      twitter: 'https://twitter.com/isabellatan',
      email: 'isabella@innovatehub.com'
    }
  },
  {
    id: 6,
    name: 'Gabriel Mendoza',
    role: 'Lead Developer',
    bio: 'Gabriel's technical brilliance and problem-solving skills drive the development of our core platforms.',
    image: '/team/gabriel-mendoza.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/gabriel-mendoza',
      twitter: 'https://twitter.com/gabrielmendoza',
      email: 'gabriel@innovatehub.com'
    }
  },
  {
    id: 7,
    name: 'Olivia Reyes',
    role: 'UX/UI Designer',
    bio: 'Olivia ensures our products are not just functional but delightful to use through thoughtful design.',
    image: '/team/olivia-reyes.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/olivia-reyes',
      twitter: 'https://twitter.com/oliviareyes',
      email: 'olivia@innovatehub.com'
    }
  },
  {
    id: 8,
    name: 'Rafael Lim',
    role: 'Business Development',
    bio: 'Rafael builds strategic partnerships that expand our reach and create new opportunities for growth.',
    image: '/team/rafael-lim.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/rafael-lim',
      twitter: 'https://twitter.com/rafaellim',
      email: 'rafael@innovatehub.com'
    }
  }
];

const TeamSection = () => {
  return (
    <section id="team-section" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The talented individuals who drive our mission forward and ensure we deliver exceptional value to our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={member.id} className="fade-up card-hover" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-innovate-100">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
                <CardDescription className="text-innovate-600 font-medium">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3 pt-2">
                  <a href={member.social.linkedin} className="text-gray-500 hover:text-innovate-600 transition-colors" aria-label={`${member.name}'s LinkedIn`}>
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-500 hover:text-innovate-600 transition-colors" aria-label={`${member.name}'s Twitter`}>
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${member.social.email}`} className="text-gray-500 hover:text-innovate-600 transition-colors" aria-label={`Email ${member.name}`}>
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16 fade-up">
          <p className="text-lg text-gray-600 mb-6">
            Interested in joining our team? We're always looking for talented individuals.
          </p>
          <a 
            href="/contact?subject=careers" 
            className="inline-flex items-center px-6 py-3 bg-innovate-600 text-white rounded-md hover:bg-innovate-700 transition-colors"
          >
            View Open Positions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
