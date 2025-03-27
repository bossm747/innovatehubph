
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface URLFormProps {
  url: string;
  setUrl: (url: string) => void;
  isLoading: boolean;
  progress: number;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const URLForm = ({ url, setUrl, isLoading, progress, onSubmit }: URLFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="url" className="text-sm font-medium text-gray-700">
          Website URL
        </label>
        <Input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="transition-all duration-200"
          placeholder="https://innovatehub.ph"
          required
        />
      </div>
      
      {isLoading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Crawling website...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}
      
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-innovate-600 hover:bg-innovate-700 text-white transition-all duration-200"
      >
        {isLoading ? "Crawling..." : "Analyze Website"}
      </Button>
    </form>
  );
};
