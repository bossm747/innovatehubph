
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeTabProps {
  crawlResult: any;
}

export const CodeTab = ({ crawlResult }: CodeTabProps) => {
  const [codeType, setCodeType] = useState("html");
  
  const htmlContent = crawlResult?.data?.pages?.[0]?.html || "No HTML data available";
  const cssContent = crawlResult?.data?.pages?.[0]?.styles || "No CSS data available";
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">HTML & CSS Samples</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={codeType} onValueChange={setCodeType} className="mb-4">
          <TabsList>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="max-h-96 overflow-y-auto rounded-md bg-gray-900 p-4 text-white font-mono text-sm">
          <pre>{codeType === "html" ? htmlContent : cssContent}</pre>
        </div>
      </CardContent>
    </Card>
  );
};
