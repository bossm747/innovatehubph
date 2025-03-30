
import React from 'react';
import { Card, CardContent } from './ui/card';
import { 
  Smartphone, Receipt, Send, QrCode, Wallet, Shield,
  BookOpen, Headphones, Code, BadgePercent, BarChart, Globe
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureSectionProps {
  title: string;
  description: string;
  features: Feature[];
  variant?: 'default' | 'blue' | 'purple' | 'gradient';
}

const FeatureSection = ({ 
  title, 
  description, 
  features, 
  variant = 'default' 
}: FeatureSectionProps) => {
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'smartphone': return <Smartphone className="h-8 w-8" />;
      case 'receipt': return <Receipt className="h-8 w-8" />;
      case 'send': return <Send className="h-8 w-8" />;
      case 'qrCode': return <QrCode className="h-8 w-8" />;
      case 'wallet': return <Wallet className="h-8 w-8" />;
      case 'shield': return <Shield className="h-8 w-8" />;
      case 'bookOpen': return <BookOpen className="h-8 w-8" />;
      case 'headphones': return <Headphones className="h-8 w-8" />;
      case 'code': return <Code className="h-8 w-8" />;
      case 'badge': return <BadgePercent className="h-8 w-8" />;
      case 'chart': return <BarChart className="h-8 w-8" />;
      case 'globe': return <Globe className="h-8 w-8" />;
      default: return <BookOpen className="h-8 w-8" />;
    }
  };
  
  const getBgColor = () => {
    switch (variant) {
      case 'blue': return 'bg-blue-50';
      case 'purple': return 'bg-purple-50';
      case 'gradient': return 'bg-gradient-to-r from-blue-50 to-purple-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <section className={`py-16 ${getBgColor()}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  {getIconComponent(feature.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
