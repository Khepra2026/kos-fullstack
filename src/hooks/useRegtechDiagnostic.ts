import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { mockDiagnosticResult } from '@/mocks/regtechDiagnostic';

interface DiagnosticProfile {
  country_code: string;
  sector_code: string;
  revenue: number;
  employees: number;
  creation_year: number;
}

export interface DiagnosticResult {
  profile: DiagnosticProfile;
  rules: Array<{
    rule_code: string;
    description: string;
    priority: string;
    country_name: string;
    sector_name: string | null;
  }>;
  obligations: Array<{
    code: string;
    domain: string;
    title: string;
    description: string;
    legal_reference: string;
    authority: string;
    urgency: string;
    deadline_type: string;
    sanction_risk: string;
  }>;
  documents: Array<{
    code: string;
    title: string;
    description?: string;
    document_type: string;
    domain: string;
    country_code?: string;
  }>;
  summary: {
    total_rules: number;
    critical_count: number;
    compliance_score: number;
  };
}

export function useRegtechDiagnostic() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isLive, setIsLive] = useState(false);

  const runDiagnostic = useCallback(async (profile: DiagnosticProfile) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc('regtech_run_diagnostic', {
        p_country_code: profile.country_code,
        p_sector_code: profile.sector_code,
        p_revenue: profile.revenue,
        p_employees: profile.employees,
        p_creation_year: profile.creation_year,
      });

      if (rpcError) throw rpcError;

      if (data) {
        setResult(data as DiagnosticResult);
        setIsLive(true);
      }
    } catch (err) {
      setResult(mockDiagnosticResult as DiagnosticResult);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const runDiagnosticFromForm = useCallback(async (
    countryCode: string,
    sectorCode: string,
    revenueValue: string,
    employeeValue: string,
    creationYearValue: string,
  ) => {
    const revenueMap: Record<string, number> = {
      lt_10m: 5000000,
      '10m_50m': 30000000,
      '50m_250m': 150000000,
      '250m_1md': 600000000,
      gt_1md: 2000000000,
    };

    const employeeMap: Record<string, number> = {
      '1_5': 3,
      '6_20': 13,
      '21_50': 35,
      '51_200': 125,
      gt_200: 350,
    };

    const creationYearMap: Record<string, number> = {
      '2024_2026': 2025,
      '2020_2023': 2022,
      '2015_2019': 2017,
      '2010_2014': 2012,
      before_2010: 2005,
    };

    const profile: DiagnosticProfile = {
      country_code: countryCode,
      sector_code: sectorCode,
      revenue: revenueMap[revenueValue] || 5000000,
      employees: employeeMap[employeeValue] || 3,
      creation_year: creationYearMap[creationYearValue] || 2022,
    };

    await runDiagnostic(profile);
  }, [runDiagnostic]);

  return {
    loading,
    error,
    result,
    isLive,
    runDiagnostic,
    runDiagnosticFromForm,
  };
}