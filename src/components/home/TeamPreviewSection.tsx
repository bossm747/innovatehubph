
import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembers } from '@/services/teamService';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
    <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-r from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-10 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team brings together the talents needed to revolutionize digital finance and technology in the Philippines and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {isLoading ? (
            // Loading placeholders
            Array(4).fill(0).map((_, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="w-16 h-16 bg-innovate-100 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-8 w-8 text-innovate-600" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual team members with avatar fallbacks instead of images
            leadershipMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 flex flex-col items-center">
                  <Avatar className="w-16 h-16 border-2 border-innovate-100 mb-3">
                    <AvatarFallback className="bg-gradient-to-br from-innovate-500 to-blue-600 text-white">
                      {member.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-semibold text-center mb-1">{member.full_name}</h3>
                  <p className="text-innovate-600 text-sm text-center mb-2">{member.position}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-xs text-center line-clamp-2">{member.bio}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center fade-up">
          <Button 
            variant="purple"
            size="sm"
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
