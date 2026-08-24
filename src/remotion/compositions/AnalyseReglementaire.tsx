import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import type { BriefVideo } from '';
import { IntroKhepra } from '';
import { LowerThird } from '';
import { OutroCTA } from '';

interface AnalyseReglementaireProps {
  brief: BriefVideo;
}

export const AnalyseReglementaire: React.FC<AnalyseReglementaireProps> = ({ brief }) => {
  const { fps } = useVideoConfig();

  const introDurationFrames = 3 * fps;
  const outroDurationFrames = 5 * fps;

  let currentFrame = introDurationFrames;

  const pointSequences = brief.points_cles.map((point, i) => {
    const durationFrames = point.duree_sec * fps;
    const from = currentFrame;
    currentFrame += durationFrames;
    return { point, from, durationFrames, key: i };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A192F' }}>
      {/* 1. Intro Khepra — 3 secondes */}
      <Sequence durationInFrames={introDurationFrames}>
        <IntroKhepra titre={brief.titre} regulateur={brief.regulateur} />
      </Sequence>

      {/* 2. Points clés avec LowerThird citation */}
      {pointSequences.map(({ point, from, durationFrames, key }) => (
        <Sequence key={key} from={from} durationInFrames={durationFrames}>
          <AbsoluteFill
            style={{
              justifyContent: 'center',
              padding: '100px 120px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
            <h1
              style={{
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: '85%',
                letterSpacing: '-0.02em',
              }}
            >
              {point.texte}
            </h1>
          </AbsoluteFill>
          <LowerThird citation={point.citation} />
        </Sequence>
      ))}

      {/* 3. Outro CTA — 5 secondes */}
      <Sequence from={currentFrame} durationInFrames={outroDurationFrames}>
        <OutroCTA url={brief.cta_url} texte={brief.cta_texte} />
      </Sequence>
    </AbsoluteFill>
  );
};



