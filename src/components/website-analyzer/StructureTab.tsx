
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StructureTabProps {
  crawlResult: any;
}

export const StructureTab = ({ crawlResult }: StructureTabProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Site Structure</CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        <ul className="space-y-2">
          {crawlResult?.data?.pages?.map((page: any, index: number) => (
            <li key={index}>
              <p className="font-medium text-innovate-700">{page.url}</p>
              {page.links && (
                <ul className="ml-5 mt-1 space-y-1">
                  {page.links.map((link: string, linkIndex: number) => (
                    <li key={linkIndex} className="text-sm text-gray-600 truncate">
                      {link}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
