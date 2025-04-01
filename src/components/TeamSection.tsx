import React from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Maria Santos',
    role: 'Chief Executive Officer',
    bio: 'With over 15 years in fintech leadership, Maria drives our vision forward with passion and strategic insight.',
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
    bio: "Miguel's financial expertise ensures our growth is sustainable while maximizing value for our clients.",
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
    bio: "Gabriel's technical brilliance and problem-solving skills drive the development of our core platforms.",
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
    social: {
      linkedin: 'https://linkedin.com/in/rafael-lim',
      twitter: 'https://twitter.com/rafaellim',
      email: 'rafael@innovatehub.com'
    }
  }
];

const TeamSection = () => {
  return (
    <section id="team-section" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            The talented individuals who drive our mission forward and ensure we deliver exceptional value to our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {teamMembers.map((member, index) => (
            <Card key={member.id} className="fade-up card-hover overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="aspect-square relative bg-gradient-to-br from-innovate-500/90 to-blue-600/90 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <pattern id={`grid-pattern-${member.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#grid-pattern-${member.id})`} />
                  </svg>
                </div>
                <span className="text-white text-3xl font-bold relative z-10">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold mb-0.5">{member.name}</h3>
                <p className="text-xs text-innovate-600 mb-1">{member.role}</p>
                <p className="text-xs text-gray-600 line-clamp-2 h-8 mb-2">{member.bio}</p>
                <div className="flex space-x-2 pt-1">
                  <a href={member.social.linkedin} className="text-gray-500 hover:text-innovate-600 transition-colors" aria-label={`${member.name}'s LinkedIn`}>
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-500 hover:text-innovate-600 transition-colors" aria-label={`${member.name}'s Twitter`}>
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                  <a href={`mailto:${member.social.email}`} className="text-gray-500 hover:text-innovate-600 transition-colors" aria-label={`Email ${member.name}`}>
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 fade-up">
          <p className="text-base text-gray-600 mb-4">
            Interested in joining our team? We're always looking for talented individuals.
          </p>
          <a 
            href="/contact?subject=careers" 
            className="inline-flex items-center px-5 py-2 bg-innovate-600 text-white rounded-md hover:bg-innovate-700 transition-colors text-sm"
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
