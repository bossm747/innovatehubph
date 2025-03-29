
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImagePlus, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  currentValue: string;
  onValueChange: (value: string) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  currentValue,
  onValueChange,
  accept = "*",
  maxSize = 5
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast.error(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    setIsUploading(true);

    // For now, we'll use a simple FileReader to convert the image to a data URL
    // In a real application, you'd typically upload this to a server or storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onValueChange(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClear = () => {
    onValueChange('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          {isUploading ? (
            "Uploading..."
          ) : currentValue ? (
            <>
              <ImagePlus className="h-4 w-4" />
              Change File
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload File
            </>
          )}
        </Button>
        {currentValue && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </Button>
        )}
      </div>
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
      {currentValue && currentValue.startsWith('data:') && (
        <p className="text-xs text-muted-foreground">
          Note: This file is stored as a data URL. In production, you should use a storage service.
        </p>
      )}
    </div>
  );
};
