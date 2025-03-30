
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
    queryFn: fetchTeamMembers
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-innovate-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loading team members...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] relative">
                    <Skeleton className="absolute inset-0" />
                  </div>
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-20 w-full" />
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
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-innovate-500 mx-auto mb-6"></div>
            <p className="text-lg text-red-600 max-w-2xl mx-auto">
              Error loading team members. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-innovate-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No team members found. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Lightbulb className="h-8 w-8 text-innovate-600 mr-2" />
            <h2 className="text-3xl font-bold">Our Team</h2>
          </div>
          <div className="w-20 h-1 bg-innovate-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the passionate innovators behind InnovateHub's success. Our diverse team brings together expertise in technology, finance, and business to deliver exceptional solutions.
          </p>
        </div>

        <div className="flex flex-col space-y-16">
          {departments.map((department) => (
            <div key={department} className="mb-8">
              <div className="flex items-center mb-8">
                <Users className="h-6 w-6 text-innovate-600 mr-2" />
                <h3 className="text-2xl font-bold">{department}</h3>
                <div className="h-0.5 flex-grow bg-gray-200 ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {departmentGroups[department].map((member) => (
                  <Card key={member.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
                    <CardContent className="p-0">
                      <div className="aspect-[4/5] relative">
                        {member.photo_url ? (
                          <img 
                            src={member.photo_url} 
                            alt={member.full_name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                              {member.full_name.split(' ').map(name => name[0]).join('')}
                            </span>
                          </div>
                        )}
                        {member.linkedin_url && (
                          <a 
                            href={member.linkedin_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                          >
                            <Linkedin className="h-5 w-5 text-blue-600" />
                          </a>
                        )}
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-1">{member.full_name}</h4>
                        <p className="text-innovate-600 mb-4">{member.position}</p>
                        {member.bio && <p className="text-gray-600 line-clamp-4">{member.bio}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length > 3 && (
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentSlide === Math.ceil(teamMembers.length / 3) - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSectionWithData;
