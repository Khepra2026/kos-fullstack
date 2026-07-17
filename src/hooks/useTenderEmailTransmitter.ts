import { useCallback, useMemo } from 'react';

export interface TenderForEmail {
  id: string;
  tender_title: string;
  source_organization: string;
  tender_type: string;
  submission_deadline: string;
  estimated_budget_fcfa: number;
  relevance_score: number;
  qualification_status: string;
  country: string;
  region: string;
  match_category: string;
}

function formatFCFA(val: number): string {
  if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)} Md`;
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)} M`;
  return val.toLocaleString('fr-FR');
}

export function useTenderEmailTransmitter(tenders: TenderForEmail[]) {
  const qualifiedTenders = useMemo(
    () => tenders.filter(t => t.qualification_status === 'qualified' || t.qualification_status === 'evaluation'),
    [tenders]
  );

  // Keep only top tenders by score to stay under mailto URL length limits (~2000 chars)
  const topTenders = useMemo(
    () => [...qualifiedTenders].sort((a, b) => b.relevance_score - a.relevance_score).slice(0, 8),
    [qualifiedTenders]
  );

  const stats = useMemo(() => {
    const critical = topTenders.filter(t => t.qualification_status === 'qualified' && t.relevance_score >= 8.5).length;
    const qualified = topTenders.filter(t => t.qualification_status === 'qualified').length;
    const totalBudget = qualifiedTenders.reduce((s, t) => s + (t.estimated_budget_fcfa || 0), 0);
    const aoCount = topTenders.filter(t => t.tender_type === 'AO').length;
    const amiCount = topTenders.filter(t => t.tender_type === 'AMI').length;
    return { critical, qualified, totalBudget, aoCount, amiCount, totalQualified: qualifiedTenders.length };
  }, [qualifiedTenders, topTenders]);

  const buildCompactEmailBody = useCallback((): string => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    let text = `KOS TENDER INTELLIGENCE — AO/AMI DETECTES\n`;
    text += `${'='.repeat(45)}\n`;
    text += `${dateStr} a ${timeStr}\n`;
    text += `${stats.totalQualified} AO/AMI au total · ${stats.qualified} qualifies · ${stats.critical} critiques\n`;
    text += `Budget cumule: ${formatFCFA(stats.totalBudget)} FCFA\n\n`;

    topTenders.forEach((t, i) => {
      const deadline = t.submission_deadline
        ? new Date(t.submission_deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
        : 'N/A';
      const budget = formatFCFA(t.estimated_budget_fcfa || 0);
      text += `${i + 1}. [${t.relevance_score}/10] ${t.tender_title}\n`;
      text += `   ${t.source_organization} · ${t.country} · ${budget} FCFA · Limite: ${deadline}\n\n`;
    });

    if (stats.totalQualified > topTenders.length) {
      text += `... et ${stats.totalQualified - topTenders.length} autres AO/AMI sur le dashboard.\n\n`;
    }

    text += `${'-'.repeat(45)}\n`;
    text += `Transmis par KOS Tender Intelligence Engine\n`;
    text += `KHEPRA EXPERTS | Investment & ESG Advisory Boutique\n`;
    text += `Dashboard: /kos-tender-intelligence\n`;
    return text;
  }, [topTenders, stats]);

  const buildMailtoUrl = useCallback((): string => {
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    const subject = encodeURIComponent(
      `KOS Tender Intelligence — ${stats.totalQualified} AO/AMI — ${dateStr}`
    );
    const body = encodeURIComponent(buildCompactEmailBody());
    return `mailto:contact@khepraexperts.com?subject=${subject}&body=${body}`;
  }, [buildCompactEmailBody, stats.totalQualified]);

  const transmitByEmail = useCallback(() => {
    const url = buildMailtoUrl();
    try {
      window.location.href = url;
    } catch {
      // Browser handles mailto failures silently
    }
  }, [buildMailtoUrl]);

  const buildEmailHtml = useCallback((): string => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    const rows = topTenders.map((t, i) => {
      const deadline = t.submission_deadline
        ? new Date(t.submission_deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'N/A';
      const budget = formatFCFA(t.estimated_budget_fcfa || 0);
      const statusLabel = t.qualification_status === 'qualified' ? 'QUALIFIE' : 'EN EVALUATION';

      return `<tr style="border-bottom:1px solid #e5e3df;${i % 2 === 0 ? 'background:#faf9f7;' : ''}">
<td style="padding:10px 12px;font-size:13px;color:#1a1a1a;vertical-align:top;">
<div style="font-weight:600;margin-bottom:2px;">${t.tender_title}</div>
<div style="font-size:11px;color:#6b6b6b;">${t.source_organization} · ${t.country} · ${t.region}</div>
</td>
<td style="padding:10px 12px;font-size:12px;color:#1a1a1a;vertical-align:top;white-space:nowrap;">
<span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600;background:#16a34a15;color:#16a34a;">${statusLabel}</span>
</td>
<td style="padding:10px 12px;font-size:12px;color:#1a1a1a;vertical-align:top;white-space:nowrap;">${t.match_category || t.tender_type}</td>
<td style="padding:10px 12px;font-size:12px;color:#1a1a1a;vertical-align:top;white-space:nowrap;text-align:right;font-weight:600;">${budget} FCFA</td>
<td style="padding:10px 12px;font-size:13px;color:#16a34a;vertical-align:top;white-space:nowrap;text-align:center;font-weight:700;">${t.relevance_score}/10</td>
<td style="padding:10px 12px;font-size:12px;color:#dc2626;vertical-align:top;white-space:nowrap;text-align:right;">${deadline}</td>
</tr>`;
    }).join('');

    const typeParts = [];
    if (stats.aoCount > 0) typeParts.push(`${stats.aoCount} AO`);
    if (stats.amiCount > 0) typeParts.push(`${stats.amiCount} AMI`);
    const typeLabel = typeParts.join(' + ') || '0';

    return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:Helvetica Neue,Arial,sans-serif;line-height:1.6;color:#1a1a1a;">
  <div class="khepra-wrapper" style="max-width:700px;margin:0 auto;padding:20px;">
    <div style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #e5e3df;border-radius:8px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:3px solid #c19a6b;text-align:center;background:#1a1a1a;">
        <div style="font-size:20px;font-weight:800;color:#c19a6b;letter-spacing:2px;text-transform:uppercase;">KOS TENDER INTELLIGENCE</div>
        <div style="font-size:11px;color:#9a9a9a;letter-spacing:1px;margin-top:4px;">Transmission automatique — ${dateStr} a ${timeStr}</div>
      </div>
      <div style="padding:28px;">
        <h2 style="margin:0 0 6px;font-size:18px;color:#1a1a1a;">${typeLabel} detectes</h2>
        <p style="margin:0 0 20px;font-size:13px;color:#6b6b6b;">
          ${stats.totalQualified} appel(s) d'offres / manifestation(s) d'interet detecte(s) et qualifie(s) par KOS AI.<br/>
          <strong>${stats.qualified} qualifie(s)</strong> · <strong>${stats.critical} critique(s)</strong> · Budget cumule : <strong>${formatFCFA(stats.totalBudget)} FCFA</strong>
        </p>
        ${topTenders.length > 0 ? `
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:#1a1a1a;color:#c19a6b;">
              <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Appel d'Offres / AMI</th>
              <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Statut</th>
              <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Categorie</th>
              <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Budget</th>
              <th style="padding:10px 12px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Score</th>
              <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Date Limite</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>` : ''}
        <div style="margin-top:24px;padding:16px;background:#faf9f7;border-radius:6px;border-left:4px solid #c19a6b;">
          <p style="margin:0;font-size:12px;color:#6b6b6b;">
            <strong>KOS Tender Intelligence Engine</strong> — Agent autonome de veille strategique<br/>
            16 sources surveillees 24h/24 · Scoring AI Big Four · Qualification automatique
          </p>
        </div>
      </div>
      <div style="padding:20px 28px;background:#1a1a1a;color:#9a9a9a;text-align:center;">
        <div style="font-size:13px;font-weight:700;color:#c19a6b;margin-bottom:4px;">KHEPRA EXPERTS</div>
        <div style="font-size:11px;color:#6b6b6b;line-height:1.5;">
          Investment &amp; ESG Advisory Boutique<br/>
          contact@khepraexperts.com | +33 1 83 64 05 75
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
  }, [topTenders, stats]);

  return {
    qualifiedTenders: topTenders,
    stats,
    buildEmailHtml,
    buildCompactEmailBody,
    buildMailtoUrl,
    transmitByEmail,
  };
}