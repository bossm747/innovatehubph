
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AvailableSecretsContextType {
  availableSecrets: Record<string, boolean>;
  loading: boolean;
  error: string | null;
  refreshSecrets: () => Promise<void>;
}

const AvailableSecretsContext = createContext<AvailableSecretsContextType>({
  availableSecrets: {},
  loading: true,
  error: null,
  refreshSecrets: async () => {}
});

export const useAvailableSecrets = () => useContext(AvailableSecretsContext);

export const AvailableSecretsProvider = ({ children }: { children: ReactNode }) => {
  const [availableSecrets, setAvailableSecrets] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailableSecrets = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase.functions.invoke('check-available-secrets');
      
      if (fetchError) {
        console.error('Error fetching available secrets:', fetchError);
        setError(fetchError.message || 'Failed to load available secrets');
        return;
      }
      
      if (data && data.availableSecrets) {
        setAvailableSecrets(data.availableSecrets);
      } else {
        setError('Invalid response from secrets check');
      }
    } catch (err) {
      console.error('Error in fetchAvailableSecrets:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableSecrets();
  }, []);

  return (
    <AvailableSecretsContext.Provider 
      value={{ 
        availableSecrets, 
        loading, 
        error, 
        refreshSecrets: fetchAvailableSecrets 
      }}
    >
      {children}
    </AvailableSecretsContext.Provider>
  );
};
