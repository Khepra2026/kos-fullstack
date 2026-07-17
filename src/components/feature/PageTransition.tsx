import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

type Direction = "forward" | "backward";
type Stage = "enter" | "exit" | "idle";

// Historique des chemins visités pour détecter la direction
const pathHistory: string[] = [];

function detectDirection(newPath: string, currentPath: string): Direction {
  const currentIndex = pathHistory.lastIndexOf(currentPath);
  const newIndex = pathHistory.lastIndexOf(newPath);

  // Si le nouveau chemin existe déjà dans l'historique avant le courant → retour arrière
  if (newIndex !== -1 && newIndex < currentIndex) {
    return "backward";
  }
  return "forward";
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState<Stage>("idle");
  const [direction, setDirection] = useState<Direction>("forward");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  // Initialiser l'historique avec la première page
  useEffect(() => {
    if (isFirstRender.current) {
      pathHistory.push(location.pathname);
      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      const dir = detectDirection(location.pathname, displayLocation.pathname);
      setDirection(dir);

      // Mettre à jour l'historique
      if (dir === "forward") {
        pathHistory.push(location.pathname);
        // Limiter la taille de l'historique
        if (pathHistory.length > 50) pathHistory.shift();
      }

      setStage("exit");

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setDisplayLocation(location);
        setStage("enter");

        timeoutRef.current = setTimeout(() => {
          setStage("idle");
        }, 300);
      }, 180);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location, displayLocation]);

  const getStyle = (): React.CSSProperties => {
    // Navigation AVANT : glissement de droite vers gauche
    if (direction === "forward") {
      if (stage === "exit") {
        return {
          opacity: 0,
          transform: "translateX(-12px) scale(0.99)",
          transition: "opacity 180ms cubic-bezier(0.4,0,0.2,1), transform 180ms cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        };
      }
      if (stage === "enter") {
        return {
          opacity: 1,
          transform: "translateX(0) scale(1)",
          transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1), transform 300ms cubic-bezier(0.4,0,0.2,1)",
        };
      }
    }

    // Navigation ARRIÈRE : glissement de gauche vers droite
    if (direction === "backward") {
      if (stage === "exit") {
        return {
          opacity: 0,
          transform: "translateX(12px) scale(0.99)",
          transition: "opacity 180ms cubic-bezier(0.4,0,0.2,1), transform 180ms cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
        };
      }
      if (stage === "enter") {
        return {
          opacity: 1,
          transform: "translateX(0) scale(1)",
          transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1), transform 300ms cubic-bezier(0.4,0,0.2,1)",
        };
      }
    }

    // État idle (repos)
    return {
      opacity: 1,
      transform: "translateX(0) scale(1)",
      transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1), transform 300ms cubic-bezier(0.4,0,0.2,1)",
    };
  };

  return (
    <div style={getStyle()}>
      {children}
    </div>
  );
}
