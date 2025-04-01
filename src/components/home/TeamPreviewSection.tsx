
import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembers } from '@/services/teamService';

const TeamPreviewSection = () => {
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers
  });
  
  // Display only leadership team members in the preview (limited to 4)
  const leadershipMembers = teamMembers?.filter(
    member => member.department === 'Leadership'
  ).slice(0, 4) || [];

  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Our Leadership
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team brings together the talents needed to revolutionize digital finance and technology in the Philippines and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {isLoading ? (
            // Loading placeholders
            Array(4).fill(0).map((_, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 fade-up card-3d animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual team members
            leadershipMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 fade-up card-3d"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-64 overflow-hidden bg-gradient-to-br from-innovate-600/80 to-blue-500/80 relative">
                  {member.photo_url ? (
                    <img 
                      src={member.photo_url} 
                      alt={member.full_name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-innovate-600/80 to-blue-500/80"></div>
                      <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                        </svg>
                      </div>
                      <div className="w-32 h-32 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center relative z-10">
                        <Users className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.full_name}</h3>
                  <p className="text-innovate-600 mb-4">{member.position}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{member.bio || "Experienced professional with expertise in digital innovation and business growth."}</p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center fade-up">
          <Button 
            variant="purple"
            size="lg"
            width="fixed"
            className="btn-shine group"
            asChild
          >
            <Link to="/team" className="flex items-center justify-center">
              View Full Team <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;
