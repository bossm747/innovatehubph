
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FirecrawlService } from '@/utils/FirecrawlService';

interface APIKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const APIKeyInput = ({ apiKey, setApiKey }: APIKeyInputProps) => {
  const { toast } = useToast();
  
  const handleSetApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    try {
      const isValid = await FirecrawlService.testApiKey(apiKey);
      if (isValid) {
        FirecrawlService.saveApiKey(apiKey);
        toast({
          title: "Success",
          description: "API key saved successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid API key or API service is unavailable",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div className="md:col-span-3 space-y-2">
        <label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
          Firecrawl API Key
        </label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Firecrawl API key"
          className="transition-all duration-200"
        />
      </div>
      <Button 
        onClick={handleSetApiKey}
        className="bg-innovate-600 hover:bg-innovate-700 text-white"
      >
        Save API Key
      </Button>
    </div>
  );
};
