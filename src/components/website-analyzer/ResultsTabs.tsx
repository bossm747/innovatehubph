
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, CodeIcon, LayoutIcon, LinkIcon, PaletteIcon } from "lucide-react";
import { OverviewTab } from './OverviewTab';
import { ImagesTab } from './ImagesTab';
import { ColorsTab } from './ColorsTab';
import { StructureTab } from './StructureTab';
import { CodeTab } from './CodeTab';

interface ResultsTabsProps {
  crawlResult: any;
  activeTab: string;
  setActiveTab: (value: string) => void;
  extractImagesFromResult: () => string[];
  extractColorsFromResult: () => string[];
}

export const ResultsTabs = ({ 
  crawlResult, 
  activeTab, 
  setActiveTab,
  extractImagesFromResult,
  extractColorsFromResult
}: ResultsTabsProps) => {
  const images = extractImagesFromResult();
  const colors = extractColorsFromResult();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <LayoutIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="images" className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Images</span>
        </TabsTrigger>
        <TabsTrigger value="colors" className="flex items-center gap-2">
          <PaletteIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Colors</span>
        </TabsTrigger>
        <TabsTrigger value="links" className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Structure</span>
        </TabsTrigger>
        <TabsTrigger value="code" className="flex items-center gap-2">
          <CodeIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Code</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab 
          crawlResult={crawlResult} 
          extractImagesFromResult={extractImagesFromResult}
        />
      </TabsContent>
      
      <TabsContent value="images">
        <ImagesTab images={images} />
      </TabsContent>
      
      <TabsContent value="colors">
        <ColorsTab colors={colors} />
      </TabsContent>
      
      <TabsContent value="links">
        <StructureTab crawlResult={crawlResult} />
      </TabsContent>
      
      <TabsContent value="code">
        <CodeTab crawlResult={crawlResult} />
      </TabsContent>
    </Tabs>
  );
};
