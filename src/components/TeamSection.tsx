
import React from 'react';
import { Card } from '@/components/ui/card';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembers } from '@/services/teamService';
import { Skeleton } from '@/components/ui/skeleton';

const TeamSection = () => {
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers
  });

  // Filter to only include Leadership team members for the about page preview
  const leadershipMembers = teamMembers?.filter(
    member => member.department === 'Leadership'
  ) || [];

  if (isLoading) {
    return (
      <section id="team-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              The talented individuals who drive our mission forward and ensure we deliver exceptional value to our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="aspect-square relative bg-gradient-to-br from-innovate-500/90 to-blue-600/90 flex items-center justify-center">
                  <Skeleton className="absolute inset-0" />
                </div>
                <div className="p-3">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-1/2 mb-1" />
                  <Skeleton className="h-8 w-full mb-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            The talented individuals who drive our mission forward and ensure we deliver exceptional value to our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {leadershipMembers.length > 0 ? (
            leadershipMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
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
                    {member.full_name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold mb-0.5">{member.full_name}</h3>
                  <p className="text-xs text-innovate-600 mb-1">{member.position}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 h-8 mb-2">{member.bio}</p>
                  <div className="flex space-x-2 pt-1">
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} className="text-gray-500 hover:text-innovate-600 transition-colors" aria-label={`${member.full_name}'s LinkedIn`}>
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <a href={`mailto:${member.email || '#'}`} className={`${member.email ? 'text-gray-500 hover:text-innovate-600' : 'text-gray-300'} transition-colors`} aria-label={`Email ${member.full_name}`}>
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500">No leadership team members found.</p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-base text-gray-600 mb-4">
            Want to see our entire team? Visit our dedicated team page.
          </p>
          <Link 
            to="/team" 
            className="inline-flex items-center px-5 py-2 bg-innovate-600 text-white rounded-md hover:bg-innovate-700 transition-colors text-sm"
          >
            View All Team Members
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
