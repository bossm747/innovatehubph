
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewTabProps {
  crawlResult: any;
  extractImagesFromResult: () => string[];
}

export const OverviewTab = ({ crawlResult, extractImagesFromResult }: OverviewTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pages Crawled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-innovate-700">
              {crawlResult?.data?.pages?.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Images Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-innovate-700">
              {extractImagesFromResult().length}
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
            {crawlResult?.data?.pages?.map((page: any, index: number) => (
              <li key={index} className="text-sm truncate hover:text-innovate-700">
                {page.url}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
