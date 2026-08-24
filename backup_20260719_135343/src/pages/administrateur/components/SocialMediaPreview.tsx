import { useRef, useCallback, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import {
  TEMPLATE_CONTENT,
  TEMPLATE_IMAGES,
  APPROACH_STEPS,
  TEMPLATES,
  SOCIAL_PHONE,
  SOCIAL_EMAIL,
  SOCIAL_WEBSITE,
  SOCIAL_ADDRESS,
} from '@/mocks/socialMediaTemplates';

export type SocialFormat = 'linkedin' | 'story' | 'twitter' | 'square';

export interface SocialFormatConfig {
  id: SocialFormat;
  label: string;
  width: number;
  height: number;
  aspect: string;
}

export const FORMATS: SocialFormatConfig[] = [
  { id: 'linkedin', label: 'LinkedIn / Facebook', width: 1200, height: 630, aspect: '1200×630' },
  { id: 'story', label: 'Story Instagram', width: 1080, height: 1920, aspect: '1080×1920' },
  { id: 'twitter', label: 'Twitter / X', width: 1200, height: 675, aspect: '1200×675' },
  { id: 'square', label: 'Carré Instagram', width: 1080, height: 1080, aspect: '1080×1080' },
];

interface SocialMediaPreviewProps {
  templateId: string;
  format: SocialFormat;
  generating: boolean;
  onGenerate: (dataUrl: string, format: SocialFormat) => void;
}

function getContent(templateId: string) {
  return TEMPLATE_CONTENT[templateId] || TEMPLATE_CONTENT['conformite-sfd-emf'];
}

function getColors(category: string) {
  const allColors: Record<string, { bg: string; text: string; accent: string }> = {
    conformite: { bg: 'from-amber-900 to-slate-900', text: 'text-amber-400', accent: 'bg-amber-500' },
    gouvernance: { bg: 'from-teal-900 to-slate-900', text: 'text-teal-400', accent: 'bg-teal-500' },
    finance: { bg: 'from-emerald-900 to-slate-900', text: 'text-emerald-400', accent: 'bg-emerald-500' },
    strategie: { bg: 'from-indigo-900 to-slate-900', text: 'text-indigo-400', accent: 'bg-indigo-500' },
    digital: { bg: 'from-cyan-900 to-slate-900', text: 'text-cyan-400', accent: 'bg-cyan-500' },
    risques: { bg: 'from-rose-900 to-slate-900', text: 'text-rose-400', accent: 'bg-rose-500' },
    audit: { bg: 'from-orange-900 to-slate-900', text: 'text-orange-400', accent: 'bg-orange-500' },
    formation: { bg: 'from-violet-900 to-slate-900', text: 'text-violet-400', accent: 'bg-violet-500' },
    communication: { bg: 'from-pink-900 to-slate-900', text: 'text-pink-400', accent: 'bg-pink-500' },
    rh: { bg: 'from-sky-900 to-slate-900', text: 'text-sky-400', accent: 'bg-sky-500' },
    diagnostic: { bg: 'from-yellow-900 to-slate-900', text: 'text-yellow-400', accent: 'bg-yellow-500' },
    etude: { bg: 'from-lime-900 to-slate-900', text: 'text-lime-400', accent: 'bg-lime-500' },
    esg: { bg: 'from-green-900 to-slate-900', text: 'text-green-400', accent: 'bg-green-500' },
    premium_audit: { bg: 'from-black to-emerald-950', text: 'text-amber-400', accent: 'bg-amber-500' },
    premium_digital: { bg: 'from-black to-emerald-950', text: 'text-amber-400', accent: 'bg-amber-500' },
    premium_rh: { bg: 'from-black to-emerald-950', text: 'text-amber-400', accent: 'bg-amber-500' },
  };
  return allColors[category] || allColors['conformite'];
}

function isPremiumTemplate(templateId: string) {
  return templateId.startsWith('premium-');
}

function getTemplateImage(templateId: string, format: SocialFormat) {
  return TEMPLATE_IMAGES[templateId]?.[format] || '';
}

/* ═══════════════════════════════════════════════
   PREMIUM BANNERS — Big Four / High-End Aesthetic
   ═══════════════════════════════════════════════ */

/* ---------- LinkedIn / Facebook (1200×630) — Premium ---------- */
function PremiumLinkedInPreview({ content, imageUrl }: { content: ReturnType<typeof getContent>; imageUrl: string }) {
  return (
    <div className="w-[1200px] h-[630px] bg-black relative overflow-hidden select-none">
      {/* Background image */}
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        crossOrigin="anonymous"
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Top accent bar — golden */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 pointer-events-none" />

      {/* Left side: Logo + glass card text */}
      <div className="absolute top-8 left-10 z-10 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
          <i className="ri-bug-line text-2xl text-white" />
        </div>
        <div>
          <p className="text-white text-lg font-bold leading-tight tracking-wide">KHEPRA</p>
          <p className="text-amber-400 text-xs font-semibold tracking-[0.2em]">EXPERTS</p>
        </div>
      </div>

      {/* Right side: Glassmorphism card */}
      <div className="absolute top-20 right-10 bottom-24 w-[480px] z-10">
        <div className="w-full h-full bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 p-8 flex flex-col justify-between shadow-2xl">
          {/* Badge */}
          <div className="inline-flex self-start items-center gap-2 px-4 py-1.5 bg-amber-500/15 border border-amber-400/30 rounded-full">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">{content.badge.split('\n')[0]}</span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight">
              {content.title}
            </h1>
            <p className="text-amber-400 text-xl font-medium mt-3 tracking-wide">
              {content.subtitle}
            </p>
          </div>

          {/* Key points */}
          <div className="space-y-3">
            {content.domains.slice(0, 3).map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-500/15 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-400/20">
                  <i className={`${d.icon} text-sm text-amber-400`} />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">{d.title}</p>
                  <p className="text-white/50 text-xs leading-tight mt-0.5">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="self-start mt-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow">
            PRENEZ RENDEZ-VOUS
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-black/90 to-black/70 flex items-center px-10 z-10">
        <div className="flex items-center gap-6 text-white/40 text-xs">
          <span className="flex items-center gap-1.5"><i className="ri-phone-line text-amber-400/60" /> {SOCIAL_PHONE}</span>
          <span className="flex items-center gap-1.5"><i className="ri-mail-line text-amber-400/60" /> {SOCIAL_EMAIL}</span>
          <span className="flex items-center gap-1.5"><i className="ri-global-line text-amber-400/60" /> {SOCIAL_WEBSITE}</span>
        </div>
        <div className="ml-auto text-white/30 text-xs flex items-center gap-1.5">
          <i className="ri-map-pin-line" /> {SOCIAL_ADDRESS}
        </div>
      </div>

      {/* Decorative golden lines */}
      <div className="absolute top-1/2 left-0 w-[400px] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-32 left-0 w-[300px] h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent pointer-events-none" />
    </div>
  );
}

/* ---------- Instagram Story (1080×1920) — Premium ---------- */
function PremiumStoryPreview({ content, imageUrl }: { content: ReturnType<typeof getContent>; imageUrl: string }) {
  return (
    <div className="w-[1080px] h-[1920px] bg-black relative overflow-hidden select-none">
      <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 pointer-events-none" />

      {/* Top: Logo */}
      <div className="absolute top-12 left-12 right-12 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <i className="ri-bug-line text-2xl text-white" />
          </div>
          <div>
            <p className="text-white text-xl font-bold leading-tight">KHEPRA</p>
            <p className="text-amber-400 text-xs font-semibold tracking-[0.2em]">EXPERTS</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-amber-500/15 border border-amber-400/30 rounded-full">
          <span className="text-amber-400 text-xs font-semibold">{content.badge.split('\n')[0]}</span>
        </div>
      </div>

      {/* Center: Glass card */}
      <div className="absolute top-48 left-12 right-12 z-10">
        <div className="bg-white/8 backdrop-blur-xl rounded-3xl border border-white/15 p-10 shadow-2xl">
          <h1 className="text-7xl font-extrabold text-white leading-tight tracking-tight">
            {content.title}
          </h1>
          <p className="text-amber-400 text-3xl font-medium mt-6 tracking-wide">
            {content.subtitle}
          </p>

          <div className="mt-10 space-y-5">
            {content.domains.map((d, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/15 rounded-xl flex items-center justify-center flex-shrink-0 border border-amber-400/20">
                  <i className={`${d.icon} text-lg text-amber-400`} />
                </div>
                <div>
                  <p className="text-white text-lg font-bold leading-tight">{d.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed mt-1">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-10 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl text-lg font-bold tracking-wider flex items-center gap-3 shadow-lg shadow-amber-500/30">
            PRENEZ RENDEZ-VOUS
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>

      {/* Bottom: Contact */}
      <div className="absolute bottom-12 left-12 right-12 z-10 bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 p-6">
        <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
          <span className="flex items-center gap-2"><i className="ri-phone-line text-amber-400/60" /> {SOCIAL_PHONE}</span>
          <span className="flex items-center gap-2"><i className="ri-mail-line text-amber-400/60" /> {SOCIAL_EMAIL}</span>
          <span className="flex items-center gap-2"><i className="ri-global-line text-amber-400/60" /> {SOCIAL_WEBSITE}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Twitter / X (1200×675) — Premium ---------- */
function PremiumTwitterPreview({ content, imageUrl }: { content: ReturnType<typeof getContent>; imageUrl: string }) {
  return (
    <div className="w-[1200px] h-[675px] bg-black relative overflow-hidden select-none">
      <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-6 left-8 z-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
          <i className="ri-bug-line text-xl text-white" />
        </div>
        <div>
          <p className="text-white text-base font-bold leading-tight">KHEPRA</p>
          <p className="text-amber-400 text-[10px] font-semibold tracking-wider">EXPERTS</p>
        </div>
      </div>

      {/* Right glass card */}
      <div className="absolute top-16 right-8 bottom-16 w-[420px] z-10">
        <div className="w-full h-full bg-white/8 backdrop-blur-xl rounded-xl border border-white/15 p-6 flex flex-col justify-between">
          <div className="inline-flex self-start items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-400/30 rounded-full">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            <span className="text-amber-400 text-[10px] font-semibold tracking-wider uppercase">{content.badge.split('\n')[0]}</span>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-white leading-tight">{content.title}</h1>
            <p className="text-amber-400 text-base font-medium mt-2">{content.subtitle}</p>
          </div>

          <div className="space-y-2">
            {content.domains.slice(0, 3).map((d, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-6 h-6 bg-amber-500/15 rounded-md flex items-center justify-center flex-shrink-0 border border-amber-400/20">
                  <i className={`${d.icon} text-[10px] text-amber-400`} />
                </div>
                <div>
                  <p className="text-white text-xs font-bold leading-tight">{d.title}</p>
                  <p className="text-white/50 text-[10px] leading-tight">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="self-start px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs font-bold tracking-wider flex items-center gap-1.5">
            PRENEZ RENDEZ-VOUS <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-r from-black/90 to-black/60 flex items-center px-8 z-10">
        <div className="flex items-center gap-4 text-white/40 text-[10px]">
          <span className="flex items-center gap-1"><i className="ri-phone-line text-amber-400/60" /> {SOCIAL_PHONE}</span>
          <span className="flex items-center gap-1"><i className="ri-mail-line text-amber-400/60" /> {SOCIAL_EMAIL}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Square Instagram (1080×1080) — Premium ---------- */
function PremiumSquarePreview({ content, imageUrl }: { content: ReturnType<typeof getContent>; imageUrl: string }) {
  return (
    <div className="w-[1080px] h-[1080px] bg-black relative overflow-hidden select-none">
      <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 pointer-events-none" />

      {/* Top: Logo */}
      <div className="absolute top-8 left-8 right-8 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <i className="ri-bug-line text-2xl text-white" />
          </div>
          <div>
            <p className="text-white text-lg font-bold leading-tight">KHEPRA</p>
            <p className="text-amber-400 text-xs font-semibold tracking-wider">EXPERTS</p>
          </div>
        </div>
        <div className="px-3 py-1.5 bg-amber-500/15 border border-amber-400/30 rounded-full">
          <span className="text-amber-400 text-xs font-semibold">{content.badge.split('\n')[0]}</span>
        </div>
      </div>

      {/* Center: Glass card */}
      <div className="absolute top-28 left-8 right-8 bottom-28 z-10">
        <div className="w-full h-full bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight">{content.title}</h1>
            <p className="text-amber-400 text-xl font-medium mt-3">{content.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {content.domains.slice(0, 4).map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-amber-500/15 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-400/20">
                  <i className={`${d.icon} text-sm text-amber-400`} />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">{d.title}</p>
                  <p className="text-white/50 text-xs leading-tight mt-0.5">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white/40 text-xs">
              <span className="flex items-center gap-1"><i className="ri-phone-line text-amber-400/60" /> {SOCIAL_PHONE}</span>
              <span className="flex items-center gap-1"><i className="ri-mail-line text-amber-400/60" /> {SOCIAL_EMAIL}</span>
            </div>
            <button className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/30">
              RENDEZ-VOUS <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   STANDARD TEMPLATES — Existing components
   ═══════════════════════════════════════════════ */

/* ---------- LinkedIn / Facebook (1200×630) ---------- */
function LinkedInPreview({ content, colors }: { content: ReturnType<typeof getContent>; colors: { bg: string; text: string; accent: string } }) {
  return (
    <div className={`w-[1200px] h-[630px] bg-gradient-to-br ${colors.bg} relative overflow-hidden select-none`}>
      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
      </div>

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-8 left-10 flex items-center gap-3">
        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
          <i className="ri-bug-line text-2xl text-white" />
        </div>
        <div>
          <p className="text-white text-lg font-bold leading-tight">KHEPRA</p>
          <p className="text-amber-400 text-xs font-medium tracking-wider">EXPERTS</p>
        </div>
        <div className="ml-4 text-white/50 text-xs uppercase tracking-wider">Conseil Stratégique & Transformation</div>
      </div>

      {/* Badge top-right */}
      <div className="absolute top-8 right-10">
        <div className="bg-amber-500/20 border-2 border-amber-400 rounded-xl px-4 py-2">
          <p className="text-amber-400 text-xs font-bold text-center whitespace-pre-line leading-tight">{content.badge}</p>
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-28 left-10 right-10">
        <h1 className={`text-5xl font-bold text-white leading-tight ${colors.text}`}>{content.title}</h1>
        <p className="text-amber-400 text-2xl font-semibold mt-2">{content.subtitle}</p>
      </div>

      {/* Domains */}
      <div className="absolute top-56 left-10 right-[340px]">
        <p className="text-white/70 text-xs uppercase tracking-wider mb-3 font-medium">Nos domaines d&apos;intervention</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {content.domains.slice(0, 4).map((d, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className={`${d.icon} text-sm text-amber-400`} />
              </div>
              <div>
                <p className="text-white text-xs font-bold leading-tight">{d.title}</p>
                <p className="text-white/60 text-[10px] leading-tight mt-0.5">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why us */}
      <div className="absolute top-[360px] left-10 right-[340px]">
        <p className="text-white/70 text-xs uppercase tracking-wider mb-2 font-medium">Pourquoi KHEPRA EXPERTS ?</p>
        <div className="space-y-1.5">
          {content.whyUs.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-check-line text-[10px] text-white" />
              </div>
              <p className="text-white/80 text-xs">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — 5 steps */}
      <div className="absolute top-28 bottom-28 right-10 w-[300px] bg-white/10 rounded-xl border border-white/20 p-5">
        <p className="text-white/70 text-xs uppercase tracking-wider mb-3 font-medium">Notre approche en 5 étapes</p>
        <div className="space-y-3">
          {APPROACH_STEPS.map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                {step.num}
              </div>
              <div>
                <p className="text-white text-xs font-bold">{step.title}</p>
                <p className="text-white/60 text-[10px]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/90 to-slate-800/90 h-20 flex items-center px-10">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <i className="ri-phone-line text-white text-lg" />
          </div>
          <div>
            <p className="text-white text-sm font-bold">{content.cta}</p>
            <p className="text-white/50 text-xs">Réponse sous 24h · Gratuit et confidentiel</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/60 text-xs">
          <span className="flex items-center gap-1"><i className="ri-phone-line" /> {SOCIAL_PHONE}</span>
          <span className="flex items-center gap-1"><i className="ri-mail-line" /> {SOCIAL_EMAIL}</span>
          <span className="flex items-center gap-1"><i className="ri-global-line" /> {SOCIAL_WEBSITE}</span>
        </div>
        <div className="ml-6 bg-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
          PRENEZ RENDEZ-VOUS <i className="ri-arrow-right-line" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Instagram Story (1080×1920) ---------- */
function StoryPreview({ content, colors }: { content: ReturnType<typeof getContent>; colors: { bg: string; text: string; accent: string } }) {
  return (
    <div className={`w-[1080px] h-[1920px] bg-gradient-to-br ${colors.bg} relative overflow-hidden select-none`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 pointer-events-none" />

      {/* Top bar */}
      <div className="absolute top-12 left-12 right-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center">
            <i className="ri-bug-line text-2xl text-white" />
          </div>
          <div>
            <p className="text-white text-xl font-bold leading-tight">KHEPRA EXPERTS</p>
            <p className="text-amber-400 text-xs font-medium tracking-wider">Conseil Stratégique</p>
          </div>
        </div>
        <div className="bg-amber-500/20 border-2 border-amber-400 rounded-xl px-4 py-2">
          <p className="text-amber-400 text-xs font-bold text-center whitespace-pre-line leading-tight">{content.badge}</p>
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-44 left-12 right-12">
        <h1 className={`text-7xl font-bold text-white leading-tight ${colors.text}`}>{content.title}</h1>
        <p className="text-amber-400 text-3xl font-semibold mt-4">{content.subtitle}</p>
      </div>

      {/* Domains */}
      <div className="absolute top-[520px] left-12 right-12">
        <p className="text-white/70 text-sm uppercase tracking-wider mb-4 font-medium">Nos domaines d&apos;intervention</p>
        <div className="space-y-4">
          {content.domains.map((d, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className={`${d.icon} text-base text-amber-400`} />
              </div>
              <div>
                <p className="text-white text-base font-bold leading-tight">{d.title}</p>
                <p className="text-white/60 text-sm leading-tight mt-1">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why us */}
      <div className="absolute top-[1160px] left-12 right-12">
        <p className="text-white/70 text-sm uppercase tracking-wider mb-4 font-medium">Pourquoi KHEPRA EXPERTS ?</p>
        <div className="space-y-3">
          {content.whyUs.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-check-line text-sm text-white" />
              </div>
              <p className="text-white/80 text-base">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Approach */}
      <div className="absolute top-[1440px] left-12 right-12 bg-white/10 rounded-xl border border-white/20 p-6">
        <p className="text-white/70 text-sm uppercase tracking-wider mb-3 font-medium">Notre approche en 5 étapes</p>
        <div className="grid grid-cols-5 gap-2">
          {APPROACH_STEPS.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white text-base font-bold mx-auto mb-2">
                {step.num}
              </div>
              <p className="text-white text-xs font-bold">{step.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-12 left-12 right-12 bg-gradient-to-r from-slate-900/90 to-slate-800/90 rounded-2xl p-8">
        <p className="text-white text-xl font-bold mb-2">{content.cta}</p>
        <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm mt-3">
          <span className="flex items-center gap-1"><i className="ri-phone-line" /> {SOCIAL_PHONE}</span>
          <span className="flex items-center gap-1"><i className="ri-mail-line" /> {SOCIAL_EMAIL}</span>
          <span className="flex items-center gap-1"><i className="ri-global-line" /> {SOCIAL_WEBSITE}</span>
          <span className="flex items-center gap-1"><i className="ri-map-pin-line" /> {SOCIAL_ADDRESS}</span>
        </div>
        <div className="mt-4 bg-amber-500 text-white px-6 py-3 rounded-xl text-base font-bold inline-flex items-center gap-2">
          PRENEZ RENDEZ-VOUS <i className="ri-arrow-right-line" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Twitter / X (1200×675) ---------- */
function TwitterPreview({ content, colors }: { content: ReturnType<typeof getContent>; colors: { bg: string; text: string; accent: string } }) {
  return (
    <div className={`w-[1200px] h-[675px] bg-gradient-to-br ${colors.bg} relative overflow-hidden select-none`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-6 left-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
          <i className="ri-bug-line text-xl text-white" />
        </div>
        <div>
          <p className="text-white text-base font-bold leading-tight">KHEPRA</p>
          <p className="text-amber-400 text-[10px] font-medium tracking-wider">EXPERTS</p>
        </div>
      </div>
      <div className="absolute top-6 right-8">
        <div className="bg-amber-500/20 border border-amber-400 rounded-lg px-3 py-1.5">
          <p className="text-amber-400 text-[10px] font-bold text-center whitespace-pre-line leading-tight">{content.badge}</p>
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-20 left-8 right-8">
        <h1 className={`text-4xl font-bold text-white leading-tight ${colors.text}`}>{content.title}</h1>
        <p className="text-amber-400 text-xl font-semibold mt-1">{content.subtitle}</p>
      </div>

      {/* Domains */}
      <div className="absolute top-44 left-8 right-8">
        <div className="grid grid-cols-3 gap-3">
          {content.domains.slice(0, 3).map((d, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-7 h-7 bg-white/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className={`${d.icon} text-xs text-amber-400`} />
              </div>
              <div>
                <p className="text-white text-xs font-bold leading-tight">{d.title}</p>
                <p className="text-white/60 text-[10px] leading-tight mt-0.5 line-clamp-2">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why us + Approach side by side */}
      <div className="absolute top-[290px] left-8 right-8 flex gap-6">
        <div className="flex-1">
          <p className="text-white/70 text-[10px] uppercase tracking-wider mb-2 font-medium">Pourquoi KHEPRA ?</p>
          <div className="space-y-1">
            {content.whyUs.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-check-line text-[8px] text-white" />
                </div>
                <p className="text-white/80 text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white/10 rounded-lg border border-white/20 p-3">
          <p className="text-white/70 text-[10px] uppercase tracking-wider mb-2 font-medium">Notre approche</p>
          <div className="flex gap-2">
            {APPROACH_STEPS.slice(0, 4).map((step, i) => (
              <div key={i} className="text-center flex-1">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold mx-auto mb-1">
                  {step.num}
                </div>
                <p className="text-white text-[9px] font-bold leading-tight">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/90 to-slate-800/90 h-16 flex items-center px-8">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <i className="ri-phone-line text-white text-sm" />
          </div>
          <div>
            <p className="text-white text-xs font-bold">{content.cta}</p>
            <p className="text-white/50 text-[10px]">Réponse sous 24h</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/60 text-[10px]">
          <span className="flex items-center gap-1"><i className="ri-phone-line" /> {SOCIAL_PHONE}</span>
          <span className="flex items-center gap-1"><i className="ri-mail-line" /> {SOCIAL_EMAIL}</span>
        </div>
        <div className="ml-4 bg-amber-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
          RENDEZ-VOUS <i className="ri-arrow-right-line" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Square (1080×1080) ---------- */
function SquarePreview({ content, colors }: { content: ReturnType<typeof getContent>; colors: { bg: string; text: string; accent: string } }) {
  return (
    <div className={`w-[1080px] h-[1080px] bg-gradient-to-br ${colors.bg} relative overflow-hidden select-none`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
            <i className="ri-bug-line text-2xl text-white" />
          </div>
          <div>
            <p className="text-white text-lg font-bold leading-tight">KHEPRA</p>
            <p className="text-amber-400 text-xs font-medium tracking-wider">EXPERTS</p>
          </div>
        </div>
        <div className="bg-amber-500/20 border-2 border-amber-400 rounded-xl px-4 py-2">
          <p className="text-amber-400 text-xs font-bold text-center whitespace-pre-line leading-tight">{content.badge}</p>
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-28 left-8 right-8">
        <h1 className={`text-5xl font-bold text-white leading-tight ${colors.text}`}>{content.title}</h1>
        <p className="text-amber-400 text-2xl font-semibold mt-2">{content.subtitle}</p>
      </div>

      {/* Domains */}
      <div className="absolute top-[270px] left-8 right-8">
        <p className="text-white/70 text-xs uppercase tracking-wider mb-3 font-medium">Nos domaines d&apos;intervention</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {content.domains.slice(0, 4).map((d, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className={`${d.icon} text-sm text-amber-400`} />
              </div>
              <div>
                <p className="text-white text-sm font-bold leading-tight">{d.title}</p>
                <p className="text-white/60 text-xs leading-tight mt-0.5">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why us */}
      <div className="absolute top-[540px] left-8 right-8">
        <p className="text-white/70 text-xs uppercase tracking-wider mb-2 font-medium">Pourquoi KHEPRA EXPERTS ?</p>
        <div className="space-y-2">
          {content.whyUs.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-check-line text-xs text-white" />
              </div>
              <p className="text-white/80 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Approach */}
      <div className="absolute top-[750px] left-8 right-8 bg-white/10 rounded-xl border border-white/20 p-5">
        <p className="text-white/70 text-xs uppercase tracking-wider mb-3 font-medium">Notre approche en 5 étapes</p>
        <div className="flex gap-2">
          {APPROACH_STEPS.map((step, i) => (
            <div key={i} className="text-center flex-1">
              <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-1">
                {step.num}
              </div>
              <p className="text-white text-xs font-bold">{step.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-8 left-8 right-8 bg-gradient-to-r from-slate-900/90 to-slate-800/90 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <i className="ri-phone-line text-white text-lg" />
          </div>
          <div>
            <p className="text-white text-base font-bold">{content.cta}</p>
            <p className="text-white/50 text-xs">Réponse sous 24h · Gratuit et confidentiel</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-white/60 text-xs">
          <span className="flex items-center gap-1"><i className="ri-phone-line" /> {SOCIAL_PHONE}</span>
          <span className="flex items-center gap-1"><i className="ri-mail-line" /> {SOCIAL_EMAIL}</span>
          <span className="flex items-center gap-1"><i className="ri-global-line" /> {SOCIAL_WEBSITE}</span>
          <span className="flex items-center gap-1"><i className="ri-map-pin-line" /> {SOCIAL_ADDRESS}</span>
        </div>
      </div>
    </div>
  );
}

export default function SocialMediaPreview({ templateId, format, generating, onGenerate }: SocialMediaPreviewProps) {
  const offscreenRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const content = getContent(templateId);
  const templateInfo = TEMPLATES.find(t => t.id === templateId)!;
  const colors = getColors(templateInfo.category);
  const premium = isPremiumTemplate(templateId);
  const imageUrl = getTemplateImage(templateId, format);

  const handleGenerate = useCallback(async () => {
    const target = offscreenRef.current;
    if (!target) return;
    try {
      // Attendre que toutes les polices (y compris les icônes Remix) soient chargées
      await document.fonts.ready;
      // Pour les premiums, attendre le chargement de l'image
      if (premium && imageUrl) {
        await new Promise<void>((resolve) => {
          if (imageLoaded) {
            resolve();
          } else {
            const checkInterval = setInterval(() => {
              if (imageLoaded) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 100);
            // Timeout de sécurité 5s
            setTimeout(() => {
              clearInterval(checkInterval);
              resolve();
            }, 5000);
          }
        });
      }
      // Laisser un peu de temps pour que le navigateur rende les éléments offscreen
      await new Promise(resolve => setTimeout(resolve, 400));

      const dataUrl = await toPng(target, {
        quality: 0.95,
        pixelRatio: 1,
        cacheBust: true,
        skipFonts: true,
      });
      onGenerate(dataUrl, format);
    } catch (err) {
      console.error('Erreur génération image:', err);
    }
  }, [format, onGenerate, premium, imageUrl, imageLoaded]);

  useEffect(() => {
    if (generating) {
      handleGenerate();
    }
  }, [generating, handleGenerate]);

  // Reset image loaded state when template/format changes
  useEffect(() => {
    setImageLoaded(false);
  }, [templateId, format]);

  const scale = format === 'story' ? 0.22 : format === 'square' ? 0.28 : 0.35;
  const isHorizontal = format === 'linkedin' || format === 'twitter';

  const renderPremiumPreview = () => {
    switch (format) {
      case 'linkedin':
        return <PremiumLinkedInPreview content={content} imageUrl={imageUrl} />;
      case 'story':
        return <PremiumStoryPreview content={content} imageUrl={imageUrl} />;
      case 'twitter':
        return <PremiumTwitterPreview content={content} imageUrl={imageUrl} />;
      case 'square':
        return <PremiumSquarePreview content={content} imageUrl={imageUrl} />;
    }
  };

  const renderStandardPreview = () => {
    switch (format) {
      case 'linkedin':
        return <LinkedInPreview content={content} colors={colors} />;
      case 'story':
        return <StoryPreview content={content} colors={colors} />;
      case 'twitter':
        return <TwitterPreview content={content} colors={colors} />;
      case 'square':
        return <SquarePreview content={content} colors={colors} />;
    }
  };

  return (
    <div className="relative">
      {/* Hidden image preload for premium templates */}
      {premium && imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="hidden"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          crossOrigin="anonymous"
        />
      )}

      {/* Offscreen full-resolution render target */}
      <div
        ref={offscreenRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -9999,
          width: format === 'story' ? 1080 : format === 'square' ? 1080 : 1200,
          height: format === 'story' ? 1920 : format === 'square' ? 1080 : format === 'twitter' ? 675 : 630,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {premium ? renderPremiumPreview() : renderStandardPreview()}
      </div>

      {/* Visible scaled preview */}
      <div className="overflow-auto rounded-2xl border border-gray-200 bg-gray-50" style={{ maxHeight: '700px' }}>
        <div
          style={{
            width: format === 'story' ? 1080 : format === 'square' ? 1080 : 1200,
            height: format === 'story' ? 1920 : format === 'square' ? 1080 : format === 'twitter' ? 675 : 630,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {premium ? renderPremiumPreview() : renderStandardPreview()}
        </div>
      </div>
    </div>
  );
}



