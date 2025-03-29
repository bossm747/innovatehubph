
import React from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  name,
  value,
  onChange,
  placeholder
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Predefined color options for Tailwind classes
  const colorOptions = [
    { label: 'White', value: 'bg-white' },
    { label: 'Light Gray', value: 'bg-gray-50' },
    { label: 'Gray', value: 'bg-gray-100' },
    { label: 'Blue Light', value: 'bg-blue-50' },
    { label: 'Blue', value: 'bg-blue-100' },
    { label: 'Indigo Light', value: 'bg-indigo-50' },
    { label: 'Purple Light', value: 'bg-purple-50' },
    { label: 'InnovateHub Gradient', value: 'bg-gradient-to-r from-innovate-900/10 to-innovate-700/5' },
    { label: 'Blue Gradient', value: 'bg-gradient-to-r from-blue-50 to-indigo-50' }
  ];

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full"
        />
        
        {value && (
          <div 
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded border ${value.startsWith('bg-') ? value : ''}`}
            style={{ 
              background: value.startsWith('bg-') ? undefined : value
            }}
          />
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 pt-1">
        {colorOptions.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-2 py-1 text-xs rounded border ${
              value === option.value ? 'border-innovate-600 bg-innovate-50' : 'border-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerInput;
