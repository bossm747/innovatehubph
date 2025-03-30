
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { testPlatapayLeadTracking, testEmailMarketing, testPlatapayEmailTemplate } from '@/utils/testUtils';
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

const TestingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<{
    templates: any | null;
    leads: any | null;
    emails: any | null;
  }>({
    templates: null,
    leads: null,
    emails: null
  });

  const runTemplateTest = async () => {
    setIsLoading(true);
    try {
      const result = await testPlatapayEmailTemplate();
      setTestResults(prev => ({ ...prev, templates: result }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        templates: { success: false, message: 'Test failed with an exception', error } 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const runLeadTest = async () => {
    setIsLoading(true);
    try {
      const result = await testPlatapayLeadTracking();
      setTestResults(prev => ({ ...prev, leads: result }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        leads: { success: false, message: 'Test failed with an exception', error } 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const runEmailTest = async () => {
    setIsLoading(true);
    try {
      const result = await testEmailMarketing();
      setTestResults(prev => ({ ...prev, emails: result }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        emails: { success: false, message: 'Test failed with an exception', error } 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const renderTestResult = (result: any) => {
    if (!result) return null;
    
    return (
      <Alert variant={result.success ? "default" : "destructive"} className="mt-4">
        <div className="flex items-center">
          {result.success ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500 mr-2" />
          )}
          <AlertTitle>{result.success ? "Success" : "Failed"}</AlertTitle>
        </div>
        <AlertDescription className="mt-2">
          {result.message}
          {result.error && (
            <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto">
              {typeof result.error === 'object' 
                ? JSON.stringify(result.error, null, 2) 
                : result.error.toString()}
            </pre>
          )}
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
          InnovateHub Testing Dashboard
          <Badge variant="outline" className="ml-2">Testing Mode</Badge>
        </CardTitle>
        <CardDescription>
          Test various components of the email marketing and lead generation system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="leads">PlataPay Leads</TabsTrigger>
            <TabsTrigger value="emails">Email Marketing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="text-sm font-medium mb-2">PlataPay Email Template Generation Test</h3>
              <p className="text-sm text-gray-600 mb-4">
                This test verifies that the email template generator produces valid HTML templates for PlataPay marketing.
              </p>
              <Button 
                onClick={runTemplateTest} 
                disabled={isLoading}
              >
                {isLoading && activeTab === 'templates' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : "Run Template Test"}
              </Button>
              {renderTestResult(testResults.templates)}
            </div>
          </TabsContent>
          
          <TabsContent value="leads" className="space-y-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="text-sm font-medium mb-2">PlataPay Lead Generation Test</h3>
              <p className="text-sm text-gray-600 mb-4">
                This test verifies that the lead tracking system correctly processes PlataPay lead information.
              </p>
              <Button 
                onClick={runLeadTest} 
                disabled={isLoading}
              >
                {isLoading && activeTab === 'leads' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : "Run Lead Test"}
              </Button>
              {renderTestResult(testResults.leads)}
            </div>
          </TabsContent>
          
          <TabsContent value="emails" className="space-y-4">
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="text-sm font-medium mb-2">Email Marketing System Test</h3>
              <p className="text-sm text-gray-600 mb-4">
                This test verifies that the email marketing system correctly schedules and prepares campaigns.
              </p>
              <Button 
                onClick={runEmailTest} 
                disabled={isLoading}
              >
                {isLoading && activeTab === 'emails' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : "Run Email Test"}
              </Button>
              {renderTestResult(testResults.emails)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-gray-500">
          These tests run in isolation and do not affect production data.
        </p>
        <Button variant="outline" onClick={() => 
          setTestResults({ templates: null, leads: null, emails: null })
        }>
          Clear Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestingDashboard;
