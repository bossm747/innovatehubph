
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
  private static CRAWL_RESULTS_KEY = 'firecrawl_results';

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
      
      // Skip the status endpoint test and directly try a minimal crawl
      const testResponse = await fetch('https://api.firecrawl.dev/v1/crawl', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: 'https://example.com',
          limit: 1,
          scrapeOptions: {
            formats: ['markdown']
          }
        })
      });
      
      // Check if the API key was accepted
      if (testResponse.ok) {
        return true;
      }
      
      // Check specific error status
      if (testResponse.status === 401 || testResponse.status === 403) {
        console.error('API key authentication failed with status:', testResponse.status);
        return false;
      }
      
      // If we got another error (like 429 rate limit), 
      // but not an auth error, we assume the key is valid
      const errorData = await testResponse.json();
      console.log('API test response:', errorData);
      
      // If the error is not auth-related, consider the key valid
      return !errorData.error?.toLowerCase().includes('auth') && 
             !errorData.error?.toLowerCase().includes('key');
      
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
      
      // Make the crawl request to the correct endpoint
      const crawlResponse = await fetch('https://api.firecrawl.dev/v1/crawl', {
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
          error: errorData.message || errorData.error || 'Failed to crawl website' 
        };
      }

      const responseData = await crawlResponse.json();
      console.log('Crawl successful:', responseData);
      
      // Store the crawl result in local storage
      this.storeCrawlResult(url, responseData);
      
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

  static storeCrawlResult(url: string, data: any): void {
    try {
      // Get existing results or initialize empty object
      const existingResultsJSON = localStorage.getItem(this.CRAWL_RESULTS_KEY) || '{}';
      const existingResults = JSON.parse(existingResultsJSON);
      
      // Add new result with timestamp
      existingResults[url] = {
        data,
        timestamp: new Date().toISOString()
      };
      
      // Save back to local storage
      localStorage.setItem(this.CRAWL_RESULTS_KEY, JSON.stringify(existingResults));
      console.log(`Crawl result for ${url} stored in local storage`);
    } catch (error) {
      console.error('Error storing crawl result in local storage:', error);
    }
  }

  static getCrawlResult(url: string): { data: any; timestamp: string } | null {
    try {
      const resultsJSON = localStorage.getItem(this.CRAWL_RESULTS_KEY);
      if (!resultsJSON) return null;
      
      const results = JSON.parse(resultsJSON);
      return results[url] || null;
    } catch (error) {
      console.error('Error retrieving crawl result from local storage:', error);
      return null;
    }
  }

  static getAllCrawlResults(): Record<string, { data: any; timestamp: string }> {
    try {
      const resultsJSON = localStorage.getItem(this.CRAWL_RESULTS_KEY);
      if (!resultsJSON) return {};
      
      return JSON.parse(resultsJSON);
    } catch (error) {
      console.error('Error retrieving all crawl results from local storage:', error);
      return {};
    }
  }

  static clearCrawlResults(): void {
    localStorage.removeItem(this.CRAWL_RESULTS_KEY);
    console.log('All crawl results cleared from local storage');
  }
}
