import { useState, useEffect } from "react";
import { securityScanResults, securityCommandStats } from "@/mocks/securityScan";
import { supabase } from "@/lib/supabase";

interface UseSecurityScanReturn {
  data: typeof securityScanResults;
  stats: typeof securityCommandStats;
  loading: boolean;
  error: string | null;
  runScan: () => Promise<void>;
}

export function useSecurityScan(): UseSecurityScanReturn {
  const [data, setData] = useState(securityScanResults);
  const [stats, setStats] = useState(securityCommandStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: scans, error: dbError } = await supabase
        .from("security_scans")
        .select("*")
        .order("scanned_at", { ascending: false })
        .limit(1);

      if (dbError) throw dbError;

      if (scans && scans.length > 0) {
        const latest = scans[0];
        setData({
          scan_type: latest.scan_type,
          score: latest.score,
          headers_score: latest.headers_score,
          csp_score: latest.csp_score,
          cors_score: latest.cors_score,
          cookies_score: latest.cookies_score,
          hsts_score: latest.hsts_score,
          vulnerabilities: latest.vulnerabilities || [],
          recommendations: latest.recommendations || [],
          scan_history: securityScanResults.scan_history,
          owasp_top10_compliance: securityScanResults.owasp_top10_compliance,
          security_headers: securityScanResults.security_headers,
          compliance_score: securityScanResults.compliance_score,
          big_four_target: 95,
          gap_analysis: securityScanResults.gap_analysis,
        });
      }
    } catch (err: any) {
      console.error("Security scan load error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function runScan() {
    setLoading(true);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke("kos-security-scan", {
        body: {},
      });
      if (fnError) throw fnError;
      if (result?.data) {
        setData(prev => ({
          ...prev,
          ...result.data,
          scan_history: prev.scan_history,
          owasp_top10_compliance: prev.owasp_top10_compliance,
          security_headers: prev.security_headers,
          compliance_score: prev.compliance_score,
        }));
      }
    } catch (err: any) {
      console.error("Scan error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { data, stats, loading, error, runScan };
}



