
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembers, TeamMember } from '@/services/teamService';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight, Linkedin, Lightbulb, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeamSectionWithData = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: teamMembers, isLoading, error } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNext = () => {
    if (!teamMembers) return;
    
    const maxSlide = Math.ceil(teamMembers.length / 3) - 1;
    setCurrentSlide((prev) => (prev === maxSlide ? maxSlide : prev + 1));
  };

  // Group team members by department
  const departmentGroups = teamMembers?.reduce((acc, member) => {
    const dept = member.department || 'Other';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>) || {};

  const departments = Object.keys(departmentGroups).sort();

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <Lightbulb className="h-7 w-7 text-innovate-600 mr-2" />
              <h2 className="text-3xl font-bold">Our Team</h2>
            </div>
            <div className="w-20 h-1 bg-innovate-500 mx-auto mb-4"></div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Loading our team members...
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative bg-gradient-to-br from-blue-400/40 to-blue-600/40 flex items-center justify-center">
                    <Skeleton className="absolute inset-0" />
                  </div>
                  <div className="p-3">
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-1/2 mb-1" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading team members:", error);
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <Lightbulb className="h-7 w-7 text-innovate-600 mr-2" />
              <h2 className="text-3xl font-bold">Our Team</h2>
            </div>
            <div className="w-20 h-1 bg-innovate-500 mx-auto mb-4"></div>
            <p className="text-base text-red-600 max-w-2xl mx-auto">
              We encountered an error while loading the team information. Please refresh the page or try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Ensure we have data before rendering
  if (!teamMembers || teamMembers.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <Lightbulb className="h-7 w-7 text-innovate-600 mr-2" />
              <h2 className="text-3xl font-bold">Our Team</h2>
            </div>
            <div className="w-20 h-1 bg-innovate-500 mx-auto mb-4"></div>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              No team members found. Check back soon for updates about our amazing team!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <Lightbulb className="h-7 w-7 text-innovate-600 mr-2" />
            <h2 className="text-3xl font-bold">Our Team</h2>
          </div>
          <div className="w-20 h-1 bg-innovate-500 mx-auto mb-4"></div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Meet the passionate innovators behind InnovateHub's success. Our diverse team brings together expertise in technology, finance, and business to deliver exceptional solutions.
          </p>
        </div>

        <div className="flex flex-col space-y-12">
          {departments.length > 0 ? (
            departments.map((department) => (
              <div key={department} className="mb-6">
                <div className="flex items-center mb-6">
                  <Users className="h-5 w-5 text-innovate-600 mr-2" />
                  <h3 className="text-xl font-bold">{department}</h3>
                  <div className="h-0.5 flex-grow bg-gray-200 ml-4"></div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {departmentGroups[department].map((member) => (
                    <Card key={member.id} className="overflow-hidden transition-all duration-300 hover:shadow-md group">
                      <CardContent className="p-0">
                        <div className="aspect-square relative bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-innovate-500/90 to-blue-600/90 relative">
                            <div className="absolute inset-0 opacity-20">
                              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <pattern id={`grid-${member.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                                <rect width="100%" height="100%" fill={`url(#grid-${member.id})`} />
                              </svg>
                            </div>
                            <div className="relative z-10 text-white text-4xl font-bold">
                              {member.full_name.split(' ').map(name => name[0]).join('')}
                            </div>
                          </div>
                          {member.linkedin_url && (
                            <a 
                              href={member.linkedin_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-blue-50 transition-colors"
                            >
                              <Linkedin className="h-3.5 w-3.5 text-blue-600" />
                            </a>
                          )}
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-bold mb-0.5 line-clamp-1">{member.full_name}</h4>
                          <p className="text-xs text-innovate-600 mb-1 line-clamp-1">{member.position}</p>
                          {member.bio && <p className="text-xs text-gray-600 line-clamp-2 h-8">{member.bio}</p>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No departments found.</p>
            </div>
          )}
        </div>

        {teamMembers.length > 5 && (
          <div className="flex justify-center mt-6 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentSlide === Math.ceil(teamMembers.length / 3) - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSectionWithData;
