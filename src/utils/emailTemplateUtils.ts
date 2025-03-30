
/**
 * Utility functions for working with email templates
 */

/**
 * Personalizes an HTML email template by replacing placeholders with recipient data
 * 
 * @param template The HTML template with placeholders
 * @param recipientData Object containing recipient information
 * @returns Personalized HTML template
 */
export const personalizeTemplate = (
  template: string,
  recipientData: {
    name?: string;
    email?: string;
    company?: string;
    [key: string]: any;
  }
): string => {
  let personalizedTemplate = template;
  
  // Replace standard placeholders
  if (recipientData.name) {
    personalizedTemplate = personalizedTemplate.replace(/\[Recipient\]/g, recipientData.name);
    personalizedTemplate = personalizedTemplate.replace(/\[Name\]/g, recipientData.name);
    personalizedTemplate = personalizedTemplate.replace(/\{name\}/g, recipientData.name);
  }
  
  if (recipientData.email) {
    personalizedTemplate = personalizedTemplate.replace(/\[Email\]/g, recipientData.email);
    personalizedTemplate = personalizedTemplate.replace(/\{email\}/g, recipientData.email);
  }
  
  if (recipientData.company) {
    personalizedTemplate = personalizedTemplate.replace(/\[Company\]/g, recipientData.company);
    personalizedTemplate = personalizedTemplate.replace(/\{company\}/g, recipientData.company);
  }
  
  // Replace any other custom placeholders based on the data object
  for (const [key, value] of Object.entries(recipientData)) {
    if (typeof value === 'string') {
      const bracketPlaceholder = new RegExp(`\\[${key}\\]`, 'gi');
      const curlyPlaceholder = new RegExp(`\\{${key}\\}`, 'gi');
      
      personalizedTemplate = personalizedTemplate.replace(bracketPlaceholder, value);
      personalizedTemplate = personalizedTemplate.replace(curlyPlaceholder, value);
    }
  }
  
  return personalizedTemplate;
};

/**
 * Validates an HTML email template for common issues
 * 
 * @param template The HTML template to validate
 * @returns Object with validation results
 */
export const validateTemplate = (template: string): { 
  isValid: boolean; 
  issues: string[];
  score: number;
} => {
  const issues: string[] = [];
  let score = 100;
  
  // Check for doctype declaration
  if (!template.toLowerCase().includes('<!doctype html>')) {
    issues.push('Missing DOCTYPE declaration');
    score -= 10;
  }
  
  // Check for viewport meta tag (responsive design)
  if (!template.includes('viewport')) {
    issues.push('Missing viewport meta tag for responsive design');
    score -= 5;
  }
  
  // Check for table-based layout (email client compatibility)
  if (!template.includes('<table')) {
    issues.push('Missing table-based layout which improves email client compatibility');
    score -= 15;
  }
  
  // Check for inline CSS (email client compatibility)
  const styleCount = (template.match(/style=/g) || []).length;
  if (styleCount < 5) {
    issues.push('Limited inline CSS which may affect rendering in some email clients');
    score -= 10;
  }
  
  // Check for unsubscribe link (anti-spam compliance)
  if (!template.toLowerCase().includes('unsubscribe')) {
    issues.push('Missing unsubscribe link which is required for compliance');
    score -= 20;
  }
  
  // Check for image alt tags
  const imgTags = template.match(/<img[^>]+>/g) || [];
  const altTags = template.match(/alt=/g) || [];
  if (imgTags.length > altTags.length) {
    issues.push('Some images are missing alt tags for accessibility');
    score -= 5;
  }
  
  // Check for suspicious characters that might indicate encoding issues
  if (template.includes('�')) {
    issues.push('Contains encoding issues or special characters that might not render correctly');
    score -= 10;
  }
  
  // Check for excessive size
  if (template.length > 100000) {
    issues.push('Template is very large which may cause delivery issues');
    score -= 15;
  }
  
  return {
    isValid: score >= 70,
    issues,
    score: Math.max(0, score)
  };
};

/**
 * Extracts a preview text from an HTML email template
 * 
 * @param template The HTML template
 * @param maxLength Maximum length of the preview text
 * @returns Preview text for email clients
 */
export const extractPreviewText = (template: string, maxLength: number = 100): string => {
  // Remove HTML tags
  const textContent = template.replace(/<[^>]*>/g, ' ');
  
  // Remove extra whitespace
  const cleanText = textContent.replace(/\s+/g, ' ').trim();
  
  // Truncate and add ellipsis if needed
  return cleanText.length > maxLength 
    ? cleanText.substring(0, maxLength) + '...'
    : cleanText;
};

/**
 * Gets template statistics like word count, link count, etc.
 * 
 * @param template The HTML template
 * @returns Object with template statistics
 */
export const getTemplateStats = (template: string): {
  wordCount: number;
  linkCount: number;
  imageCount: number;
  estimatedReadingTime: number;
} => {
  // Extract text content
  const textContent = template.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Count words
  const wordCount = textContent.split(' ').length;
  
  // Count links
  const linkCount = (template.match(/<a[^>]+>/g) || []).length;
  
  // Count images
  const imageCount = (template.match(/<img[^>]+>/g) || []).length;
  
  // Estimate reading time (average reading speed is about 200-250 words per minute)
  const estimatedReadingTime = Math.ceil(wordCount / 200);
  
  return {
    wordCount,
    linkCount,
    imageCount,
    estimatedReadingTime
  };
};
