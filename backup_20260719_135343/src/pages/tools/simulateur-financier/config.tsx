import type { DiagnosticToolConfig } from '';
import { SIM_FIN_AXES, getSimFinScoreColor, getSimFinScoreLabel, getSimFinLevel, getSimFinReadiness, getSimFinRisks, getSimFinRecommendations } from '';
const FORM_URL='https://readdy.ai/api/form/d8pg4ivij7vns5otj9mg'; const PRIMARY='#059669';
export const simFinConfig: DiagnosticToolConfig = {
  toolId:'simulateur-financier',toolNameFr:'Simulateur Financier KHEPRA™',toolNameEn:'Financial Simulator KHEPRA™',
  toolSubtitleFr:'Simulez votre santé financière sur 5 axes : rentabilité, trésorerie, structure, croissance et pilotage.',toolSubtitleEn:'Simulate your financial health across 5 axes: profitability, cash, structure, growth and steering.',
  seoTitleFr:'Simulateur Financier Gratuit | KHEPRA EXPERTS',seoTitleEn:'Free Financial Simulator | KHEPRA EXPERTS',
  seoDescriptionFr:'Simulez votre santé financière : rentabilité, trésorerie, structure financière, croissance, pilotage. Rapport avec diagnostic et recommandations.',seoDescriptionEn:'Simulate your financial health: profitability, cash, financial structure, growth, steering. Report with diagnosis and recommendations.',
  seoKeywordsFr:'simulateur financier, diagnostic financier, trésorerie, rentabilité, analyse financière, Afrique',seoKeywordsEn:'financial simulator, financial diagnosis, cash flow, profitability, financial analysis, Africa',
  canonicalPath:'/tools/simulateur-financier',axes:SIM_FIN_AXES,
  howToNameFr:'Simulateur Financier KHEPRA™',howToNameEn:'Financial Simulator KHEPRA™',
  howToDescriptionFr:'Simulez votre santé financière sur 5 axes : rentabilité, trésorerie et liquidité, structure financière, croissance et investissement, pilotage financier.',howToDescriptionEn:'Simulate your financial health across 5 axes: profitability, cash & liquidity, financial structure, growth & investment, financial steering.',
  howToTotalTime:'7M',howToSteps:SIM_FIN_AXES.map(a=>({name:a.titleFr,text:a.descriptionFr})),
  getScoreColor:getSimFinScoreColor,getScoreLabel:getSimFinScoreLabel,getMaturityLevel:getSimFinLevel,getReadinessIndicator:getSimFinReadiness,
  getRisks:(pa,gs,l)=>getSimFinRisks(pa,gs,l),getRecommendations:(pa,gs,l)=>getSimFinRecommendations(pa,gs,l),
  getOptionStyle:(v,s)=>{if(v===100)return s?'border-emerald-500 bg-emerald-50':'border-secondary-200 hover:border-emerald-300';if(v===60)return s?'border-sky-500 bg-sky-50':'border-secondary-200 hover:border-sky-300';if(v===25)return s?'border-accent-500 bg-accent-50':'border-secondary-200 hover:border-accent-300';return s?'border-red-500 bg-red-50':'border-secondary-200 hover:border-red-300';},
  getOptionIcon:(v)=>{if(v===100)return'ri-check-double-line';if(v===60)return'ri-check-line';if(v===25)return'ri-subtract-line';return'ri-close-line';},
  getOptionColor:(v)=>{if(v===100)return'text-emerald-600';if(v===60)return'text-sky-600';if(v===25)return'text-accent-600';return'text-red-600';},
  showLeadForm:true,formUrl:FORM_URL,hashtags:['Finance','Simulation','Tresorerie','Diagnostic'],
  showRadarChart:true,renderRadarChart:(s,pa,ax,fr)=>{const c=s/2,rad=100,ac=ax.length,as=(2*Math.PI)/ac,sa=-Math.PI/2,gp=(i:number,v:number)=>{const a=sa+i*as,r=(v/100)*rad;return{x:c+r*Math.cos(a),y:c+r*Math.sin(a)};};return(<svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="mx-auto">{[20,40,60,80,100].map(lv=>{const ps=ax.map((_,i)=>{const p=gp(i,lv);return`${p.x},${p.y}`}).join(' ');return<polygon key={lv} points={ps} fill="none" stroke="#e5e7eb" strokeWidth="1"/>})}{ax.map((_,i)=>{const e=gp(i,100);return<line key={i} x1={c} y1={c} x2={e.x} y2={e.y} stroke="#e5e7eb" strokeWidth="1"/>})}{(()=>{const dp=ax.map((a,i)=>gp(i,pa[a.id]??0)),ps=dp.map(p=>`${p.x},${p.y}`).join(' ');return(<><polygon points={ps} fill="rgba(5,150,105,0.15)" stroke={PRIMARY} strokeWidth="2"/>{dp.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="5" fill={PRIMARY} stroke="white" strokeWidth="2"/>)}</>)})()}{ax.map((a,i)=>{const lp=gp(i,125),w=(fr?a.titleFr:a.titleEn).split(' '),lb=w.length>2?w.slice(0,2).join(' '):w.join(' ');return<text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{lb}</text>})}</svg>)},
  badgeIcon:'ri-money-dollar-circle-line',badgeTextFr:'5 axes · 7 questions · 7 min',badgeTextEn:'5 axes · 7 questions · 7 min',
  expertCTA:{titleFr:'Besoin d\'une analyse financière approfondie ?',titleEn:'Need an in-depth financial analysis?',descriptionFr:'Nos experts financiers vous accompagnent dans le diagnostic et la restructuration de votre situation financière.',descriptionEn:'Our financial experts support you in diagnosing and restructuring your financial situation.',ctaFr:'Planifier un rendez-vous',ctaEn:'Schedule a meeting',ctaLink:'/contact'},
};



