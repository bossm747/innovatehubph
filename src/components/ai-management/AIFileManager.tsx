
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AIFileManager = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI File Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is a simplified static version of the AI File Manager. 
          The interactive functionality has been removed as requested.
        </p>
      </CardContent>
    </Card>
  );
};

export default AIFileManager;
