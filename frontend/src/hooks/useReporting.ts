import { useState, useEffect } from 'react';

interface ReportingData {
  score: number;
  reports: any[];
  compliance: { bceao: number; cobac: number };
}

export function useReporting() {
  const [data, setData] = useState<ReportingData | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setData({
        score: 92,
        reports: [],
        compliance: { bceao: 85, cobac: 90 }
      });
      setLoading(false);
    }, 500);
  }, []);
  
  return { data, loading, refresh: () => setLoading(true) };
}

export default useReporting;
