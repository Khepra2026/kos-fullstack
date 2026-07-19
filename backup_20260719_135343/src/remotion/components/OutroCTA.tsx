import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface OutroCTAProps {
  url: string;
  texte: string;
}

export const OutroCTA: React.FC<OutroCTAProps> = ({ url, texte }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ fps, frame, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const ctaEntrance = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 150 } });
  const ctaOpacity = interpolate(ctaEntrance, [0, 1], [0, 1]);
  const ctaY = interpolate(ctaEntrance, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A192F 0%, #112240 50%, #0A192F 100%)',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <h2
        style={{
          color: '#FFFFFF',
          fontFamily: 'var(--font-heading), Montserrat, sans-serif',
          fontSize: 48,
          fontWeight: 700,
          margin: 0,
          textAlign: 'center',
          letterSpacing: '-0.03em',
        }}
      >
        Téléchargez l&apos;analyse complète
      </h2>

      <p
        style={{
          color: '#8892B0',
          fontFamily: 'var(--font-body), Inter, sans-serif',
          fontSize: 22,
          marginTop: 16,
          textAlign: 'center',
        }}
      >
        {texte}
      </p>

      <div
        style={{
          marginTop: 48,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #D4AF37 100%)',
            color: '#0A192F',
            fontFamily: 'var(--font-label), Inter, sans-serif',
            fontSize: 24,
            fontWeight: 700,
            padding: '16px 40px',
            borderRadius: 50,
            letterSpacing: '0.02em',
          }}
        >
          {url.replace(/^https?:\/\//, '')}
        </span>
      </div>

      <p
        style={{
          position: 'absolute',
          bottom: 80,
          color: '#8892B0',
          fontFamily: 'var(--font-body), Inter, sans-serif',
          fontSize: 16,
          margin: 0,
        }}
      >
        KHEPRA EXPERTS — Intelligence Réglementaire Africaine
      </p>
    </div>
  );
};



