import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import type { SourceCitation } from '';
import { REGULATOR_COLORS } from '';

interface LowerThirdProps {
  citation: SourceCitation;
}

export const LowerThird: React.FC<LowerThirdProps> = ({ citation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ fps, frame, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const y = interpolate(entrance, [0, 1], [60, 0]);
  const accentColor = REGULATOR_COLORS[citation.regulateur] || '#D4AF37';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 120,
        left: 80,
        opacity,
        transform: `translateY(${y}px)`,
        background: 'rgba(10, 25, 47, 0.92)',
        backdropFilter: 'blur(12px)',
        padding: '16px 28px',
        borderLeft: `5px solid ${accentColor}`,
        borderRadius: '0 8px 8px 0',
        maxWidth: '85%',
      }}
    >
      <p
        style={{
          color: '#FFFFFF',
          fontFamily: 'var(--font-heading), Inter, sans-serif',
          fontSize: 26,
          margin: 0,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        {citation.regulateur} {citation.reference}
      </p>
      <p
        style={{
          color: accentColor,
          fontFamily: 'var(--font-body), Inter, sans-serif',
          fontSize: 22,
          margin: '4px 0 0 0',
          fontWeight: 500,
        }}
      >
        {citation.article}
      </p>
    </div>
  );
};



