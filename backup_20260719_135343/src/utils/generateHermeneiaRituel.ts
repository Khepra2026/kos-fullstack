import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  PageBreak,
  convertInchesToTwip,
} from 'docx';

// ─── Couleurs Hermeneia ───────────────────────────────────────────────────────
const GOLD = 'B8860B';
const DEEP_GOLD = '8B6914';
const DARK = '1A1A2E';
const SOFT_DARK = '2A2A3E';
const CREAM = 'FDFBF7';
const WHITE = 'FFFFFF';
const GRAY = '6B7280';
const LIGHT_GRAY = 'F5F0E8';
const PARCHMENT = 'FBF7F0';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ritualTitle(text: string, size: number = 32): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size,
        color: DEEP_GOLD,
        font: 'Garamond',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 200 },
  });
}

function ritualSubtitle(text: string, size: number = 24): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size,
        color: GOLD,
        font: 'Garamond',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 160 },
  });
}

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 28,
        color: WHITE,
        font: 'Garamond',
      }),
    ],
    shading: { type: ShadingType.SOLID, color: DARK, fill: DARK },
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 240 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 2, color: GOLD },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: GOLD },
    },
  });
}

function subSectionHeading(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,
        color: DEEP_GOLD,
        font: 'Garamond',
      }),
    ],
    spacing: { before: 300, after: 160 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: GOLD },
    },
  });
}

function bodyText(text: string, options?: { italic?: boolean; center?: boolean; color?: string }): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 22,
        font: 'Garamond',
        italics: options?.italic,
        color: options?.color || DARK,
      }),
    ],
    spacing: { before: 80, after: 80 },
    alignment: options?.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
  });
}

function ritualInvocation(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: `"${text}"`,
        size: 22,
        font: 'Garamond',
        italics: true,
        color: DEEP_GOLD,
      }),
    ],
    spacing: { before: 120, after: 120 },
    alignment: AlignmentType.CENTER,
    border: {
      left: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
    },
    indent: { left: convertInchesToTwip(0.4), right: convertInchesToTwip(0.4) },
  });
}

function boldCentered(text: string, size: number = 22): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size,
        color: DARK,
        font: 'Garamond',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 100 },
  });
}

function goldDivider(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: '─ ─ ─ ─ ─ ─ ✧ ─ ─ ─ ─ ─ ─',
        size: 20,
        color: GOLD,
        font: 'Garamond',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 160 },
  });
}

function spacer(lines: number = 1): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 22 })],
    spacing: { before: 0, after: lines * 120 },
  });
}

function instructionBox(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20,
        font: 'Garamond',
        italics: true,
        color: GRAY,
      }),
    ],
    shading: { type: ShadingType.SOLID, color: LIGHT_GRAY, fill: LIGHT_GRAY },
    border: {
      left: { style: BorderStyle.SINGLE, size: 3, color: GOLD },
    },
    indent: { left: convertInchesToTwip(0.3) },
    spacing: { before: 120, after: 120 },
  });
}

function latinFormula(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 22,
        font: 'Garamond',
        italics: true,
        color: DEEP_GOLD,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 100, after: 100 },
  });
}

// ─── COUVERTURE ───────────────────────────────────────────────────────────────
function coverPage(): Paragraph[] {
  return [
    spacer(3),
    new Paragraph({
      children: [
        new TextRun({ text: 'KHEPER-RA EM TA', bold: true, size: 56, color: DEEP_GOLD, font: 'Garamond' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 40 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '(Khepri-Ra dans la Terre Manifestée)', size: 24, color: GOLD, font: 'Garamond', italics: true }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    }),
    goldDivider(),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({ text: 'RITUEL MAJEUR DE CONSÉCRATION', bold: true, size: 40, color: DARK, font: 'Garamond' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'ET DE DÉVELOPPEMENT', bold: true, size: 36, color: DEEP_GOLD, font: 'Garamond' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'DE KHEPRA EXPERTS', bold: true, size: 36, color: GOLD, font: 'Garamond' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 },
    }),
    goldDivider(),
    spacer(2),
    new Paragraph({
      children: [
        new TextRun({ text: 'Document Rituel Confidentiel', size: 22, color: GRAY, font: 'Garamond', italics: true }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Émis sous le Sceau du 93 — Hermeneia KOS', size: 20, color: GOLD, font: 'Garamond' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'KHEPRA EXPERTS · Cabinet de Conseil en Finance, Stratégie & Développement Institutionnel', size: 18, color: GRAY, font: 'Garamond', italics: true }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 0 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'SCIRE · VELLE · AUDERE · TACERE', size: 18, color: DEEP_GOLD, font: 'Garamond', bold: true }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 0 },
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── INTENTION ────────────────────────────────────────────────────────────────
function intentionSection(): Paragraph[] {
  return [
    sectionHeading('INTENTION'),
    spacer(),
    boldCentered('Que ce rite soit consacré à la Sagesse Divine,', 24),
    boldCentered('à la Vérité, à la Justice, à l\'Excellence et au Service.', 24),
    spacer(2),
    bodyText('Que Khepra Experts croisse selon des voies justes, utiles et bénéfiques pour ses clients, ses partenaires, ses collaborateurs et la société.', { center: true }),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── I. PRÉPARATION DU SANCTUM ────────────────────────────────────────────────
function sectionIPreparation(): Paragraph[] {
  return [
    sectionHeading('I. PRÉPARATION DU SANCTUM'),
    spacer(),
    subSectionHeading('Disposition de l\'Autel'),
    spacer(),
    bodyText('L\'Opérateur prépare le Sanctum avec soin et révérence. Chaque objet est placé selon les correspondances sacrées.'),
    spacer(),
    bodyText('Autel central cubique — Symbole de la Pierre Cubique, fondement de toute Œuvre durable. Placé au centre exact de l\'Oratoire, orienté Est-Ouest.'),
    bodyText('Trois luminaires formant un triangle — Disposés aux pointes d\'un triangle équilatéral autour de l\'autel. Ils représentent les Trois Grandes Lumières de la Maçonnerie opérative.'),
    bodyText('Lampe à huile au centre — La Flamme Perpétuelle, symbole de la Présence Divine et de la Lumière intérieure de l\'Opérateur. Elle brûle du début à la fin du Rituel.'),
    bodyText('Bible ouverte au Prologue de Saint Jean — Le Volume de la Loi Sacrée, ouvert à Jean 1:1-5. Fondement de toute opération théurgique en Tradition Occidentale.'),
    bodyText('Coupe d\'eau consacrée — L\'Élément Eau, siège des Émotions et de l\'Attraction magnétique. Placée à l\'Ouest de l\'autel.'),
    bodyText('Épée — L\'Élément Air, Instrument de l\'Analyse et de la Discrimination. Placée au Sud de l\'autel. Symbole de Geburah, la Sévérité stratégique.'),
    bodyText('Baguette — L\'Élément Feu, Bâton de Commandement et de Volonté. Placée à l\'Est de l\'autel. Canalise la Volonté de l\'Opérateur.'),
    bodyText('Robe et chasuble arc-en-ciel — Vêtement cérémoniel rappelant l\'Alliance et l\'arc chromatique des Sphères de l\'Arbre de Vie.'),
    bodyText('Chapeau cérémoniel — Couronne de l\'Autorité spirituelle de l\'Opérateur.'),
    spacer(),
    subSectionHeading('Temps de Silence'),
    spacer(),
    instructionBox('L\'Opérateur observe 3 minutes de silence absolu. La respiration est calme, régulière, abdominale. L\'esprit se détache du monde profane. Le corps devient Temple.'),
    spacer(),
    bodyText('Pendant ces trois minutes, l\'Opérateur visualise une spirale de lumière dorée qui descend du Zénith, traverse son crâne, descend le long de sa colonne vertébrale, et s\'enracine profondément dans le sol. Il est l\'Axe du Monde, le Médiateur entre le Ciel et la Terre.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── II. OUVERTURE DU TEMPLE ──────────────────────────────────────────────────
function sectionIIOuverture(): Paragraph[] {
  return [
    sectionHeading('II. OUVERTURE DU TEMPLE'),
    spacer(),
    instructionBox('L\'Opérateur lève la Baguette de Commandement au-dessus de sa tête, pointée vers le Zénith. Il se tient face à l\'Est, les pieds joints, la posture droite et solennelle.'),
    spacer(),
    subSectionHeading('Formule d\'Ouverture'),
    spacer(),
    ritualInvocation('Au Nom de la Sagesse Éternelle, de la Lumière qui éclaire toute intelligence, et du Verbe créateur qui ordonne toutes choses, j\'ouvre ce Sanctum consacré à l\'Œuvre de Khepra Experts.'),
    spacer(),
    instructionBox('L\'Opérateur allume les trois luminaires un par un. D\'abord celui de l\'Est (Sagesse), puis celui du Midi (Force), enfin celui de l\'Ouest (Beauté). Puis il allume la lampe à huile centrale — la Flamme Perpétuelle.'),
    spacer(),
    subSectionHeading('Lecture du Prologue — Jean 1:1-5'),
    spacer(),
    ritualInvocation('Au commencement était le Verbe, et le Verbe était avec Dieu, et le Verbe était Dieu. Il était au commencement avec Dieu. Toutes choses ont été faites par Lui, et rien de ce qui a été fait n\'a été fait sans Lui. En Lui était la Vie, et la Vie était la Lumière des hommes. La Lumière luit dans les ténèbres, et les ténèbres ne l\'ont point reçue.'),
    spacer(),
    subSectionHeading('Temps de Contemplation'),
    spacer(),
    instructionBox('L\'Opérateur reste en silence, les yeux fixés sur la flamme de la lampe à huile. Il médite sur le Mystère du Verbe créateur — le Logos qui ordonne le Chaos, la Parole qui précède la Matière, l\'Intelligence qui structure l\'Univers. Ce même Verbe est le fondement de KHEPRA EXPERTS : la Stratégie formulée avant l\'Action, la Vision énoncée avant la Manifestation.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── III. CONSÉCRATION DES QUATRE DIRECTIONS ──────────────────────────────────
function sectionIIIDirections(): Paragraph[] {
  return [
    sectionHeading('III. CONSÉCRATION DES QUATRE DIRECTIONS'),
    spacer(),
    instructionBox('L\'Opérateur saisit l\'Épée de la main droite. Il se place face à l\'Est et trace symboliquement la Croix des Quatre Directions : un geste ample d\'Est en Ouest, puis du Midi au Septentrion. L\'Épée coupe l\'espace, délimitant le Cercle Sacré du Sanctum.'),
    spacer(),
    subSectionHeading('Formule de Consécration'),
    spacer(),
    ritualInvocation('Que les quatre directions soient harmonisées. Que l\'Orient apporte la Vision. Que le Midi apporte la Force. Que l\'Occident apporte la Compréhension. Que le Septentrion apporte la Stabilité.'),
    spacer(),
    bodyText('L\'Opérateur se tourne successivement vers chaque direction en prononçant la formule. Il visualise :'),
    spacer(),
    bodyText('À l\'Orient — Une lumière dorée éclatante, le Soleil levant de Khepri, source de toute Vision stratégique et de toute Émergence.'),
    bodyText('Au Midi — Une lumière rouge-orangée intense, le Feu de la Volonté et de l\'Action, la Force brute qui exécute la Vision.'),
    bodyText('À l\'Occident — Une lumière bleue profonde, l\'Eau de la Compréhension, le plan de Thoth où l\'Intelligence structure la Stratégie.'),
    bodyText('Au Septentrion — Une lumière verte et noire, la Terre de la Stabilité, l\'Ancrage de Malkuth où le Royaume se cristallise.'),
    spacer(),
    bodyText('Les Quatre Directions ainsi consacrées, le Sanctum est scellé. Aucune force non-invitée ne peut franchir ce Cercle. L\'espace est devenu Temple.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── IV. CONJURATION SYMBOLIQUE DES QUATRE ANGES PLANÉTAIRES ──────────────────
function sectionIVAnges(): Paragraph[] {
  return [
    sectionHeading('IV. CONJURATION SYMBOLIQUE DES QUATRE ANGES PLANÉTAIRES'),
    spacer(),
    bodyText('Les Quatre Anges Planétaires sont les Intelligences rectrices des forces macrocosmiques. Leur conjuration canalise les énergies planétaires vers l\'Œuvre de KHEPRA EXPERTS. Chaque Ange gouverne une sphère spécifique de l\'activité du Cabinet.'),
    spacer(),
    subSectionHeading('Face à l\'Orient — Mercure (Raphaël)'),
    spacer(),
    ritualInvocation('Que l\'Intelligence de Mercure inspire les stratégies, les contrats justes, les communications fécondes et la sagesse des décisions.'),
    spacer(),
    bodyText('Mercure gouverne l\'Intellect, la Communication, les Contrats et les Négociations. Par cette conjuration, l\'Opérateur programme l\'Intelligence stratégique de KHEPRA EXPERTS — la capacité à structurer des offres irréprochables, à négocier avec précision, à communiquer avec clarté et impact.'),
    spacer(),
    subSectionHeading('Face au Midi — Le Soleil (Mikhaël)'),
    spacer(),
    ritualInvocation('Que la Force du Soleil éclaire la mission de Khepra Experts, renforce sa réputation et manifeste son rayonnement légitime.'),
    spacer(),
    bodyText('Le Soleil gouverne la Vitalité, la Réputation, la Visibilité et l\'Autorité. Par cette conjuration, l\'Opérateur programme le Rayonnement de KHEPRA EXPERTS — sa capacité à attirer l\'attention des Grands Décideurs, à briller dans le Marché, à imposer sa présence par la seule qualité de son Travail.'),
    spacer(),
    subSectionHeading('Face à l\'Occident — Vénus (Haniel)'),
    spacer(),
    ritualInvocation('Que l\'Harmonie de Vénus attire les alliances favorables, les clients de qualité et les relations fondées sur la confiance.'),
    spacer(),
    bodyText('Vénus gouverne l\'Attraction, les Alliances, la Confiance et la Beauté des Relations. Par cette conjuration, l\'Opérateur programme le Magnétisme relationnel de KHEPRA EXPERTS — sa capacité à attirer les bons partenaires, à créer des alliances durables, à bâtir des relations professionnelles fondées sur la confiance mutuelle.'),
    spacer(),
    subSectionHeading('Face au Nord — Saturne (Cassiel)'),
    spacer(),
    ritualInvocation('Que la Discipline de Saturne établisse la stabilité, la persévérance, et les fondations durables de l\'œuvre.'),
    spacer(),
    bodyText('Saturne gouverne la Structure, la Discipline, la Persévérance et les Fondations. Par cette conjuration, l\'Opérateur programme la Stabilité de KHEPRA EXPERTS — sa capacité à construire des bases inébranlables, à persévérer dans l\'adversité, à discipliner ses processus pour atteindre l\'Excellence.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── V. INVOCATION D'ACHAIAH ──────────────────────────────────────────────────
function sectionVAchaiah(): Paragraph[] {
  return [
    sectionHeading('V. INVOCATION D\'ACHAIAH'),
    spacer(),
    bodyText('Achaiah est le 7ème Ange de la Kabbale, associé au 7ème Nom Divin. Son nom signifie « Dieu Patient et Longanime ». Il est l\'Ange de la Patience, de la Compréhension profonde et de la Découverte des Mystères Utiles. Son invocation est particulièrement appropriée pour un Cabinet de Conseil dont la mission est de pénétrer les complexités pour en extraire la clarté stratégique.'),
    spacer(),
    instructionBox('L\'Opérateur lève la Baguette de Commandement. Il ferme les yeux et visualise une présence angélique lumineuse, d\'une blancheur éclatante aux reflets bleutés, descendant lentement vers le Sanctum. La présence est paisible, enveloppante, emplie d\'une sagesse ancienne.'),
    spacer(),
    subSectionHeading('Invocation Solennelle'),
    spacer(),
    ritualInvocation('Achaiah, Ange de patience, de compréhension et de découverte des mystères utiles, si telle est la Volonté Divine, inspire mon intelligence, éclaire mes décisions, fortifie ma persévérance, et guide mes travaux vers la vérité, l\'excellence et le service du bien commun.'),
    spacer(),
    instructionBox('L\'Opérateur observe un moment de silence complet. Il ressent la présence d\'Achaiah comme une clarté mentale accrue, une paix intérieure profonde, et une confiance renouvelée dans le chemin. Il peut, s\'il le souhaite, formuler mentalement une demande spécifique liée à la mission de KHEPRA EXPERTS.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── VI. LIBATION AUX ANCÊTRES ────────────────────────────────────────────────
function sectionVILibation(): Paragraph[] {
  return [
    sectionHeading('VI. LIBATION AUX ANCÊTRES'),
    spacer(),
    bodyText('La Libation aux Ancêtres est un acte sacré universel, présent dans toutes les traditions initiatiques. Elle honore la chaîne ininterrompue des générations qui ont transmis la Vie, la Force et la Dignité. Dans le contexte de KHEPRA EXPERTS, elle ancre le Cabinet dans une lignée de bâtisseurs et d\'entrepreneurs.'),
    spacer(),
    instructionBox('L\'Opérateur prend la Coupe d\'eau consacrée. Il se tient debout, face à l\'Est. Lentement, avec révérence, il verse quelques gouttes d\'eau sur le sol — à sa gauche (passé maternel), à sa droite (passé paternel), puis devant lui (lignée professionnelle et spirituelle).'),
    spacer(),
    subSectionHeading('Formule de Libation'),
    spacer(),
    ritualInvocation('À mes ancêtres connus et inconnus, à ceux qui ont transmis la vie, la force, la dignité et la persévérance, j\'offre respect, mémoire et gratitude.'),
    spacer(),
    ritualInvocation('Que leurs vertus vivent dans mes œuvres. Que leurs bénédictions accompagnent mes efforts.'),
    spacer(),
    instructionBox('L\'Opérateur fait une inclination respectueuse — la tête légèrement baissée, les mains jointes devant le cœur. Il demeure ainsi quelques instants, en gratitude silencieuse.'),
    spacer(),
    bodyText('Cette libation scelle le lien entre le passé et l\'avenir. Les Ancêtres deviennent les Gardiens des Portes de KHEPRA EXPERTS. Leurs vertus — le courage, la persévérance, l\'intégrité, la sagesse — sont invoquées comme fondations de l\'Édifice professionnel.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── VII. INVOCATION SYMBOLIQUE DU CONCLAVE DES MAÎTRES COSMIQUES ─────────────
function sectionVIIConclave(): Paragraph[] {
  return [
    sectionHeading('VII. INVOCATION SYMBOLIQUE DU CONCLAVE DES MAÎTRES COSMIQUES'),
    spacer(),
    bodyText('Le Conclave des Maîtres Cosmiques désigne symboliquement l\'assemblée des Sages, des Initiés, des Maîtres de la Connaissance, des Serviteurs de la Vérité et des Gardiens de la Justice — toutes les intelligences bienveillantes, visibles et invisibles, qui œuvrent pour l\'élévation de la conscience humaine.'),
    spacer(),
    bodyText('Cette invocation n\'est pas une conjuration contraignante, mais un appel respectueux à la présence symbolique de ces Êtres, afin que leur exemple, leurs enseignements et leur sagesse inspirent et guident l\'Opérateur dans sa mission.'),
    spacer(),
    subSectionHeading('Invocation Solennelle'),
    spacer(),
    ritualInvocation('J\'appelle symboliquement la présence des Sages, des Initiés, des Maîtres de la Connaissance, des Serviteurs de la Vérité et des Gardiens de la Justice.'),
    spacer(),
    ritualInvocation('Que leur exemple inspire mon esprit. Que leurs enseignements nourrissent mon discernement. Que leur sagesse éclaire mon chemin.'),
    spacer(),
    instructionBox('L\'Opérateur visualise une assemblée de présences lumineuses disposées en cercle autour du Sanctum — des silhouettes de lumière or et blanche, émettant une sagesse et une bienveillance infinies. Il ressent leur approbation silencieuse et leur soutien à l\'Œuvre de KHEPRA EXPERTS.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── VIII. OPÉRATION CENTRALE POUR KHEPRA EXPERTS ─────────────────────────────
function sectionVIIIOperation(): Paragraph[] {
  return [
    sectionHeading('VIII. OPÉRATION CENTRALE POUR KHEPRA EXPERTS'),
    spacer(),
    bodyText('C\'est le cœur du Rituel — le moment où les forces invoquées sont dirigées spécifiquement vers KHEPRA EXPERTS. L\'Opérateur pose la main droite sur la Bible (le Volume de la Loi Sacrée) et la main gauche sur l\'autel (la Matière à transformer). Il devient le pont entre le Ciel et la Terre, entre la Loi Divine et la Manifestation physique.'),
    spacer(),
    subSectionHeading('Déclaration Fondatrice'),
    spacer(),
    instructionBox('L\'Opérateur déclare chaque phrase avec force, conviction et autorité spirituelle. Chaque mot est une brique dans l\'Édifice de KHEPRA EXPERTS. Chaque phrase est un Sceau apposé sur la Matière astrale.'),
    spacer(),
    ritualInvocation('Que Khepra Experts devienne un instrument d\'excellence. Que ses conseils apportent clarté et transformation. Que ses missions créent de la valeur réelle. Que ses études éclairent les décideurs.'),
    spacer(),
    ritualInvocation('Que ses partenariats soient solides. Que ses contrats soient justes. Que ses clients soient satisfaits. Que sa réputation repose sur la compétence, l\'intégrité, la qualité et le service.'),
    spacer(),
    subSectionHeading('Déclaration d\'Abondance'),
    spacer(),
    instructionBox('L\'Opérateur change légèrement de tonalité — de la fondation de l\'Excellence à l\'attraction de la Prospérité.'),
    spacer(),
    ritualInvocation('Que les ressources nécessaires à sa mission soient attirées par la valeur créée. Que la prospérité découle du mérite, du travail, de la sagesse et de la faveur divine.'),
    spacer(),
    bodyText('Ces deux déclarations sont indissociables : l\'Excellence attire la Prospérité, et la Prospérité finance l\'Excellence. C\'est le cercle vertueux que ce Rituel programme dans la Matrice de KHEPRA EXPERTS. La valeur créée pour les clients est la source de toute abondance légitime.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── IX. ENGAGEMENT PERSONNEL ─────────────────────────────────────────────────
function sectionIXEngagement(): Paragraph[] {
  return [
    sectionHeading('IX. ENGAGEMENT PERSONNEL'),
    spacer(),
    bodyText('Aucune opération théurgique n\'est complète sans l\'engagement personnel de l\'Opérateur. Les forces invoquées répondent à la Qualité de l\'Âme qui les appelle. L\'Engagement Personnel est le contrat que l\'Opérateur signe avec les Forces qu\'il a convoquées.'),
    spacer(),
    instructionBox('L\'Opérateur se tient debout, la main droite sur le cœur, la main gauche toujours posée sur l\'autel. Il parle avec une sincérité absolue, car ces mots sont entendus par les Intelligences invoquées.'),
    spacer(),
    subSectionHeading('Les Quatre Engagements'),
    spacer(),
    ritualInvocation('Je m\'engage à agir avec honnêteté.'),
    spacer(),
    bodyText('L\'Honnêteté est la Pierre Angulaire. Sans elle, l\'Édifice s\'effondre. Cet engagement couvre l\'honnêteté intellectuelle (ne pas prétendre savoir ce qu\'on ignore), l\'honnêteté commerciale (ne pas surfacturer, ne pas tromper), et l\'honnêteté envers soi-même (reconnaître ses limites et chercher à les dépasser).'),
    spacer(),
    ritualInvocation('Je m\'engage à rechercher l\'excellence.'),
    spacer(),
    bodyText('L\'Excellence n\'est pas un état, mais un mouvement perpétuel. Cet engagement signifie : refuser la médiocrité, toujours viser le plus haut niveau de qualité, se former continuellement, et traiter chaque mission — même la plus modeste — avec le même soin qu\'un mandat d\'envergure.'),
    spacer(),
    ritualInvocation('Je m\'engage à respecter mes engagements.'),
    spacer(),
    bodyText('C\'est le Verrou de Ma\'ât. La Parole donnée est Sacrée. Cet engagement signifie : honorer les délais, tenir les promesses faites aux clients, respecter les accords signés, et ne jamais s\'engager sur ce qu\'on ne peut accomplir.'),
    spacer(),
    ritualInvocation('Je m\'engage à servir avec compétence et responsabilité.'),
    spacer(),
    bodyText('Le Service est la finalité de toute Entreprise. La Compétence en est le moyen, la Responsabilité en est le cadre. Cet engagement signifie : placer l\'intérêt du client au centre, agir avec la rigueur d\'un Expert, et assumer la responsabilité pleine et entière de ses actes professionnels.'),
    spacer(),
    goldDivider(),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── X. CLÔTURE ───────────────────────────────────────────────────────────────
function sectionXCloture(): Paragraph[] {
  return [
    sectionHeading('X. CLÔTURE'),
    spacer(),
    bodyText('La Clôture est aussi importante que l\'Ouverture. Elle libère les Forces invoquées, scelle l\'Œuvre accomplie, et ramène l\'Opérateur à l\'état de conscience ordinaire tout en maintenant les effets du Rituel dans la Matière.'),
    spacer(),
    subSectionHeading('Formule de Paix'),
    spacer(),
    instructionBox('L\'Opérateur lève la Coupe d\'eau consacrée à hauteur du cœur. Il visualise les Forces qu\'il a invoquées — Anges, Ancêtres, Maîtres Cosmiques — s\'élevant doucement et retournant à leurs Demeures respectives, emportant avec elles les Sceaux posés sur KHEPRA EXPERTS.'),
    spacer(),
    ritualInvocation('Que la paix demeure dans ce lieu. Que la sagesse guide mes décisions. Que la lumière accompagne mes travaux.'),
    spacer(),
    ritualInvocation('Que Khepra Experts prospère selon la Justice, la Vérité et le Bien.'),
    spacer(),
    subSectionHeading('Extinction des Lumières'),
    spacer(),
    instructionBox('L\'Opérateur éteint les luminaires dans l\'ordre inverse de leur allumage. D\'abord l\'Ouest (Beauté), puis le Midi (Force), enfin l\'Est (Sagesse). Il laisse la lampe à huile centrale se consumer encore quelques instants — la Flamme Perpétuelle s\'éteint d\'elle-même quand l\'Œuvre est scellée.'),
    spacer(),
    subSectionHeading('Sceau Final'),
    spacer(),
    ritualInvocation('L\'œuvre est consacrée. Que tout s\'accomplisse selon la Volonté Divine.'),
    spacer(),
    goldDivider(),
    spacer(),
    boldCentered('FIN DU RITUEL', 26),
    spacer(),
    latinFormula('SCIRE · VELLE · AUDERE · TACERE'),
    latinFormula('KHEPER-RA EM TA — Sous le Sceau du 93'),
    spacer(),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Document Rituel Confidentiel — Réservé à l\'Usage Interne de KHEPRA EXPERTS',
          size: 18,
          color: GRAY,
          font: 'Garamond',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 40 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Hermeneia KOS — Système de Capitalisation Rituelle',
          size: 18,
          color: GOLD,
          font: 'Garamond',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 40 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Généré par KHEPRA EXPERTS — Tous droits réservés',
          size: 16,
          color: GRAY,
          font: 'Garamond',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 0 },
    }),
  ];
}

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────
export async function generateHermeneiaRituel(): Promise<Blob> {
  const doc = new Document({
    creator: 'KHEPRA EXPERTS — Hermeneia KOS',
    title: 'KHEPER-RA EM TA — Rituel Majeur de Consécration et de Développement de Khepra Experts',
    description: 'Rituel Majeur de Consécration pour la vitalisation, la souveraineté économique et l\'établissement triomphant de Khepra Experts — Hermeneia KOS',
    subject: 'Rituel Sacré — Consécration — Développement — Khepra Experts',
    keywords: 'KHEPER-RA, Hermeneia, Khepra Experts, Rituel, Consécration, Khepri, Maât, Thoth, Sceau du 93',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1.1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1.3),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'KHEPER-RA EM TA — Rituel Majeur de Consécration — Hermeneia KOS',
                    size: 16,
                    color: GOLD,
                    font: 'Garamond',
                    italics: true,
                  }),
                ],
                border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: GOLD } },
                spacing: { after: 80 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'KHEPRA EXPERTS — Hermeneia KOS — Document Rituel Confidentiel    |    Page ',
                    size: 16,
                    color: GOLD,
                    font: 'Garamond',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: GOLD,
                    font: 'Garamond',
                  }),
                ],
                border: { top: { style: BorderStyle.SINGLE, size: 1, color: GOLD } },
                spacing: { before: 80 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: [
          ...coverPage(),
          ...intentionSection(),
          ...sectionIPreparation(),
          ...sectionIIOuverture(),
          ...sectionIIIDirections(),
          ...sectionIVAnges(),
          ...sectionVAchaiah(),
          ...sectionVILibation(),
          ...sectionVIIConclave(),
          ...sectionVIIIOperation(),
          ...sectionIXEngagement(),
          ...sectionXCloture(),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}



