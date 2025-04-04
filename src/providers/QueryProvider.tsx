
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client - moved outside of the component to avoid re-creation on every render
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
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
