
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AvailableSecret {
  name: string;
  available: boolean;
  service: string;
}

interface AvailableSecretsContextType {
  secrets: AvailableSecret[];
  isLoading: boolean;
  error: string | null;
  refreshSecrets: () => Promise<void>;
}

const AvailableSecretsContext = createContext<AvailableSecretsContextType>({
  secrets: [],
  isLoading: false,
  error: null,
  refreshSecrets: async () => {},
});

export const useAvailableSecrets = () => useContext(AvailableSecretsContext);

export const AvailableSecretsProvider = ({ children }: { children: ReactNode }) => {
  const [secrets, setSecrets] = useState<AvailableSecret[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSecrets = async () => {
    setIsLoading(true);
    try {
      // Call the edge function to check available secrets
      const { data, error } = await supabase.functions.invoke('check-available-secrets');
      
      if (error) throw error;
      
      setSecrets(data.secrets || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching available secrets:", err);
      setError("Failed to fetch available secrets");
      toast.error("Failed to load API secrets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  return (
    <AvailableSecretsContext.Provider
      value={{
        secrets,
        isLoading,
        error,
        refreshSecrets: fetchSecrets,
      }}
    >
      {children}
    </AvailableSecretsContext.Provider>
  );
};
