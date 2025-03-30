
import { supabase } from "@/integrations/supabase/client";

export type EmailType = 'newsletter' | 'promotion' | 'announcement' | 'update';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: EmailType;
}

// Default templates for different email types
export const DEFAULT_TEMPLATES: Record<EmailType, { subject: string, content: string }> = {
  newsletter: {
    subject: "InnovateHub Newsletter: Latest Updates and Insights",
    content: "Dear [Recipient],\n\nWelcome to our latest newsletter! Here's what's new at InnovateHub:\n\n[Content goes here]\n\nBest regards,\nThe InnovateHub Team"
  },
  promotion: {
    subject: "Special Offer from InnovateHub",
    content: "Dear [Recipient],\n\nWe're excited to offer you a special promotion on our services.\n\n[Promotion details]\n\nThis offer is valid until [date].\n\nBest regards,\nThe InnovateHub Team"
  },
  announcement: {
    subject: "Important Announcement from InnovateHub",
    content: "Dear [Recipient],\n\nWe have an important announcement to share with you.\n\n[Announcement details]\n\nThank you for your continued support.\n\nBest regards,\nThe InnovateHub Team"
  },
  update: {
    subject: "PlataPay Product Update",
    content: "Dear [Recipient],\n\nWe've updated our PlataPay solution with new features you'll love:\n\n[Update details]\n\nLet us know if you have any questions.\n\nBest regards,\nThe InnovateHub Team"
  }
};

// Subject line suggestions based on email type
export const getSubjectSuggestions = (type: EmailType) => {
  switch (type) {
    case 'newsletter':
      return [
        "InnovateHub Monthly Newsletter: Tech Insights & Updates",
        "Your Digital Innovation Digest from InnovateHub",
        "Stay Connected: Latest News from InnovateHub",
        "InnovateHub Insider: This Month in Digital Transformation",
        "Fresh Insights: Your InnovateHub Newsletter"
      ];
    case 'promotion':
      return [
        "Limited Time Offer: Save 20% on InnovateHub Services",
        "Exclusive Deal for InnovateHub Clients",
        "Unlock Premium Features: Special PlataPay Promotion",
        "The Offer You've Been Waiting For: InnovateHub x PlataPay",
        "Act Now: Special Rates on Digital Solutions"
      ];
    case 'announcement':
      return [
        "Important Update from InnovateHub",
        "Exciting News: InnovateHub Announces [New Service]",
        "Introducing: The Next Generation of PlataPay",
        "InnovateHub is Expanding to [New Location]",
        "Milestone Achieved: InnovateHub Celebrates [Achievement]"
      ];
    case 'update':
      return [
        "PlataPay 2.0: What's New and Improved",
        "Your InnovateHub Solutions Just Got Better",
        "Important Updates to Your PlataPay Services",
        "Product Update: New Features You'll Love",
        "Security Update: Keeping Your PlataPay Experience Safe"
      ];
    default:
      return [];
  }
};

// Generate content suggestion prompts for AI
export const getContentPrompt = (type: EmailType) => {
  switch (type) {
    case 'newsletter':
      return `Generate a professional newsletter for InnovateHub, a technology company that specializes in digital payment solutions including their flagship product PlataPay. 
      
The newsletter should include:
1. A friendly introduction
2. A main section about recent developments at InnovateHub
3. A section highlighting PlataPay features
4. A closing with a call to action

Use a professional but friendly tone that builds trust with clients and partners. The content should be about 250-300 words.`;

    case 'promotion':
      return `Create a promotional email for InnovateHub's PlataPay digital payment solution. 
      
The email should:
1. Start with an attention-grabbing introduction
2. Highlight a special limited-time offer (15% discount for new users)
3. Explain the key benefits of PlataPay (security, ease of use, lower fees)
4. Include a strong call-to-action
5. Create a sense of urgency

Use persuasive language that motivates readers to take action without being overly pushy. The content should be about 200-250 words.`;

    case 'announcement':
      return `Draft an announcement email from InnovateHub about their expansion into a new market and enhancement of their PlataPay digital payment platform.

The announcement should:
1. Start with the big news clearly stated
2. Explain the benefits of this expansion for clients
3. Introduce new PlataPay features that come with this expansion
4. Mention any important dates or timelines
5. End with how clients can learn more or get involved

Use an excited, confident tone that conveys innovation and growth. The content should be about 200-250 words.`;

    case 'update':
      return `Write a product update email for PlataPay users from InnovateHub.

The update should:
1. Begin by thanking users for their continued trust
2. Clearly list 3-4 new features or improvements
3. Briefly explain the benefits of each update
4. Include information on when and how the updates will be implemented
5. Provide resources for learning more (e.g., documentation, webinar)

Use a helpful, clear tone that focuses on the practical benefits for users. The content should be about 250-300 words.`;

    default:
      return `Generate professional email content for InnovateHub, a technology company specializing in digital payment solutions including their flagship product PlataPay. The content should be engaging, informative, and include a clear call to action.`;
  }
};

// Get email send time recommendations based on recipient data
export const getSendTimeRecommendation = async () => {
  try {
    // In a real implementation, this would analyze past campaign data
    // For now, using general best practices
    return {
      weekday: 'Tuesday or Thursday',
      timeOfDay: 'Morning (9-11 AM) or early afternoon (1-3 PM)',
      timezone: 'Recipient\'s local time when possible',
      note: 'Testing different send times is recommended to find what works best for your specific audience.'
    };
  } catch (error) {
    console.error('Error getting send time recommendations:', error);
    return null;
  }
};

// Get analytics for a specific campaign or all campaigns
export const getCampaignAnalytics = async (campaignId?: string) => {
  try {
    // This would typically fetch real analytics data from the database
    // For now, returning mock data
    return {
      totalSent: 245,
      openRate: 32.8,
      clickRate: 4.3,
      bounceRate: 1.2,
      unsubscribeRate: 0.4,
      topClickedLinks: [
        { url: 'https://innovatehub.ph/platapay', clicks: 24 },
        { url: 'https://innovatehub.ph/contact', clicks: 18 }
      ]
    };
  } catch (error) {
    console.error('Error getting campaign analytics:', error);
    return null;
  }
};

// Schedule an email campaign
export const scheduleEmailCampaign = async (campaign: {
  subject: string;
  content: string;
  templateType: string;
  recipients: string[];
  scheduledAt: Date;
}) => {
  try {
    const { error } = await supabase.from('scheduled_emails').insert({
      subject: campaign.subject,
      template_content: { content: campaign.content },
      template_type: campaign.templateType,
      recipients: campaign.recipients,
      scheduled_at: campaign.scheduledAt.toISOString(),
      sent: false
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error scheduling email campaign:', error);
    return { success: false, error };
  }
};
