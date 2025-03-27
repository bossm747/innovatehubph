
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CodeTabProps {
  crawlResult: any;
}

export const CodeTab = ({ crawlResult }: CodeTabProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">HTML & CSS Samples</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto rounded-md bg-gray-900 p-4 text-white font-mono text-sm">
          <pre>{crawlResult?.data?.pages?.[0]?.html || "No HTML data available"}</pre>
        </div>
      </CardContent>
    </Card>
  );
};
