import { useState, useEffect, useCallback } from 'react';
import { mockCredentials } from '../data/mockData';

export function useCredentials(userId) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCredentials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // In a real app, you would fetch based on userId
      setData(mockCredentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch credentials');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

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
