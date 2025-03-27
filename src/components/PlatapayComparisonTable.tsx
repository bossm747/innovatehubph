
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle, HelpCircle, AlertCircle } from 'lucide-react';

const PlatapayComparisonTable = () => {
  // Define the features to compare
  const features = [
    { name: 'Bills Payment', description: 'Pay utilities, loans, and government fees' },
    { name: 'E-Loading', description: 'Load mobile credits for all networks' },
    { name: 'Remittance', description: 'Send money across the Philippines' },
    { name: 'QR Payments', description: 'Make cashless payments via QR code' },
    { name: 'Agent Commission Rates', description: 'Competitive earnings for service providers' },
    { name: 'Easy Registration', description: 'Quick sign-up process for new agents' },
    { name: 'Minimal Capital Requirement', description: 'Low barrier to entry for small entrepreneurs' },
    { name: 'Mobile App', description: 'Dedicated smartphone application' },
    { name: 'Training & Support', description: 'Comprehensive onboarding for agents' },
  ];
  
  // Define competitors and their support for each feature
  const competitors = [
    { 
      name: 'PlataPay', 
      logo: '/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png',
      features: {
        'Bills Payment': { supported: true, note: 'Extensive biller network' },
        'E-Loading': { supported: true, note: 'All networks' },
        'Remittance': { supported: true, note: 'Nationwide' },
        'QR Payments': { supported: true, note: 'Fast transactions' },
        'Agent Commission Rates': { supported: true, note: 'Industry-leading' },
        'Easy Registration': { supported: true, note: 'Quick process' },
        'Minimal Capital Requirement': { supported: true, note: 'Very affordable' },
        'Mobile App': { supported: true, note: 'User-friendly' },
        'Training & Support': { supported: true, note: 'Comprehensive' },
      }
    },
    { 
      name: 'Competitor A', 
      logo: null,
      features: {
        'Bills Payment': { supported: true, note: 'Limited billers' },
        'E-Loading': { supported: true, note: 'Major networks only' },
        'Remittance': { supported: true, note: 'Limited locations' },
        'QR Payments': { supported: false },
        'Agent Commission Rates': { supported: true, note: 'Standard rates' },
        'Easy Registration': { supported: false, note: 'Complex process' },
        'Minimal Capital Requirement': { supported: false, note: 'High initial investment' },
        'Mobile App': { supported: true, note: 'Basic features' },
        'Training & Support': { supported: 'partial', note: 'Limited training' },
      }
    },
    { 
      name: 'Competitor B', 
      logo: null,
      features: {
        'Bills Payment': { supported: true, note: 'Standard coverage' },
        'E-Loading': { supported: true },
        'Remittance': { supported: 'partial', note: 'Regional only' },
        'QR Payments': { supported: true, note: 'Basic implementation' },
        'Agent Commission Rates': { supported: 'partial', note: 'Below average' },
        'Easy Registration': { supported: true, note: 'Moderate complexity' },
        'Minimal Capital Requirement': { supported: 'partial', note: 'Moderate investment' },
        'Mobile App': { supported: true, note: 'Limited functionality' },
        'Training & Support': { supported: true, note: 'Basic support' },
      }
    }
  ];

  // Function to render the appropriate icon for feature support
  const renderSupportIcon = (supported) => {
    if (supported === true) {
      return <CheckCircle2 className="h-6 w-6 text-green-500" />;
    } else if (supported === false) {
      return <XCircle className="h-6 w-6 text-red-500" />;
    } else if (supported === 'partial') {
      return <AlertCircle className="h-6 w-6 text-amber-500" />;
    } else {
      return <HelpCircle className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Market Comparison
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How PlataPay Compares</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See how PlataPay stacks up against other financial service providers in the Philippines. 
            We're committed to offering the best service and highest value for both agents and users.
          </p>
        </div>
        
        <Card className="overflow-hidden border-none shadow-lg fade-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-innovate-50">
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b border-gray-200 min-w-[280px]">Feature</th>
                  {competitors.map((competitor, index) => (
                    <th key={index} className="px-6 py-4 text-center font-semibold text-gray-700 border-b border-gray-200 min-w-[180px]">
                      <div className="flex flex-col items-center justify-center">
                        {competitor.logo ? (
                          <img 
                            src={competitor.logo} 
                            alt={`${competitor.name} logo`} 
                            className="h-10 w-10 mb-2 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 mb-2 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 font-bold">{competitor.name.charAt(0)}</span>
                          </div>
                        )}
                        <span>{competitor.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, featureIndex) => (
                  <tr key={featureIndex} className={featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <div>
                        <p className="font-medium text-gray-800">{feature.name}</p>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </td>
                    {competitors.map((competitor, compIndex) => {
                      const featureSupport = competitor.features[feature.name];
                      return (
                        <td key={compIndex} className="px-6 py-4 text-center border-b border-gray-200">
                          <div className="flex flex-col items-center justify-center">
                            {renderSupportIcon(featureSupport?.supported)}
                            {featureSupport?.note && (
                              <span className="text-xs text-gray-500 mt-1">{featureSupport.note}</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 italic">
            This comparison is based on publicly available information and may not reflect recent changes by competitors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatapayComparisonTable;
