import type { DiagnosticToolConfig } from '';
import { KPI_QUALITE_AXES, getKpiQualiteScoreColor, getKpiQualiteScoreLabel, getKpiQualiteLevel, getKpiQualiteReadiness, getKpiQualiteRisks, getKpiQualiteRecommendations } from '';
const FORM_URL='https://readdy.ai/api/form/d8pg4ivij7vns5otj9ng'; const PRIMARY='#059669';
export const kpiQualiteConfig: DiagnosticToolConfig = {
  toolId:'tableau-kpi-qualite',toolNameFr:'Tableau KPI Qualité KHEPRA™',toolNameEn:'Quality KPI Dashboard KHEPRA™',
  toolSubtitleFr:'Évaluez votre système de management de la qualité sur 4 axes : satisfaction, processus, conformité et amélioration continue.',toolSubtitleEn:'Assess your quality management system across 4 axes: satisfaction, processes, compliance and continuous improvement.',
  seoTitleFr:'Tableau KPI Qualité | KHEPRA EXPERTS',seoTitleEn:'Quality KPI Dashboard | KHEPRA EXPERTS',
  seoDescriptionFr:'Évaluez votre système qualité : satisfaction client, performance processus, conformité et amélioration continue. Rapport avec plan d\'action qualité.',seoDescriptionEn:'Assess your quality system: customer satisfaction, process performance, compliance and continuous improvement. Report with quality action plan.',
  seoKeywordsFr:'KPI qualité, ISO 9001, satisfaction client, amélioration continue, Lean Six Sigma, Afrique',seoKeywordsEn:'quality KPI, ISO 9001, customer satisfaction, continuous improvement, Lean Six Sigma, Africa',
  canonicalPath:'/tools/tableau-kpi-qualite',axes:KPI_QUALITE_AXES,
  howToNameFr:'Tableau KPI Qualité KHEPRA™',howToNameEn:'Quality KPI Dashboard KHEPRA™',
  howToDescriptionFr:'Évaluez votre système de management de la qualité sur 4 axes : satisfaction client, performance des processus, conformité et audit, amélioration continue.',howToDescriptionEn:'Assess your quality management system across 4 axes: customer satisfaction, process performance, compliance & audit, continuous improvement.',
  howToTotalTime:'6M',howToSteps:KPI_QUALITE_AXES.map(a=>({name:a.titleFr,text:a.descriptionFr})),
  getScoreColor:getKpiQualiteScoreColor,getScoreLabel:getKpiQualiteScoreLabel,getMaturityLevel:getKpiQualiteLevel,getReadinessIndicator:getKpiQualiteReadiness,
  getRisks:(pa,gs,l)=>getKpiQualiteRisks(pa,gs,l),getRecommendations:(pa,gs,l)=>getKpiQualiteRecommendations(pa,gs,l),
  getOptionStyle:(v,s)=>{if(v===100)return s?'border-emerald-500 bg-emerald-50':'border-secondary-200 hover:border-emerald-300';if(v===60)return s?'border-sky-500 bg-sky-50':'border-secondary-200 hover:border-sky-300';if(v===25)return s?'border-accent-500 bg-accent-50':'border-secondary-200 hover:border-accent-300';return s?'border-red-500 bg-red-50':'border-secondary-200 hover:border-red-300';},
  getOptionIcon:(v)=>{if(v===100)return'ri-check-double-line';if(v===60)return'ri-check-line';if(v===25)return'ri-subtract-line';return'ri-close-line';},
  getOptionColor:(v)=>{if(v===100)return'text-emerald-600';if(v===60)return'text-sky-600';if(v===25)return'text-accent-600';return'text-red-600';},
  showLeadForm:true,formUrl:FORM_URL,hashtags:['Qualite','ISO9001','AmeliorationContinue','KPIs'],
  showRadarChart:true,renderRadarChart:(s,pa,ax,fr)=>{const c=s/2,rad=100,ac=ax.length,as=(2*Math.PI)/ac,sa=-Math.PI/2,gp=(i:number,v:number)=>{const a=sa+i*as,r=(v/100)*rad;return{x:c+r*Math.cos(a),y:c+r*Math.sin(a)};};return(<svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="mx-auto">{[20,40,60,80,100].map(lv=>{const ps=ax.map((_,i)=>{const p=gp(i,lv);return`${p.x},${p.y}`}).join(' ');return<polygon key={lv} points={ps} fill="none" stroke="#e5e7eb" strokeWidth="1"/>})}{ax.map((_,i)=>{const e=gp(i,100);return<line key={i} x1={c} y1={c} x2={e.x} y2={e.y} stroke="#e5e7eb" strokeWidth="1"/>})}{(()=>{const dp=ax.map((a,i)=>gp(i,pa[a.id]??0)),ps=dp.map(p=>`${p.x},${p.y}`).join(' ');return(<><polygon points={ps} fill="rgba(5,150,105,0.15)" stroke={PRIMARY} strokeWidth="2"/>{dp.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="5" fill={PRIMARY} stroke="white" strokeWidth="2"/>)}</>)})()}{ax.map((a,i)=>{const lp=gp(i,125),w=(fr?a.titleFr:a.titleEn).split(' '),lb=w.length>2?w.slice(0,2).join(' '):w.join(' ');return<text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{lb}</text>})}</svg>)},
  badgeIcon:'ri-checkbox-multiple-line',badgeTextFr:'4 axes · 5 questions · 6 min',badgeTextEn:'4 axes · 5 questions · 6 min',
  expertCTA:{titleFr:'Besoin de certifier votre système qualité ?',titleEn:'Need to certify your quality system?',descriptionFr:'Nos experts qualité vous accompagnent dans la mise en place et la certification de votre système de management de la qualité.',descriptionEn:'Our quality experts support you in implementing and certifying your quality management system.',ctaFr:'Planifier un rendez-vous',ctaEn:'Schedule a meeting',ctaLink:'/contact'},
};



