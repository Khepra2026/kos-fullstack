import { useMemo } from 'react';
import { ArticleVisualBox } from '';
import { ArticleDataTable } from '';
import { ArticleFAQBlock } from '';
import { LeadMagnetCTA } from '';
import { ArticleNewsletterInline } from '';

interface ArticleContentRendererProps {
  paragraphs: string[];
  articleId: string;
  isEn: boolean;
  leadMagnetType?: 'checklist-dd' | 'checklist-governance' | 'checklist-compliance' | 'checklist-fundraising' | 'checklist-esg' | null;
}

// ── Safe string coercion ─────────────────────────────────────────────
function safeStr(val: unknown): string {
  if (typeof val === 'string') return val;
  if (val == null) return '';
  try { return String(val); } catch { return ''; }
}

// ── Heading extraction utility (shared with TOC) ─────────────────────
// Returns the first H2/H3 heading text found in a block, or null
export function extractFirstHeadingFromBlock(block: string): string | null {
  const lines = block.split('\n');
  for (const line of lines) {
    const m = line.trim().match(/^(#{2,3})\s+(.+)/);
    if (m && m[2]) {
      return m[2]
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/<[^>]+>/g, '')
        .trim();
    }
  }
  return null;
}

// ── Canonical section ID for a block at index i ──────────────────────
// This MUST match the id assigned in renderBlock for heading elements.
export function blockHeadingId(blockIndex: number): string {
  return `section-h-${blockIndex}`;
}

// ── FAQ parsing ─────────────────────────────────────────────────────
// Supports 3 formats:
// 1. "FAQ SEO / IA" section with Q:/R: pairs (article 10)
// 2. "## ... FAQ ..." heading with **Q1 : question**\nR : answer (articles 15, 20, 21…)
// 3. Hybrid / fallback
function parseFAQ(paragraphs: string[]): { type: 'faq'; items: { question: string; answer: string }[] } | null {
  try {
    // ── Format 1 : FAQ SEO / IA marker (article 10) ─────────────────
    const faqSeoIndex = paragraphs.findIndex(
      p => safeStr(p).includes('FAQ SEO / IA') || safeStr(p).includes('SEO/IA FAQ')
    );

    if (faqSeoIndex !== -1) {
      const faqLines: string[] = [];
      for (let i = faqSeoIndex; i < paragraphs.length; i++) {
        const p = safeStr(paragraphs[i]);
        if (p.includes('CTA CONVERSION')) break;
        if (p.includes('FAQ') && faqLines.length > 0) break;
        if (p.trim()) faqLines.push(p.trim());
      }

      const raw = faqLines.join('\n');
      const items: { question: string; answer: string }[] = [];

      const qrBlocks = raw.split(/\n(?=Q\s*[:\uff1a])/);
      for (const block of qrBlocks) {
        const qMatch = block.match(/^Q\s*[:\uff1a]\s*([\s\S]*?)(?=\nR\s*[:\uff1a])/);
        const rMatch = block.match(/\nR\s*[:\uff1a]\s*([\s\S]+?)(?=\nQ\s*[:\uff1a]|CTA CONVERSION|$)/);
        if (qMatch && rMatch) {
          const question = qMatch[1].replace(/\n/g, ' ').trim();
          const answer = rMatch[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
          if (question && answer) items.push({ question, answer });
        }
      }

      if (items.length === 0) {
        const qs = [...raw.matchAll(/Q\s*[:\uff1a]\s*([\s\S]*?)(?=\n\s*R\s*[:\uff1a]|CTA|CTA CONVERSION)/gm)].map(m => m[1].replace(/\n/g, ' ').trim());
        const ans = [...raw.matchAll(/R\s*[:\uff1a]\s*([\s\S]*?)(?=\n\s*Q\s*[:\uff1a]|CTA CONVERSION|$)/gm)].map(m => m[1].replace(/\n/g, ' ').trim());
        const max = Math.min(qs.length, ans.length);
        for (let i = 0; i < max; i++) {
          if (qs[i] && ans[i]) items.push({ question: qs[i], answer: ans[i] });
        }
      }

      if (items.length > 0) return { type: 'faq', items };
    }

    // ── Format 2 : ## ... FAQ ... heading + **Q1 : text** / R : text ──
    // Used in articles 15, 20, 21 (FAQ prudentielle)
    const faqHeadingIndex = paragraphs.findIndex(p => {
      const s = safeStr(p);
      return /^#{1,3}\s+[IVXLCDM\d.]*\s*FAQ/i.test(s) || /^#{1,3}\s+.*\bFAQ\b/i.test(s);
    });

    if (faqHeadingIndex !== -1) {
      // Collect blocks from this heading until end or until a new major heading that is NOT FAQ-related
      const faqRaw: string[] = [];
      for (let i = faqHeadingIndex; i < paragraphs.length; i++) {
        const p = safeStr(paragraphs[i]);
        // Stop at next major section heading (non-FAQ ## or ###) after the first block
        if (i > faqHeadingIndex && /^#{1,2}\s+/.test(p) && !/\bFAQ\b/i.test(p)) break;
        if (p.trim()) faqRaw.push(p);
      }

      const combined = faqRaw.join('\n');
      const items: { question: string; answer: string }[] = [];

      // Pattern: **Q1 : question text**\nR : answer  — possibly multi-line
      // Also handles: **Q1 :** question\nR : answer
      const boldQPattern = /\*\*Q\d+\s*[:\uff1a]\s*([^*]+?)\*\*([^\n]*)\n(?:(?!\*\*Q\d+)[\s\S]*?)?R\s*[:\uff1a]\s*([\s\S]*?)(?=\*\*Q\d+|$)/g;
      let bMatch;
      while ((bMatch = boldQPattern.exec(combined)) !== null) {
        const q = (bMatch[1] + ' ' + bMatch[2]).replace(/\s+/g, ' ').trim();
        const a = bMatch[3].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        if (q && a) items.push({ question: q, answer: a });
      }

      // Fallback: plain Q: / R: pattern within the FAQ section
      if (items.length === 0) {
        const plainQs = [...combined.matchAll(/Q(?:\d+)?\s*[:\uff1a]\s*([^\n]+)/g)].map(m => m[1].trim());
        const plainAs = [...combined.matchAll(/R\s*[:\uff1a]\s*([\s\S]*?)(?=Q(?:\d+)?\s*[:\uff1a]|$)/g)].map(m => m[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
        const max = Math.min(plainQs.length, plainAs.length);
        for (let i = 0; i < max; i++) {
          if (plainQs[i] && plainAs[i]) items.push({ question: plainQs[i], answer: plainAs[i] });
        }
      }

      if (items.length > 0) return { type: 'faq', items };
    }

    // ── Format 3 : paragraph starting with "N. FAQ ..." or "FAQ ..." (no markdown heading)
    // with plain Q : / R : pairs — used in premium articles like "11. FAQ Prudentielle"
    const faqParaIndex = paragraphs.findIndex((p) => {
      const s = safeStr(p).trim();
      const firstLine = s.split('\n')[0] || '';
      const hasFaqInFirstLine = /^\d+\.\s*FAQ\b/i.test(firstLine) || /^FAQ\b/i.test(firstLine);
      const hasQR = /^Q\s*[:\uff1a]/im.test(s);
      return hasFaqInFirstLine && hasQR;
    });

    if (faqParaIndex !== -1) {
      const raw = safeStr(paragraphs[faqParaIndex]);
      const items: { question: string; answer: string }[] = [];

      // Match Q : question \n R : answer (stop before Source :, next Q, or end)
      const pattern = /Q\s*[:\uff1a]\s*([^\n]+)[\n\r]+R\s*[:\uff1a]\s*([\s\S]*?)(?=[\n\r]+Source\s*[:\uff1a]|[\n\r]+Q\s*[:\uff1a]|$)/g;
      let m;
      while ((m = pattern.exec(raw)) !== null) {
        const q = m[1].replace(/\*\*/g, '').trim();
        const a = m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
        if (q && a) items.push({ question: q, answer: a });
      }

      if (items.length > 0) return { type: 'faq', items };
    }

    return null;
  } catch {
    return null;
  }
}

// ── Red flag / visual box detection ──────────────────────────────────
function detectVisualBox(paragraph: string): { type: 'red' | 'warning' | 'opportunity'; title: string; body: string } | null {
  try {
    const lower = paragraph.toLowerCase();
    if (paragraph.startsWith('\ud83d\udd34') || lower.includes('red flag critique') || lower.includes('red flag :')) {
      const clean = paragraph.replace(/^\ud83d\udd34\s*/, '').replace(/^\*{1,2}/, '').replace(/\*{1,2}$/, '');
      const colonIndex = clean.indexOf(':');
      const title = colonIndex > -1 ? clean.slice(0, colonIndex).trim() : clean.split('. ')[0].trim();
      const body = colonIndex > -1 ? clean.slice(colonIndex + 1).trim() : clean.replace(clean.split('. ')[0], '').trim();
      return { type: 'red', title: title || 'Attention', body };
    }
    if (paragraph.startsWith('\u26a0\ufe0f') || lower.includes('\u26a0')) {
      const clean = paragraph.replace(/^\u26a0\ufe0f\s*/, '').replace(/^\*{1,2}/, '').replace(/\*{1,2}$/, '');
      const title = clean.split('. ')[0].trim() || 'Avertissement';
      const body = clean.replace(clean.split('. ')[0], '').trim();
      return { type: 'warning', title, body };
    }
    if (paragraph.startsWith('\ud83d\udfe2') || lower.includes('opportunite') || lower.includes('opportunity')) {
      const clean = paragraph.replace(/^\ud83d\udfe2\s*/, '').replace(/^\*{1,2}/, '').replace(/\*{1,2}$/, '');
      const title = clean.split('. ')[0].trim() || 'Opportunité';
      const body = clean.replace(clean.split('. ')[0], '').trim();
      return { type: 'opportunity', title, body };
    }
    return null;
  } catch {
    return null;
  }
}

// ── Strip markdown bold/italic from a cell string ────────────────────
function stripCellMarkdown(text: string): string {
  try {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/&gt;/g, '\u003e')
      .replace(/&lt;/g, '\u003c')
      .replace(/&amp;/g, '&')
      .replace(/\u003e/g, '')
      .trim();
  } catch {
    return text || '';
  }
}

// ── Check if a table has very long cell content (glossaire/biblio) ────
function isHeavyTable(headers: string[], rows: string[][]): boolean {
  const allCells = [headers, ...rows].flat();
  return allCells.some(cell => cell.length > 120);
}

// ── Glossaire table (2 cols: Terme / Définition), cells not too long ──
function renderGlossaryTable(headers: string[], rows: string[][]): React.ReactNode {
  return (
    <div className="my-8 space-y-2">
      {headers.length >= 2 && (
        <div className="flex gap-4 pb-2 border-b-2 border-secondary-200">
          <div className="w-48 flex-shrink-0">
            <span className="text-xs font-bold text-foreground-500 uppercase tracking-wider">{headers[0]}</span>
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold text-foreground-500 uppercase tracking-wider">{headers[1]}</span>
          </div>
        </div>
      )}
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-4 py-3 border-b border-secondary-100 last:border-0">
          <div className="w-48 flex-shrink-0">
            <span className="font-semibold text-foreground-950 text-sm">{row[0] || ''}</span>
          </div>
          <div className="flex-1">
            <span className="text-foreground-700 text-sm leading-relaxed">{row[1] || ''}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Multi-column table (biblio, comparatif, etc.) ─────────────────────
function renderBiblioTable(headers: string[], rows: string[][]): React.ReactNode {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-secondary-200">
      <table className="w-full text-xs min-w-[600px]">
        <thead>
          <tr className="bg-secondary-50 border-b border-secondary-200">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-3 text-left font-bold text-foreground-600 uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary-100">
          {rows.map((row, ri) => (
            <tr key={ri} className="hover:bg-secondary-50/50 transition-colors">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-3 py-2.5 text-foreground-700 align-top ${ci === 0 ? 'font-medium text-foreground-950' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Table detection ───────────────────────────────────────────────────
function detectTable(paragraph: string): { headers: string[]; rows: string[][]; isHeavy: boolean } | null {
  try {
    const lines = paragraph.split('\n').filter(l => l.trim());
    if (lines.length < 2) return null;

    const pipeLines = lines.filter(l => l.includes('|'));
    if (pipeLines.length < 2) return null;

    const allCells = pipeLines.map(l =>
      l.split('|').map(c => stripCellMarkdown(c.trim())).filter(Boolean)
    );
    const isSeparator = (cells: string[]) => cells.every(c => /^[-=:]+$/.test(c));
    const filteredCells = allCells.filter(cells => !isSeparator(cells));

    if (filteredCells.length >= 2 && filteredCells[0].length > 1) {
      const headers = filteredCells[0];
      const rawRows = filteredCells.slice(1);
      const normalizedRows = rawRows.map(r => {
        if (r.length === headers.length) return r;
        if (r.length < headers.length) return [...r, ...Array(headers.length - r.length).fill('')];
        return r.slice(0, headers.length);
      });
      const heavy = isHeavyTable(headers, normalizedRows);
      return { headers, rows: normalizedRows, isHeavy: heavy };
    }
    return null;
  } catch {
    return null;
  }
}

// ── Strip markdown and HTML from heading text ─────────────────────────
function stripMarkdownAndHtml(text: string): string {
  try {
    return text
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/<[^>]+>/g, '')
      .replace(/\n/g, ' ')
      .trim();
  } catch {
    return text || '';
  }
}

// ── Render a list block (lines starting with "- ") ──────────────────
function renderListBlock(lines: string[], key: string): React.ReactNode {
  const items = lines
    .filter(l => l.trim().startsWith('- '))
    .map(l => l.trim().replace(/^-\s+/, ''));

  if (items.length === 0) return null;

  return (
    <ul key={key} className="my-4 space-y-1.5 pl-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-foreground-700 text-base leading-relaxed">
          <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 flex-shrink-0" />
          <span
            dangerouslySetInnerHTML={{
              __html: item
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground-950">$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em>$1</em>'),
            }}
          />
        </li>
      ))}
    </ul>
  );
}

// ── Detect if a multi-line segment is a list ─────────────────────────
function isListBlock(seg: string): boolean {
  const lines = seg.split('\n').filter(l => l.trim());
  if (lines.length < 2) return false;
  const listLines = lines.filter(l => l.trim().startsWith('- '));
  return listLines.length >= lines.length * 0.6;
}

// ── Render a content block ────────────────────────────────────────────
// blockIndex is the index in the original paragraphs array.
// headingId is the stable ID used for the TOC scroll target.
function renderBlock(str: string, blockIndex: number): React.ReactNode[] {
  const strTrimmed = str.trim();
  if (!strTrimmed) return [];

  const segments = strTrimmed.split(/\n\s*\n/).filter(s => s.trim());
  const out: React.ReactNode[] = [];
  let headingRenderedForBlock = false;

  for (let si = 0; si < segments.length; si++) {
    const seg = segments[si].trim();
    const segKey = `seg-${blockIndex}-${si}`;

    // ── H2 / H3 heading ────────────────────────────────────────────
    const headingMatch = seg.match(/^(#{2,3})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = stripMarkdownAndHtml(headingMatch[2] || '');
      if (text) {
        const Tag = level === 2 ? ('h2' as const) : ('h3' as const);
        // Use the stable canonical ID only on the FIRST heading of this block
        const id = !headingRenderedForBlock
          ? blockHeadingId(blockIndex)
          : `${blockHeadingId(blockIndex)}-sub-${si}`;
        headingRenderedForBlock = true;
        out.push(
          <Tag
            key={segKey}
            id={id}
            className={`font-playfair font-bold text-foreground-950 leading-tight mt-10 mb-5 scroll-mt-28 ${
              level === 2 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
            }`}
          >
            {text}
          </Tag>
        );
        continue;
      }
    }

    // ── H4 heading (### ###) — treat as sub-heading ────────────────
    const h4Match = seg.match(/^####\s+(.+)/);
    if (h4Match) {
      const text = stripMarkdownAndHtml(h4Match[1] || '');
      if (text) {
        out.push(
          <h4 key={segKey} className="font-playfair font-semibold text-foreground-800 text-lg mt-6 mb-3">
            {text}
          </h4>
        );
        continue;
      }
    }

    // ── Visual box (red flag / warning / opportunity) ──────────────
    const visual = detectVisualBox(seg);
    if (visual && visual.title) {
      out.push(
        <ArticleVisualBox key={segKey} type={visual.type} title={visual.title}>
          {visual.body}
        </ArticleVisualBox>
      );
      continue;
    }

    // ── Table detection ────────────────────────────────────────────
    const tableResult = detectTable(seg);
    if (tableResult && tableResult.headers.length > 1) {
      const { headers, rows, isHeavy } = tableResult;
      // Glossary: exactly 2 cols, cells not too long, 3+ rows
      const isGlossary = headers.length === 2 && !isHeavy && rows.length >= 2;
      if (isGlossary) {
        out.push(<div key={segKey}>{renderGlossaryTable(headers, rows)}</div>);
        continue;
      }
      // Heavy table or multi-col → biblio style
      if (isHeavy || headers.length >= 3) {
        out.push(<div key={segKey}>{renderBiblioTable(headers, rows)}</div>);
        continue;
      }
      out.push(<ArticleDataTable key={segKey} headers={headers} rows={rows} />);
      continue;
    }

    // ── List block ─────────────────────────────────────────────────
    if (isListBlock(seg)) {
      const listNode = renderListBlock(seg.split('\n'), segKey);
      if (listNode) {
        out.push(listNode);
        continue;
      }
    }

    // ── Checklist (- [ ] items) ────────────────────────────────────
    if (seg.includes('- [ ]') || seg.includes('- [x]') || seg.includes('- [X]')) {
      const lines = seg.split('\n').filter(l => l.trim());
      out.push(
        <ul key={segKey} className="my-4 space-y-2">
          {lines.map((line, li) => {
            const isDone = /- \[x\]/i.test(line);
            const text = line.replace(/- \[[x ]\]\s*/i, '').trim();
            return (
              <li key={li} className="flex items-start gap-2.5">
                <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center text-xs ${isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-secondary-300'}`}>
                  {isDone && '✓'}
                </span>
                <span
                  className={`text-sm leading-relaxed ${isDone ? 'text-foreground-400 line-through' : 'text-foreground-700'}`}
                  dangerouslySetInnerHTML={{
                    __html: text.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground-950">$1</strong>'),
                  }}
                />
              </li>
            );
          })}
        </ul>
      );
      continue;
    }

    // ── Fallback: paragraph ────────────────────────────────────────
    // Skip if purely a heading-like single line that wasn't caught above
    if (seg.match(/^#{1,6}\s/) && seg.split('\n').length === 1) {
      const text = stripMarkdownAndHtml(seg);
      if (text) {
        out.push(
          <p key={segKey} className="font-semibold text-foreground-800 mt-4 mb-2 text-base">
            {text}
          </p>
        );
      }
      continue;
    }

    // Sanitize < and > that are plain text before injecting HTML
    const sanitizedSeg = seg
      .replace(/&lt;/g, '\u003c')
      .replace(/&gt;/g, '\u003e');
    out.push(
      <p
        key={segKey}
        className="text-foreground-700 leading-relaxed mb-5 text-base"
        dangerouslySetInnerHTML={{
          __html: sanitizedSeg
            .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground-950">$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em class="text-foreground-600">$1</em>')
            // inline list items that weren't caught by isListBlock
            .replace(/(?:^|\n)- (.+)/g, (_, item) =>
              `<span class="flex items-start gap-2 my-1"><span class="inline-block w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span><span>${item}</span></span>`
            )
            .replace(/\n/g, '<br/>'),
        }}
      />
    );
  }

  return out;
}

// ── CTA placeholder wrapper to prevent CLS ───────────────────────────
function CtaPlaceholder({ children, minHeight, testId }: { children: React.ReactNode; minHeight: number; testId?: string }) {
  return (
    <div
      data-cta-placeholder={testId}
      style={{ minHeight, contain: 'layout paint' } as React.CSSProperties}
      className="w-full"
    >
      {children}
    </div>
  );
}

export function ArticleContentRenderer({ paragraphs, articleId, isEn, leadMagnetType }: ArticleContentRendererProps) {
  const { faq, displayNodes } = useMemo(() => {
    try {
      const safeParas: string[] = Array.isArray(paragraphs)
        ? paragraphs.map(p => safeStr(p)).filter(p => p.trim() !== '')
        : [];

      const faqResult = parseFAQ(safeParas);

      const contentLength = safeParas.length;
      const leadMagnetInsertIndex = contentLength > 10 ? Math.floor(contentLength * 0.55) : -1;
      const newsletterInsertIndex = Math.floor(contentLength / 2);
      let paragraphCount = 0;
      let skipUntil = -1;
      const nodes: React.ReactNode[] = [];

      for (let i = 0; i < safeParas.length; i++) {
        if (i < skipUntil) continue;
        const p = safeParas[i];

        // Skip FAQ SEO/IA block (format 1, rendered separately below)
        if (p.includes('FAQ SEO / IA') || p.includes('SEO/IA FAQ')) {
          if (!p.includes('CTA CONVERSION')) {
            skipUntil = i + 1;
            while (skipUntil < safeParas.length && !safeParas[skipUntil].includes('CTA CONVERSION')) {
              skipUntil++;
            }
            skipUntil++;
          }
          continue;
        }

        // Skip FAQ heading blocks (format 2: ## ... FAQ ...) — rendered separately below
        if (/^#{1,3}\s+[IVXLCDM\d.]*\s*FAQ/i.test(p) || /^#{1,3}\s+.*\bFAQ\b/i.test(p)) {
          // Skip this block and all following until a non-FAQ major heading or end
          skipUntil = i + 1;
          while (skipUntil < safeParas.length) {
            const nextP = safeParas[skipUntil];
            if (/^#{1,2}\s+/.test(nextP) && !/\bFAQ\b/i.test(nextP)) break;
            skipUntil++;
          }
          continue;
        }

        // Skip FAQ paragraph blocks (format 3: "N. FAQ ..." or "FAQ ..." as first line, no #)
        // with plain Q : / R : pairs — rendered separately by ArticleFAQBlock below
        if (/^\d+\.\s*FAQ\b/i.test(p) || /^FAQ\b/i.test(p)) {
          if (/^Q\s*[:\uff1a]/im.test(p)) {
            continue;
          }
        }

        if (p.includes('CTA CONVERSION')) continue;
        if (!p.trim()) continue;

        // Inject lead magnet CTA mid-article
        if (leadMagnetInsertIndex > 0 && paragraphCount === leadMagnetInsertIndex && leadMagnetType) {
          nodes.push(
            <CtaPlaceholder key={`lm-${i}`} minHeight={320} testId="lead-magnet">
              <LeadMagnetCTA type={leadMagnetType} />
            </CtaPlaceholder>
          );
        }

        // Inject newsletter mid-article
        if (paragraphCount === newsletterInsertIndex && paragraphCount > 0) {
          nodes.push(
            <CtaPlaceholder key={`nl-${i}`} minHeight={180} testId="newsletter">
              <ArticleNewsletterInline />
            </CtaPlaceholder>
          );
        }

        paragraphCount++;

        let rendered: React.ReactNode[];
        try {
          rendered = renderBlock(p, i);
        } catch {
          rendered = [
            <p key={`fallback-${i}`} className="text-foreground-700 leading-relaxed mb-5 text-base">
              {p.replace(/[*#`|]/g, ' ').replace(/\s+/g, ' ').trim()}
            </p>,
          ];
        }

        if (rendered != null && rendered.length > 0) {
          nodes.push(...rendered);
        }
      }

      return { faq: faqResult, displayNodes: nodes };
    } catch (err) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error('[ArticleContentRenderer] crash for article', articleId, err);
      }
      return { faq: null, displayNodes: [] };
    }
  }, [paragraphs, articleId, isEn, leadMagnetType]);

  return (
    <article className="prose prose-lg max-w-none">
      {displayNodes}
      {faq && faq.items.length > 0 && (
        <ArticleFAQBlock items={faq.items} articleId={articleId} />
      )}
    </article>
  );
}



