import { useState, useEffect, useCallback } from 'react';
import credentialService from '../api/credentialService';

export function useCredentials() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCredentials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await credentialService.getCredentials();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch credentials');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  const refresh = () => {
    fetchCredentials();
  };

  return {
    data,
    isLoading,
    error,
    refresh
  };
}
