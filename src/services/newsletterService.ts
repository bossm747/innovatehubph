
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface NewsletterSubscription {
  email: string;
  name?: string;
  subscribed_at?: string;
  interests?: string[];
  source?: string;
}

/**
 * Subscribes a user to the newsletter
 */
export const subscribeToNewsletter = async (subscription: NewsletterSubscription): Promise<boolean> => {
  try {
    // Check if email already exists
    const { data: existingSubscriptions } = await supabase
      .from('newsletter_subscriptions')
      .select('email')
      .eq('email', subscription.email)
      .single();
    
    if (existingSubscriptions) {
      toast.info('This email is already subscribed to our newsletter.');
      return false;
    }
    
    // Add new subscription with current timestamp
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{
        ...subscription,
        subscribed_at: new Date().toISOString(),
      }]);
    
    if (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again later.');
      return false;
    }
    
    toast.success('Thank you for subscribing to our newsletter!');
    return true;
  } catch (error) {
    console.error('Newsletter service error:', error);
    toast.error('An unexpected error occurred. Please try again.');
    return false;
  }
};

/**
 * Unsubscribes a user from the newsletter
 */
export const unsubscribeFromNewsletter = async (email: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .delete()
      .eq('email', email);
    
    if (error) {
      console.error('Newsletter unsubscribe error:', error);
      toast.error('Failed to unsubscribe. Please try again later.');
      return false;
    }
    
    toast.success('You have been successfully unsubscribed.');
    return true;
  } catch (error) {
    console.error('Newsletter service error:', error);
    toast.error('An unexpected error occurred. Please try again.');
    return false;
  }
};
