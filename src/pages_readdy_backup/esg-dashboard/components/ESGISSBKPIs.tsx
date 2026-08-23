interface S1Data {
  scope_1_tco2e: number;
  scope_2_tco2e: number;
  scope_3_tco2e: number;
  intensite_carbone: number;
  part_energies_renouvelables: number;
  eau_m3: number;
  dechets_t: number;
  biodiversite_sites_proteges: number;
  adaptation_climat_score: number;
  analyse_scenario_2c: boolean;
  conformite_tcfd: string;
  date_reporting: string;
}

interface S2Data {
  diversite_conseil_pct: number;
  diversite_management_pct: number;
  ecart_remuneration_h_f: number;
  taux_rotation: number;
  heures_formation_par_employe: number;
  accidents_travail_taux: number;
  satisfaction_employe_nps: number;
  droits_humains_audit: boolean;
  chaine_approvisionnement_due_diligence: string;
  communautes_locales_investissement_fcfa: number;
  cybersecurite_incidents_nombre: number;
  protection_donnees_conformite: string;
  date_reporting: string;
}

interface ESGISSBKPIsProps {
  s1: S1Data;
  s2: S2Data;
}

function KPICard({
  label,
  value,
  unit,
  trend,
  color,
}: {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}) {
  const trendIcon = trend === 'up' ? 'ri-arrow-up-line' : trend === 'down' ? 'ri-arrow-down-line' : 'ri-subtract-line';
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-foreground-400';

  return (
    <div className="bg-background-50 rounded-lg border border-background-200/70 p-3 hover:border-background-300/60 transition-all">
      <div className="text-[10px] text-foreground-500 font-body mb-1">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-lg font-bold font-heading ${color || 'text-foreground-950'}`}>{value}</span>
        {unit && <span className="text-[10px] text-foreground-500 font-body">{unit}</span>}
        {trend && (
          <span className={`text-xs ${trendColor}`}>
            <i className={trendIcon}></i>
          </span>
        )}
      </div>
    </div>
  );
}

export default function ESGISSBKPIs({ s1, s2 }: ESGISSBKPIsProps) {
  const totalScope = s1.scope_1_tco2e + s1.scope_2_tco2e + s1.scope_3_tco2e;

  return (
    <div className="space-y-5">
      {/* ISSB S1 — Climat */}
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <i className="ri-earth-line text-sm"></i>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground-950 font-heading">ISSB S1 — Indicateurs Climatiques</h3>
            <p className="text-[10px] text-foreground-500 font-body">Scope 1, 2, 3 · Intensité carbone · Énergies renouvelables</p>
          </div>
        </div>

        {/* Scope bars */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-foreground-600 font-body">Émissions totales (tCO2e)</span>
            <span className="font-bold text-foreground-800 font-body">{totalScope.toFixed(1)}</span>
          </div>
          <div className="h-6 bg-background-100 rounded-md overflow-hidden flex">
            <div
              className="h-full bg-red-400 flex items-center justify-center text-[9px] text-white font-body"
              style={{ width: `${(s1.scope_1_tco2e / totalScope) * 100}%` }}
              title={`Scope 1: ${s1.scope_1_tco2e}`}
            >
              {s1.scope_1_tco2e > 200 ? `S1: ${s1.scope_1_tco2e}` : ''}
            </div>
            <div
              className="h-full bg-amber-400 flex items-center justify-center text-[9px] text-white font-body"
              style={{ width: `${(s1.scope_2_tco2e / totalScope) * 100}%` }}
              title={`Scope 2: ${s1.scope_2_tco2e}`}
            >
              {s1.scope_2_tco2e > 80 ? `S2: ${s1.scope_2_tco2e}` : ''}
            </div>
            <div
              className="h-full bg-emerald-400 flex items-center justify-center text-[9px] text-white font-body"
              style={{ width: `${(s1.scope_3_tco2e / totalScope) * 100}%` }}
              title={`Scope 3: ${s1.scope_3_tco2e}`}
            >
              {s1.scope_3_tco2e > 500 ? `S3: ${s1.scope_3_tco2e}` : ''}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-1.5 text-[10px] font-body">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Scope 1: {s1.scope_1_tco2e}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Scope 2: {s1.scope_2_tco2e}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Scope 3: {s1.scope_3_tco2e}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <KPICard label="Intensité carbone" value={s1.intensite_carbone} unit="tCO2e/€M" trend="down" color="text-amber-700" />
          <KPICard label="Énergies renouvelables" value={`${s1.part_energies_renouvelables}%`} trend="up" color="text-emerald-700" />
          <KPICard label="Consommation eau" value={s1.eau_m3.toLocaleString()} unit="m³" />
          <KPICard label="Déchets" value={s1.dechets_t} unit="t" trend="down" />
          <KPICard label="Sites protégés" value={s1.biodiversite_sites_proteges} unit="sites" />
          <KPICard label="Adaptation climat" value={s1.adaptation_climat_score} unit="/5" trend="up" />
          <KPICard label="Scénario 2°C" value={s1.analyse_scenario_2c ? 'Oui' : 'Non'} color={s1.analyse_scenario_2c ? 'text-emerald-600' : 'text-red-600'} />
          <KPICard label="Conformité TCFD" value={s1.conformite_tcfd} color={s1.conformite_tcfd === 'totale' ? 'text-emerald-600' : s1.conformite_tcfd === 'partielle' ? 'text-amber-600' : 'text-red-600'} />
        </div>
      </div>

      {/* ISSB S2 — Social */}
      <div className="bg-background-50 rounded-xl border border-background-200/70 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700">
            <i className="ri-team-line text-sm"></i>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground-950 font-heading">ISSB S2 — Indicateurs Sociaux</h3>
            <p className="text-[10px] text-foreground-500 font-body">Diversité · Formation · Sécurité · Satisfaction</p>
          </div>
        </div>

        {/* Diversity bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-foreground-600 font-body">Diversité Genre — Conseil vs Management</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-foreground-500 font-body">Conseil</span>
                <span className="font-bold text-foreground-800 font-body">{s2.diversite_conseil_pct}%</span>
              </div>
              <div className="h-3 bg-background-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-400 rounded-full" style={{ width: `${s2.diversite_conseil_pct}%` }}></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-foreground-500 font-body">Management</span>
                <span className="font-bold text-foreground-800 font-body">{s2.diversite_management_pct}%</span>
              </div>
              <div className="h-3 bg-background-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent-400 rounded-full" style={{ width: `${s2.diversite_management_pct}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <KPICard label="Écart rémunération H/F" value={`${(s2.ecart_remuneration_h_f * 100).toFixed(0)}%`} trend="up" color="text-emerald-700" />
          <KPICard label="Taux de rotation" value={`${s2.taux_rotation}%`} trend="down" color="text-emerald-700" />
          <KPICard label="Formation / employé" value={s2.heures_formation_par_employe} unit="h" trend="up" />
          <KPICard label="Accidents travail" value={`${s2.accidents_travail_taux}%`} trend="down" color="text-emerald-700" />
          <KPICard label="Satisfaction NPS" value={s2.satisfaction_employe_nps} unit="/100" trend="up" />
          <KPICard label="Droits humains audit" value={s2.droits_humains_audit ? 'Conforme' : 'Non'} color={s2.droits_humains_audit ? 'text-emerald-600' : 'text-red-600'} />
          <KPICard label="Cyber incidents" value={s2.cybersecurite_incidents_nombre} color={s2.cybersecurite_incidents_nombre === 0 ? 'text-emerald-600' : 'text-red-600'} />
          <KPICard label="Protection données" value={s2.protection_donnees_conformite} color={s2.protection_donnees_conformite === 'conforme' ? 'text-emerald-600' : 'text-red-600'} />
        </div>

        <div className="mt-3 p-2.5 rounded-lg bg-accent-50 border border-accent-200/70 flex items-center gap-2">
          <i className="ri-hand-heart-line text-accent-600 text-sm"></i>
          <span className="text-xs text-accent-800 font-body">
            <strong>Investissement communautés locales :</strong> {s2.communautes_locales_investissement_fcfa.toLocaleString()} FCFA
          </span>
        </div>
      </div>
    </div>
  );
}



