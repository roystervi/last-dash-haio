import { useState, useEffect, useRef } from "react";

export function useAudioLevel() {
  const [audioLevel, setAudioLevel] = useState(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    // Simulate audio level with smooth animation
    function animate() {
      const time = Date.now() * 0.003;
      const level = (Math.sin(time) * 0.3 + Math.sin(time * 1.7) * 0.2 + Math.sin(time * 2.3) * 0.15) * 0.5 + 0.5;
      setAudioLevel(Math.max(0, Math.min(1, level)));
      
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return audioLevel;
}
