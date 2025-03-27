
interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing API key with Firecrawl API');
      
      // Since the /auth/verify endpoint doesn't work (as seen in console logs),
      // Let's try a different endpoint for testing
      const response = await fetch('https://api.firecrawl.dev/status', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      // If we get a successful response, the API key is likely valid
      if (response.ok) {
        return true;
      }
      
      // If status endpoint fails, try a minimal crawl as a fallback test
      const testResponse = await fetch('https://api.firecrawl.dev/crawl', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: 'https://example.com',
          limit: 1
        })
      });
      
      return testResponse.ok;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      console.log('Making crawl request to Firecrawl API');
      
      // Start the crawl
      const crawlResponse = await fetch('https://api.firecrawl.dev/crawl', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url,
          limit: 50,
          scrapeOptions: {
            formats: ['markdown', 'html'],
            includeImages: true,
            includeLinks: true,
            includeStyles: true
          }
        })
      });

      if (!crawlResponse.ok) {
        const errorData = await crawlResponse.json();
        return { 
          success: false, 
          error: errorData.message || 'Failed to crawl website' 
        };
      }

      const responseData = await crawlResponse.json();
      console.log('Crawl successful:', responseData);
      
      return { 
        success: true,
        data: responseData 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }
}
