
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewTabProps {
  pages: any[];
  imageCount: number;
}

export const OverviewTab = ({ pages, imageCount }: OverviewTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pages Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-innovate-700">
              {pages.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Images Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-innovate-700">
              {imageCount}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 max-h-60 overflow-y-auto">
            {pages.map((page: any, index: number) => (
              <li key={index} className="text-sm truncate hover:text-innovate-700">
                {page.url || "Unknown page"}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
