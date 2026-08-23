import type { DiagnosticToolConfig } from '';
import { PERF_COM_AXES, getPerfComScoreColor, getPerfComScoreLabel, getPerfComLevel, getPerfComReadiness, getPerfComRisks, getPerfComRecommendations } from '';
const FORM_URL='https://readdy.ai/api/form/d8pg2pnij7vns5otj9lg'; const PRIMARY='#059669';
export const perfComConfig: DiagnosticToolConfig = {
  toolId:'performance-commerciale',toolNameFr:'Performance Commerciale KHEPRA™',toolNameEn:'Sales Performance Assessment KHEPRA™',
  toolSubtitleFr:'Évaluez votre performance commerciale sur 4 axes : acquisition, fidélisation, pilotage et connaissance marché.',toolSubtitleEn:'Assess your sales performance across 4 axes: acquisition, retention, steering and market knowledge.',
  seoTitleFr:'Diagnostic Performance Commerciale | KHEPRA EXPERTS',seoTitleEn:'Sales Performance Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr:'Évaluez votre performance commerciale : acquisition clients, fidélisation, pilotage KPIs, analyse concurrentielle. Rapport avec plan d\'action.',seoDescriptionEn:'Assess your sales performance: customer acquisition, retention, KPI steering, competitive analysis. Report with action plan.',
  seoKeywordsFr:'performance commerciale, acquisition clients, fidélisation, CRM, pilotage commercial, Afrique',seoKeywordsEn:'sales performance, customer acquisition, retention, CRM, sales steering, Africa',
  canonicalPath:'/tools/performance-commerciale',axes:PERF_COM_AXES,
  howToNameFr:'Performance Commerciale KHEPRA™',howToNameEn:'Sales Performance Assessment KHEPRA™',
  howToDescriptionFr:'Évaluez votre performance commerciale sur 4 axes : acquisition clients, fidélisation et expansion, performance commerciale, marché et concurrence.',howToDescriptionEn:'Assess your sales performance across 4 axes: customer acquisition, retention & expansion, sales performance, market & competition.',
  howToTotalTime:'6M',howToSteps:PERF_COM_AXES.map(a=>({name:a.titleFr,text:a.descriptionFr})),
  getScoreColor:getPerfComScoreColor,getScoreLabel:getPerfComScoreLabel,getMaturityLevel:getPerfComLevel,getReadinessIndicator:getPerfComReadiness,
  getRisks:(pa,gs,l)=>getPerfComRisks(pa,gs,l),getRecommendations:(pa,gs,l)=>getPerfComRecommendations(pa,gs,l),
  getOptionStyle:(v,s)=>{if(v===100)return s?'border-emerald-500 bg-emerald-50':'border-secondary-200 hover:border-emerald-300';if(v===60)return s?'border-sky-500 bg-sky-50':'border-secondary-200 hover:border-sky-300';if(v===25)return s?'border-accent-500 bg-accent-50':'border-secondary-200 hover:border-accent-300';return s?'border-red-500 bg-red-50':'border-secondary-200 hover:border-red-300';},
  getOptionIcon:(v)=>{if(v===100)return'ri-check-double-line';if(v===60)return'ri-check-line';if(v===25)return'ri-subtract-line';return'ri-close-line';},
  getOptionColor:(v)=>{if(v===100)return'text-emerald-600';if(v===60)return'text-sky-600';if(v===25)return'text-accent-600';return'text-red-600';},
  showLeadForm:true,formUrl:FORM_URL,hashtags:['PerformanceCommerciale','Vente','CRM','Croissance'],
  showRadarChart:true,renderRadarChart:(s,pa,ax,fr)=>{const c=s/2,rad=100,ac=ax.length,as=(2*Math.PI)/ac,sa=-Math.PI/2,gp=(i:number,v:number)=>{const a=sa+i*as,r=(v/100)*rad;return{x:c+r*Math.cos(a),y:c+r*Math.sin(a)};};return(<svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="mx-auto">{[20,40,60,80,100].map(lv=>{const ps=ax.map((_,i)=>{const p=gp(i,lv);return`${p.x},${p.y}`}).join(' ');return<polygon key={lv} points={ps} fill="none" stroke="#e5e7eb" strokeWidth="1"/>})}{ax.map((_,i)=>{const e=gp(i,100);return<line key={i} x1={c} y1={c} x2={e.x} y2={e.y} stroke="#e5e7eb" strokeWidth="1"/>})}{(()=>{const dp=ax.map((a,i)=>gp(i,pa[a.id]??0)),ps=dp.map(p=>`${p.x},${p.y}`).join(' ');return(<><polygon points={ps} fill="rgba(5,150,105,0.15)" stroke={PRIMARY} strokeWidth="2"/>{dp.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="5" fill={PRIMARY} stroke="white" strokeWidth="2"/>)}</>)})()}{ax.map((a,i)=>{const lp=gp(i,125),w=(fr?a.titleFr:a.titleEn).split(' '),lb=w.length>2?w.slice(0,2).join(' '):w.join(' ');return<text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{lb}</text>})}</svg>)},
  badgeIcon:'ri-line-chart-line',badgeTextFr:'4 axes · 6 questions · 6 min',badgeTextEn:'4 axes · 6 questions · 6 min',
  expertCTA:{titleFr:'Besoin de booster votre performance commerciale ?',titleEn:'Need to boost your sales performance?',descriptionFr:'Nos experts en stratégie commerciale vous aident à structurer votre force de vente et à optimiser votre pipeline.',descriptionEn:'Our sales strategy experts help you structure your sales force and optimize your pipeline.',ctaFr:'Planifier un rendez-vous',ctaEn:'Schedule a meeting',ctaLink:'/contact'},
};



