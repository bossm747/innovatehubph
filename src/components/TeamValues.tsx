
import React from 'react';
import { Building, UserRound, Clock, Users, Briefcase, Shield } from 'lucide-react';

const TeamValues = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Values
          </span>
          <h2 className="text-3xl font-bold mb-4">What Drives Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At InnovateHub, our team structure and values reflect our commitment to excellence, innovation, and client success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Department Cards */}
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-innovate-100 rounded-lg mb-6 flex items-center justify-center">
              <Building className="h-8 w-8 text-innovate-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Leadership & Direction</h3>
            <p className="text-gray-600 mb-6">
              Our Board of Directors and executive leadership provide strategic guidance and vision for InnovateHub's growth and innovation.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-innovate-500 mr-2" />
                <span>Strategic Direction</span>
              </li>
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-innovate-500 mr-2" />
                <span>Visionary Leadership</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Operations & Corporate Relations</h3>
            <p className="text-gray-600 mb-6">
              Our Operations team ensures smooth business processes while building strong relationships with clients and partners.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-blue-500 mr-2" />
                <span>Marketing Excellence</span>
              </li>
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-blue-500 mr-2" />
                <span>Client Relationship Management</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-lg mb-6 flex items-center justify-center">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Administration & Finance</h3>
            <p className="text-gray-600 mb-6">
              Our Admin & Finance team ensures resources are managed efficiently and all financial operations run smoothly.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-green-500 mr-2" />
                <span>Financial Integrity</span>
              </li>
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-green-500 mr-2" />
                <span>Administrative Excellence</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-purple-100 rounded-lg mb-6 flex items-center justify-center">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Project Management</h3>
            <p className="text-gray-600 mb-6">
              Our Project Management team transforms ideas into reality, ensuring timely delivery of high-quality solutions.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-purple-500 mr-2" />
                <span>Technical Excellence</span>
              </li>
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-purple-500 mr-2" />
                <span>Creative Design</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-amber-100 rounded-lg mb-6 flex items-center justify-center">
              <Shield className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Quality & Trust</h3>
            <p className="text-gray-600 mb-6">
              We are committed to delivering the highest quality services and building lasting trust with our clients.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-amber-500 mr-2" />
                <span>Quality Assurance</span>
              </li>
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-amber-500 mr-2" />
                <span>Client Satisfaction</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 bg-rose-100 rounded-lg mb-6 flex items-center justify-center">
              <UserRound className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Innovation & Growth</h3>
            <p className="text-gray-600 mb-6">
              We constantly seek innovative solutions and opportunities for growth in the Philippine tech landscape.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-rose-500 mr-2" />
                <span>Continuous Learning</span>
              </li>
              <li className="flex items-center">
                <UserRound className="h-4 w-4 text-rose-500 mr-2" />
                <span>Technological Advancement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamValues;
