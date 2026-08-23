import type { DiagnosticToolConfig } from '';
import { FINTECH_MATURITY_AXES, getFintechMaturityScoreColor, getFintechMaturityScoreLabel, getFintechMaturityLevel, getFintechMaturityReadiness, getFintechMaturityRisks, getFintechMaturityRecommendations } from '';
const FORM_URL='https://readdy.ai/api/form/d8pg2pnij7vns5otj9k0'; const PRIMARY='#7c3aed';
export const fintechConfig: DiagnosticToolConfig = {
  toolId:'evaluation-maturite-fintech',toolNameFr:'Évaluation Maturité FinTech KHEPRA™',toolNameEn:'FinTech Maturity Assessment KHEPRA™',
  toolSubtitleFr:'Évaluez la maturité de votre fintech sur 5 axes : modèle d\'affaires, technologie, régulation, équipe et financement.',toolSubtitleEn:'Assess your fintech maturity across 5 axes: business model, technology, regulation, team and funding.',
  seoTitleFr:'Évaluation Maturité FinTech Gratuite | KHEPRA EXPERTS',seoTitleEn:'Free FinTech Maturity Assessment | KHEPRA EXPERTS',
  seoDescriptionFr:'Évaluez la maturité de votre fintech : business model, stack tech, conformité, équipe, financement. 10 questions, rapport avec recommandations.',seoDescriptionEn:'Assess your fintech maturity: business model, tech stack, compliance, team, funding. 10 questions, report with recommendations.',
  seoKeywordsFr:'maturité fintech, agrément fintech, conformité fintech, levée de fonds, Afrique',seoKeywordsEn:'fintech maturity, fintech license, fintech compliance, fundraising, Africa',
  canonicalPath:'/tools/evaluation-maturite-fintech',axes:FINTECH_MATURITY_AXES,
  howToNameFr:'Évaluation Maturité FinTech KHEPRA™',howToNameEn:'FinTech Maturity Assessment KHEPRA™',
  howToDescriptionFr:'Évaluez la maturité de votre fintech sur 5 axes : modèle d\'affaires, technologie, régulation, équipe et financement.',howToDescriptionEn:'Assess your fintech maturity across 5 axes: business model, technology, regulation, team and funding.',
  howToTotalTime:'7M',howToSteps:FINTECH_MATURITY_AXES.map(a=>({name:a.titleFr,text:a.descriptionFr})),
  getScoreColor:getFintechMaturityScoreColor,getScoreLabel:getFintechMaturityScoreLabel,getMaturityLevel:getFintechMaturityLevel,getReadinessIndicator:getFintechMaturityReadiness,
  getRisks:(pa,gs,l)=>getFintechMaturityRisks(pa,gs,l),getRecommendations:(pa,gs,l)=>getFintechMaturityRecommendations(pa,gs,l),
  getOptionStyle:(v,s)=>{if(v===100)return s?'border-emerald-500 bg-emerald-50':'border-secondary-200 hover:border-emerald-300';if(v===60)return s?'border-sky-500 bg-sky-50':'border-secondary-200 hover:border-sky-300';if(v===25)return s?'border-accent-500 bg-accent-50':'border-secondary-200 hover:border-accent-300';return s?'border-red-500 bg-red-50':'border-secondary-200 hover:border-red-300';},
  getOptionIcon:(v)=>{if(v===100)return'ri-check-double-line';if(v===60)return'ri-check-line';if(v===25)return'ri-subtract-line';return'ri-close-line';},
  getOptionColor:(v)=>{if(v===100)return'text-emerald-600';if(v===60)return'text-sky-600';if(v===25)return'text-accent-600';return'text-red-600';},
  showLeadForm:true,formUrl:FORM_URL,hashtags:['FinTech','Agrement','Innovation','Afrique'],
  showRadarChart:true,renderRadarChart:(s,pa,ax,fr)=>{const c=s/2,rad=100,ac=ax.length,as=(2*Math.PI)/ac,sa=-Math.PI/2,gp=(i:number,v:number)=>{const a=sa+i*as,r=(v/100)*rad;return{x:c+r*Math.cos(a),y:c+r*Math.sin(a)};};return(<svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="mx-auto">{[20,40,60,80,100].map(lv=>{const ps=ax.map((_,i)=>{const p=gp(i,lv);return`${p.x},${p.y}`}).join(' ');return<polygon key={lv} points={ps} fill="none" stroke="#e5e7eb" strokeWidth="1"/>})}{ax.map((_,i)=>{const e=gp(i,100);return<line key={i} x1={c} y1={c} x2={e.x} y2={e.y} stroke="#e5e7eb" strokeWidth="1"/>})}{(()=>{const dp=ax.map((a,i)=>gp(i,pa[a.id]??0)),ps=dp.map(p=>`${p.x},${p.y}`).join(' ');return(<><polygon points={ps} fill="rgba(124,58,237,0.15)" stroke={PRIMARY} strokeWidth="2"/>{dp.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="5" fill={PRIMARY} stroke="white" strokeWidth="2"/>)}</>)})()}{ax.map((a,i)=>{const lp=gp(i,125),w=(fr?a.titleFr:a.titleEn).split(' '),lb=w.length>2?w.slice(0,2).join(' '):w.join(' ');return<text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill="#374151">{lb}</text>})}</svg>)},
  badgeIcon:'ri-smartphone-line',badgeTextFr:'5 axes · 10 questions · 7 min',badgeTextEn:'5 axes · 10 questions · 7 min',
  expertCTA:{titleFr:'Besoin d\'accompagnement pour votre agrément fintech ?',titleEn:'Need support for your fintech license?',descriptionFr:'Nos experts réglementaires vous accompagnent dans l\'obtention de votre agrément et votre mise en conformité.',descriptionEn:'Our regulatory experts support you in obtaining your license and achieving compliance.',ctaFr:'Planifier un rendez-vous',ctaEn:'Schedule a meeting',ctaLink:'/contact'},
};



