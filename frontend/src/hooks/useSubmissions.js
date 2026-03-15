import { useState, useEffect, useCallback } from 'react';

// Shared mock data for initial load
const MOCK_SUBMISSIONS = [
  {
    id: "SUB-001",
    customerId: "CUST-123",
    customerName: "Alice Johnson",
    customerEmail: "alice.j@email.com",
    credentialType: "Bachelor's Degree",
    institution: "MIT",
    submittedDate: "2024-02-18",
    status: "pending",
    documents: ["transcript.pdf", "diploma.pdf", "id.pdf"],
    priority: "high"
  },
  {
    id: "SUB-002",
    customerId: "CUST-124",
    customerName: "Bob Smith",
    customerEmail: "bob.smith@email.com",
    credentialType: "Master's Degree",
    institution: "Stanford University",
    submittedDate: "2024-02-17",
    status: "pending",
    documents: ["transcript.pdf", "diploma.pdf"],
    priority: "normal"
  },
  {
    id: "SUB-003",
    customerId: "CUST-125",
    customerName: "Carol Williams",
    customerEmail: "carol.w@email.com",
    credentialType: "Certificate",
    institution: "Harvard Extension",
    submittedDate: "2024-02-16",
    status: "verified",
    documents: ["certificate.pdf"],
    priority: "low"
  }
];

export function useSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmissions(MOCK_SUBMISSIONS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Optimistic update handlers
  const approveSubmission = useCallback((id) => {
    setSubmissions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, status: "verified" } : sub)
    );
  }, []);

  const rejectSubmission = useCallback((id, reason) => {
    setSubmissions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, status: "rejected", reason } : sub)
    );
  }, []);

  const refresh = () => {
    fetchSubmissions();
  };

  return {
    submissions,
    isLoading,
    error,
    approveSubmission,
    rejectSubmission,
    refresh
  };
}
