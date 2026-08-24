import type { DiagnosticToolConfig } from '';
import { DIAG_ORG_AXES, getDiagOrgScoreColor, getDiagOrgScoreLabel, getDiagOrgLevel, getDiagOrgReadiness, getDiagOrgRisks, getDiagOrgRecommendations } from '';

const FORM_URL = 'https://readdy.ai/api/form/d8pg05fij7vns5otj9i0';
const PRIMARY = '#7c3aed';

export const diagnosticOrgConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-organisationnel', toolNameFr: 'Diagnostic Organisationnel KHEPRA™', toolNameEn: 'Organizational Diagnostic KHEPRA™',
  toolSubtitleFr: 'Évaluez la maturité organisationnelle sur 4 axes : gouvernance, structure RH, processus et culture de performance.', toolSubtitleEn: 'Assess organizational maturity across 4 axes: governance, HR structure, processes and performance culture.',
  seoTitleFr: 'Diagnostic Organisationnel Gratuit | KHEPRA EXPERTS', seoTitleEn: 'Free Organizational Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr: 'Évaluez la maturité de votre organisation : gouvernance, RH, processus et culture. 12 questions, rapport avec recommandations.', seoDescriptionEn: 'Assess your organization\'s maturity: governance, HR, processes and culture. 12 questions, report with recommendations.',
  seoKeywordsFr: 'diagnostic organisationnel, gouvernance, gestion RH, processus qualité, culture entreprise, Afrique', seoKeywordsEn: 'organizational diagnostic, governance, HR management, quality processes, corporate culture, Africa',
  canonicalPath: '/tools/diagnostic-organisationnel', axes: DIAG_ORG_AXES,
  howToNameFr: 'Diagnostic Organisationnel KHEPRA™', howToNameEn: 'Organizational Diagnostic KHEPRA™',
  howToDescriptionFr: 'Évaluez la maturité de votre organisation sur 4 axes : gouvernance, structure RH, processus et qualité, culture et performance.', howToDescriptionEn: 'Assess your organization\'s maturity across 4 axes: governance, HR structure, processes & quality, culture & performance.',
  howToTotalTime: '7M', howToSteps: DIAG_ORG_AXES.map((a)=>({name:a.titleFr,text:a.descriptionFr})),
  getScoreColor: getDiagOrgScoreColor, getScoreLabel: getDiagOrgScoreLabel, getMaturityLevel: getDiagOrgLevel, getReadinessIndicator: getDiagOrgReadiness,
  getRisks: (pa,gs,l)=>getDiagOrgRisks(pa,gs,l), getRecommendations: (pa,gs,l)=>getDiagOrgRecommendations(pa,gs,l),
  getOptionStyle: (v,s)=>{if(v===100)return s?'border-emerald-500 bg-emerald-50':'border-secondary-200 hover:border-emerald-300';if(v===60)return s?'border-sky-500 bg-sky-50':'border-secondary-200 hover:border-sky-300';if(v===25)return s?'border-accent-500 bg-accent-50':'border-secondary-200 hover:border-accent-300';return s?'border-red-500 bg-red-50':'border-secondary-200 hover:border-red-300';},
  getOptionIcon: (v)=>{if(v===100)return'ri-check-double-line';if(v===60)return'ri-check-line';if(v===25)return'ri-subtract-line';return'ri-close-line';},
  getOptionColor: (v)=>{if(v===100)return'text-emerald-600';if(v===60)return'text-sky-600';if(v===25)return'text-accent-600';return'text-red-600';},
  showLeadForm: true, formUrl: FORM_URL, hashtags: ['DiagnosticOrganisationnel','Gouvernance','Processus','Performance'],
  showRadarChart: true,
  renderRadarChart: (size,pa,axes,isFr)=>{const c=size/2;const rad=100;const ac=axes.length;const as=(2*Math.PI)/ac;const sa=-Math.PI/2;const gp=(i:number,s:number)=>{const a=sa+i*as;const r=(s/100)*rad;return{x:c+r*Math.cos(a),y:c+r*Math.sin(a)};};return(<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">{[20,40,60,80,100].map((lv)=>{const pts=axes.map((_,i)=>{const p=gp(i,lv);return`${p.x},${p.y}`;}).join(' ');return<polygon key={lv} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1"/>;})}{axes.map((_,i)=>{const e=gp(i,100);return<line key={i} x1={c} y1={c} x2={e.x} y2={e.y} stroke="#e5e7eb" strokeWidth="1"/>;})}{(()=>{const dp=axes.map((ax,i)=>gp(i,pa[ax.id]??0));const ps=dp.map((p)=>`${p.x},${p.y}`).join(' ');return(<><polygon points={ps} fill="rgba(124,58,237,0.15)" stroke={PRIMARY} strokeWidth="2"/>{dp.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="5" fill={PRIMARY} stroke="white" strokeWidth="2"/>)}</>);})()}{axes.map((ax,i)=>{const lp=gp(i,125);const w=(isFr?ax.titleFr:ax.titleEn).split(' ');const lb=w.length>2?w.slice(0,2).join(' '):w.join(' ');return<text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{lb}</text>;})}</svg>);},
  badgeIcon: 'ri-building-2-line', badgeTextFr: '4 axes · 12 questions · 7 min', badgeTextEn: '4 axes · 12 questions · 7 min',
  expertCTA: { titleFr: 'Besoin d\'un accompagnement en transformation organisationnelle ?', titleEn: 'Need organizational transformation support?', descriptionFr: 'Nos experts vous aident à structurer votre gouvernance, optimiser vos processus et développer votre culture de performance.', descriptionEn: 'Our experts help you structure your governance, optimize your processes and develop your performance culture.', ctaFr: 'Planifier un rendez-vous', ctaEn: 'Schedule a meeting', ctaLink: '/contact' },
};



