
import { supabase } from '@/integrations/supabase/client';

export interface ScrapeWebsiteOptions {
  url: string;
  maxPages?: number;
  dataType?: 'html' | 'json' | 'text' | 'markdown';
}

export interface ScrapedData {
  html?: string;
  text?: string;
  metadata?: {
    title?: string;
    description?: string;
    images?: string[];
    links?: string[];
  };
  timestamp: string;
}

const FIRECRAWL_API_KEY_STORAGE_KEY = 'firecrawl_api_key';

/**
 * Save the Firecrawl API key to local storage
 */
export const saveFirecrawlApiKey = (apiKey: string): void => {
  localStorage.setItem(FIRECRAWL_API_KEY_STORAGE_KEY, apiKey);
};

/**
 * Get the Firecrawl API key from local storage
 */
export const getFirecrawlApiKey = (): string | null => {
  return localStorage.getItem(FIRECRAWL_API_KEY_STORAGE_KEY);
};

/**
 * Test if a Firecrawl API key is valid
 */
export const testFirecrawlApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.firecrawl.dev/api/v1/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ test: true })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error testing Firecrawl API key:', error);
    return false;
  }
};

/**
 * Scrape a website using the Firecrawl API
 */
export const scrapeWebsite = async (options: ScrapeWebsiteOptions): Promise<ScrapedData | null> => {
  const { url, maxPages = 1, dataType = 'html' } = options;
  
  try {
    // Check if we have an API key
    const apiKey = getFirecrawlApiKey();
    if (!apiKey) {
      throw new Error('Firecrawl API key not found. Please set your API key first.');
    }
    
    // For now, we'll mock the scraping process since we don't have direct access to crawl4ai
    // In a real implementation, this would make an API call to the crawl4ai endpoint
    
    // Example mock data (in a real implementation, this would come from the API)
    const mockHtml = `
      <html>
        <head>
          <title>Example Website: ${url}</title>
          <meta name="description" content="This is a sample description for ${url}">
        </head>
        <body>
          <h1>Example Website Content</h1>
          <p>This is simulated content from ${url}</p>
          <img src="https://example.com/image1.jpg" alt="Example image 1">
          <img src="https://example.com/image2.jpg" alt="Example image 2">
          <a href="https://example.com/page1">Link 1</a>
          <a href="https://example.com/page2">Link 2</a>
        </body>
      </html>
    `;
    
    // In a real implementation, we would call the API here
    // const response = await fetch('https://api.firecrawl.dev/crawl', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiKey}`
    //   },
    //   body: JSON.stringify({ url, maxPages, dataType })
    // });
    // 
    // const data = await response.json();
    
    // Parse metadata from mock HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(mockHtml, 'text/html');
    
    const title = doc.querySelector('title')?.textContent || '';
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const images = Array.from(doc.querySelectorAll('img')).map(img => img.getAttribute('src') || '');
    const links = Array.from(doc.querySelectorAll('a')).map(a => a.getAttribute('href') || '');
    
    const result: ScrapedData = {
      html: mockHtml,
      text: doc.body.textContent || '',
      metadata: {
        title,
        description,
        images,
        links
      },
      timestamp: new Date().toISOString()
    };
    
    // Store the result in localStorage for demo purposes
    localStorage.setItem('website_data', JSON.stringify({ 
      url, 
      ...result
    }));
    
    return result;
  } catch (error) {
    console.error('Error scraping website:', error);
    throw error;
  }
};

/**
 * Extract images from HTML
 */
export const extractImagesFromHtml = (html: string): string[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('img')).map(img => img.getAttribute('src') || '');
};

/**
 * Extract colors from CSS
 */
export const extractColorsFromCss = (css: string): string[] => {
  // Basic color extraction regex
  const colorRegex = /#[0-9A-Fa-f]{3,6}|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
  const matches = css.match(colorRegex) || [];
  return [...new Set(matches)]; // Remove duplicates
};

/**
 * Extract links from HTML
 */
export const extractLinksFromHtml = (html: string): string[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('a')).map(a => a.getAttribute('href') || '');
};
