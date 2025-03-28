
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, FolderTree, ImageIcon, LayoutDashboard, PaletteIcon } from "lucide-react";
import { OverviewTab } from './OverviewTab';
import { ImagesTab } from './ImagesTab';
import { ColorsTab } from './ColorsTab';
import { StructureTab } from './StructureTab';
import { CodeTab } from './CodeTab';
import { useIsMobile } from "@/hooks/use-mobile";

interface ResultsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  htmlContent: string;
  cssContent: string;
  images: string[];
  colors: string[];
  pages: any[];
}

export const ResultsTabs = ({ 
  activeTab, 
  setActiveTab,
  htmlContent,
  cssContent,
  images,
  colors,
  pages
}: ResultsTabsProps) => {
  const isMobile = useIsMobile();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 mb-4 md:mb-6 w-full">
        <TabsTrigger value="overview" className="flex items-center gap-1 md:gap-2 px-1 md:px-3 py-1.5 md:py-2">
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="images" className="flex items-center gap-1 md:gap-2 px-1 md:px-3 py-1.5 md:py-2">
          <ImageIcon className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">Images</span>
        </TabsTrigger>
        <TabsTrigger value="colors" className="flex items-center gap-1 md:gap-2 px-1 md:px-3 py-1.5 md:py-2">
          <PaletteIcon className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">Colors</span>
        </TabsTrigger>
        <TabsTrigger value="links" className="flex items-center gap-1 md:gap-2 px-1 md:px-3 py-1.5 md:py-2">
          <FolderTree className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">Structure</span>
        </TabsTrigger>
        <TabsTrigger value="code" className="flex items-center gap-1 md:gap-2 px-1 md:px-3 py-1.5 md:py-2">
          <Code className="h-4 w-4" />
          <span className="hidden sm:inline text-xs md:text-sm">Code</span>
        </TabsTrigger>
      </TabsList>
      
      <div className="p-0 sm:p-2 md:p-4">
        <TabsContent value="overview">
          <OverviewTab 
            pages={pages}
            imageCount={images.length}
          />
        </TabsContent>
        
        <TabsContent value="images">
          <ImagesTab images={images} />
        </TabsContent>
        
        <TabsContent value="colors">
          <ColorsTab colors={colors} />
        </TabsContent>
        
        <TabsContent value="links">
          <StructureTab pages={pages} />
        </TabsContent>
        
        <TabsContent value="code">
          <CodeTab htmlContent={htmlContent} cssContent={cssContent} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
