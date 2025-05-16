
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AIResourcesGenerator = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Resources Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is a simplified static version of the AI Resources Generator. 
          The interactive functionality has been removed as requested.
        </p>
      </CardContent>
    </Card>
  );
};

export default AIResourcesGenerator;
