import { useEffect, useState } from "react";

export const GoldParticleLoader = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF5D9]">
      <div className="relative w-20 h-20 mb-4">
        {/* Animated gold particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-[#FFB600] opacity-70"
            style={{
              top: `${Math.sin(i * 1.2) * 30 + 35}px`,
              left: `${Math.cos(i * 1.2) * 30 + 35}px`,
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <p className="text-[#815C00] font-medium">Loading{".".repeat(dots)}</p>
      <style>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
