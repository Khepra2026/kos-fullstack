import type { DiagnosticToolConfig } from '../components/types';
import { TRANSFO_DIGITALE_AXES, getTransfoDigitaleScoreColor, getTransfoDigitaleScoreLabel, getTransfoDigitaleLevel, getTransfoDigitaleReadiness, getTransfoDigitaleRisks, getTransfoDigitaleRecommendations } from './data';

const FORM_URL = 'https://readdy.ai/api/form/d8pg05fij7vns5otj9ig';
const PRIMARY = '#0ea5e9';

export const transfoDigitaleConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-transformation-digitale', toolNameFr: 'Diagnostic Transformation Digitale KHEPRA™', toolNameEn: 'Digital Transformation Diagnostic KHEPRA™',
  toolSubtitleFr: 'Évaluez votre maturité digitale sur 4 axes : stratégie, infrastructure, digitalisation des processus et culture digitale.', toolSubtitleEn: 'Assess your digital maturity across 4 axes: strategy, infrastructure, process digitization and digital culture.',
  seoTitleFr: 'Diagnostic Transformation Digitale Gratuit | KHEPRA EXPERTS', seoTitleEn: 'Free Digital Transformation Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr: 'Évaluez votre maturité digitale : stratégie, cloud, cybersécurité, processus digitalisés, compétences. 11 questions, rapport avec feuille de route.', seoDescriptionEn: 'Assess your digital maturity: strategy, cloud, cybersecurity, digitized processes, skills. 11 questions, report with roadmap.',
  seoKeywordsFr: 'transformation digitale, maturité digitale, digitalisation, cloud, cybersécurité, Afrique', seoKeywordsEn: 'digital transformation, digital maturity, digitization, cloud, cybersecurity, Africa',
  canonicalPath: '/tools/diagnostic-transformation-digitale', axes: TRANSFO_DIGITALE_AXES,
  howToNameFr: 'Diagnostic Transformation Digitale KHEPRA™', howToNameEn: 'Digital Transformation Diagnostic KHEPRA™',
  howToDescriptionFr: 'Évaluez votre maturité digitale sur 4 axes : stratégie digitale, infrastructure technologique, digitalisation des processus, culture et compétences.', howToDescriptionEn: 'Assess your digital maturity across 4 axes: digital strategy, technology infrastructure, process digitization, culture and skills.',
  howToTotalTime: '7M', howToSteps: TRANSFO_DIGITALE_AXES.map((a)=>({name:a.titleFr,text:a.descriptionFr})),
  getScoreColor: getTransfoDigitaleScoreColor, getScoreLabel: getTransfoDigitaleScoreLabel, getMaturityLevel: getTransfoDigitaleLevel, getReadinessIndicator: getTransfoDigitaleReadiness,
  getRisks: (pa,gs,l)=>getTransfoDigitaleRisks(pa,gs,l), getRecommendations: (pa,gs,l)=>getTransfoDigitaleRecommendations(pa,gs,l),
  getOptionStyle: (v,s)=>{if(v===100)return s?'border-emerald-500 bg-emerald-50':'border-secondary-200 hover:border-emerald-300';if(v===60)return s?'border-sky-500 bg-sky-50':'border-secondary-200 hover:border-sky-300';if(v===25)return s?'border-accent-500 bg-accent-50':'border-secondary-200 hover:border-accent-300';return s?'border-red-500 bg-red-50':'border-secondary-200 hover:border-red-300';},
  getOptionIcon: (v)=>{if(v===100)return'ri-check-double-line';if(v===60)return'ri-check-line';if(v===25)return'ri-subtract-line';return'ri-close-line';},
  getOptionColor: (v)=>{if(v===100)return'text-emerald-600';if(v===60)return'text-sky-600';if(v===25)return'text-accent-600';return'text-red-600';},
  showLeadForm: true, formUrl: FORM_URL, hashtags: ['TransformationDigitale','Digitalisation','Innovation','Afrique'],
  showRadarChart: true,
  renderRadarChart: (size,pa,axes,isFr)=>{const c=size/2;const rad=100;const ac=axes.length;const as=(2*Math.PI)/ac;const sa=-Math.PI/2;const gp=(i:number,s:number)=>{const a=sa+i*as;const r=(s/100)*rad;return{x:c+r*Math.cos(a),y:c+r*Math.sin(a)};};return(<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">{[20,40,60,80,100].map((lv)=>{const pts=axes.map((_,i)=>{const p=gp(i,lv);return`${p.x},${p.y}`;}).join(' ');return<polygon key={lv} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1"/>;})}{axes.map((_,i)=>{const e=gp(i,100);return<line key={i} x1={c} y1={c} x2={e.x} y2={e.y} stroke="#e5e7eb" strokeWidth="1"/>;})}{(()=>{const dp=axes.map((ax,i)=>gp(i,pa[ax.id]??0));const ps=dp.map((p)=>`${p.x},${p.y}`).join(' ');return(<><polygon points={ps} fill="rgba(14,165,233,0.15)" stroke={PRIMARY} strokeWidth="2"/>{dp.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="5" fill={PRIMARY} stroke="white" strokeWidth="2"/>)}</>);})()}{axes.map((ax,i)=>{const lp=gp(i,125);const w=(isFr?ax.titleFr:ax.titleEn).split(' ');const lb=w.length>2?w.slice(0,2).join(' '):w.join(' ');return<text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{lb}</text>;})}</svg>);},
  badgeIcon: 'ri-smartphone-line', badgeTextFr: '4 axes · 11 questions · 7 min', badgeTextEn: '4 axes · 11 questions · 7 min',
  expertCTA: { titleFr: 'Besoin d\'accélérer votre transformation digitale ?', titleEn: 'Need to accelerate your digital transformation?', descriptionFr: 'Nos experts en transformation digitale vous accompagnent de la stratégie à l\'exécution.', descriptionEn: 'Our digital transformation experts support you from strategy to execution.', ctaFr: 'Planifier un rendez-vous', ctaEn: 'Schedule a meeting', ctaLink: '/contact' },
};