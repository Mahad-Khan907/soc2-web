import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedConnectionProps {
  isActive?: boolean;
  direction?: "horizontal" | "vertical";
  className?: string;
}

export const AnimatedConnection = ({
  isActive = false,
  direction = "horizontal",
  className,
}: AnimatedConnectionProps) => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setParticles((prev) => {
          const newParticles = [...prev];
          newParticles.push(Date.now());
          // Remove particles older than animation duration
          return newParticles.filter((p) => Date.now() - p < 2000);
        });
      }, 400);

      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  return (
    <div
      className={cn(
        "relative",
        direction === "horizontal"
          ? "h-0.5 w-12 sm:w-16 md:w-24 lg:w-32 xl:w-40" // responsive widths
          : "w-0.5 h-12 sm:h-16 md:h-24 lg:h-32 xl:h-40", // responsive heights
        className
      )}
    >
      {/* Base line */}
      <div
        className={cn(
          "absolute bg-border transition-colors duration-300",
          "w-full h-full",
          isActive && "bg-primary/60"
        )}
      />

      {/* Dotted overlay */}
      <div
        className={cn(
          "absolute border-dotted border-primary/40",
          direction === "horizontal"
            ? "w-full border-t-2 top-0"
            : "h-full border-l-2 left-0"
        )}
      />

      {/* Animated particles */}
      {particles.map((id) => (
        <div
          key={id}
          className={cn(
            "absolute w-2 h-2 bg-primary rounded-full shadow-glow animate-pulse"
          )}
          style={{
            [direction === "horizontal" ? "left" : "top"]: "-4px",
            [direction === "horizontal" ? "top" : "left"]: "-3px",
            animation:
              direction === "horizontal"
                ? "flowHorizontal 2s linear forwards"
                : "flowVertical 2s linear forwards",
          }}
        />
      ))}

      <style>{`
        @keyframes flowHorizontal {
          from {
            transform: translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes flowVertical {
          from {
            transform: translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
