import { Composition } from 'remotion';
import { AnalyseReglementaire } from '';
import type { BriefVideo } from '';

const DEFAULT_BRIEF: BriefVideo = {
  id: 'demo-001',
  titre: 'Alerte BCEAO 007-2026 : Nouveau Cadre KYC',
  hook: 'La BCEAO durcit les règles LBC-FT. Voici ce qui change pour vous.',
  points_cles: [
    {
      texte: 'La mise à jour du profil client devient annuelle et obligatoire',
      citation: {
        regulateur: 'BCEAO',
        reference: 'Instruction N°007-06-2026',
        article: 'Article 12 — Devoir de vigilance',
        url: 'https://bceao.int/',
      },
      duree_sec: 8,
    },
    {
      texte: 'Le seuil de déclaration de soupçon passe à 5 millions FCFA',
      citation: {
        regulateur: 'BCEAO',
        reference: 'Instruction N°007-06-2026',
        article: 'Article 18 — Déclaration de soupçon',
        url: 'https://bceao.int/',
      },
      duree_sec: 8,
    },
    {
      texte: 'Les bénéficiaires effectifs doivent être identifiés et vérifiés',
      citation: {
        regulateur: 'BCEAO',
        reference: 'Instruction N°007-06-2026',
        article: 'Article 25 — Bénéficiaires effectifs',
        url: 'https://bceao.int/',
      },
      duree_sec: 8,
    },
    {
      texte: 'Renforcement des sanctions en cas de non-conformité',
      citation: {
        regulateur: 'BCEAO',
        reference: 'Instruction N°007-06-2026',
        article: 'Article 42 — Régime disciplinaire',
        url: 'https://bceao.int/',
      },
      duree_sec: 8,
    },
  ],
  cta_url: 'khepraexperts.com/notes/bceao-007-2026',
  cta_texte: 'Téléchargez la note d\'analyse complète sur khepraexperts.com',
  regulateur: 'BCEAO',
  regulateur_logo: 'bceao.png',
};

// Durée totale: 3s intro + (4 × 8s points) + 5s outro = 40s → 1200 frames @30fps
const TOTAL_DURATION_FRAMES = 1200;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AnalyseReglementaire"
        component={AnalyseReglementaire}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          brief: DEFAULT_BRIEF,
        }}
      />
    </>
  );
};



