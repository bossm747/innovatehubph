
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderTree } from "lucide-react";

interface StructureTabProps {
  pages: any[];
}

export const StructureTab = ({ pages }: StructureTabProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <FolderTree className="h-4 w-4" />
          Site Structure
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        {pages.length > 0 ? (
          <ul className="space-y-2">
            {pages.map((page: any, index: number) => (
              <li key={index} className="border-l-2 border-innovate-200 pl-3 py-1">
                <p className="font-medium text-innovate-700">{page.url || "Unknown page"}</p>
                {page.links && page.links.length > 0 ? (
                  <ul className="ml-5 mt-1 space-y-1">
                    {page.links.map((link: string, linkIndex: number) => (
                      <li key={linkIndex} className="text-sm text-gray-600 truncate hover:text-gray-900">
                        {link}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-5 mt-1 text-sm text-gray-500 italic">No links found</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No site structure data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
