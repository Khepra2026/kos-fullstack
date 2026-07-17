import { useRef } from 'react';

/**
 * HoneypotField — Champ anti-bot invisible
 * ─────────────────────────────────────────
 * Input masqué aux utilisateurs humains mais visible aux bots.
 * Les bots remplissent automatiquement ce champ, ce qui permet
 * de les détecter et bloquer la soumission.
 *
 * Usage : <HoneypotField inputRef={ref} />
 */

interface HoneypotFieldProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function HoneypotField({ inputRef }: HoneypotFieldProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = inputRef || internalRef;

  return (
    <div
      className="absolute opacity-0 pointer-events-none overflow-hidden"
      style={{ left: 0, top: 0, width: 1, height: 1, zIndex: -1 }}
      aria-hidden="true"
    >
      <input
        ref={ref}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        className="w-px h-px p-0 m-0 border-0"
        aria-hidden="true"
        onChange={() => {
          // Détection immédiate côté client (optionnel)
        }}
      />
    </div>
  );
}

export default HoneypotField;