
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Create a provider component that maintains the queryClient instance
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Important: We need to create a stable reference to the queryClient
  const [client] = React.useState(() => queryClient);
  
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}
