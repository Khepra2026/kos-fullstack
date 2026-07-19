import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { REGULATOR_COLORS } from '';

interface IntroKhepraProps {
  titre: string;
  regulateur: string;
}

export const IntroKhepra: React.FC<IntroKhepraProps> = ({ titre, regulateur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accentColor = REGULATOR_COLORS[regulateur] || '#D4AF37';

  const bgOpacity = interpolate(frame, [0, 15], [0, 1]);
  const logoEntrance = spring({ fps, frame, config: { damping: 200 } });
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);
  const logoY = interpolate(logoEntrance, [0, 1], [-60, 0]);
  const titleEntrance = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 200 } });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [30, 0]);
  const lineWidth = interpolate(frame, [30, 60], [0, 100]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #0A192F 0%, #112240 60%, #0A192F 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: bgOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      <div
        style={{
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}99 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: '#0A192F',
                fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              K
            </span>
          </div>
          <span
            style={{
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading), Montserrat, sans-serif',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            KHEPRA EXPERTS
          </span>
        </div>
      </div>

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
          maxWidth: '85%',
        }}
      >
        <h1
          style={{
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading), Montserrat, sans-serif',
            fontSize: 52,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {titre}
        </h1>

        <div
          style={{
            height: 3,
            margin: '20px auto',
            width: `${lineWidth}%`,
            maxWidth: 300,
            background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
            borderRadius: 2,
          }}
        />

        <span
          style={{
            display: 'inline-block',
            color: accentColor,
            fontFamily: 'var(--font-label), Inter, sans-serif',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '6px 20px',
            border: `1px solid ${accentColor}40`,
            borderRadius: 50,
          }}
        >
          {regulateur}
        </span>
      </div>

      <p
        style={{
          position: 'absolute',
          bottom: 60,
          color: '#8892B0',
          fontFamily: 'var(--font-body), Inter, sans-serif',
          fontSize: 14,
          margin: 0,
        }}
      >
        Intelligence Réglementaire — Analyse Big Four
      </p>
    </div>
  );
};



