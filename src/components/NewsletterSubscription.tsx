
import React from 'react';
import NewsletterSubscriptionForm from './NewsletterSubscriptionForm';

interface NewsletterSubscriptionProps {
  variant?: 'default' | 'footer';
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ variant = 'default' }) => {
  const isFooter = variant === 'footer';
  
  return (
    <div className={isFooter ? '' : 'py-8 px-6 bg-gray-50 rounded-lg border border-gray-200'}>
      <h3 className={`font-semibold mb-2 ${isFooter ? 'text-white text-lg' : 'text-xl'}`}>
        Subscribe to our newsletter
      </h3>
      <p className={`mb-4 ${isFooter ? 'text-gray-300 text-sm' : 'text-gray-600'}`}>
        Get the latest news and updates from InnovateHub
      </p>
      
      <NewsletterSubscriptionForm variant={variant} source={isFooter ? 'footer' : 'subscription-box'} />
    </div>
  );
};

export default NewsletterSubscription;
