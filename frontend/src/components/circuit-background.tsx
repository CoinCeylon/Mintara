"use client";

import { useState, useEffect } from "react";

export default function CircuitBackground() {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchNodes, setGlitchNodes] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setGlitchNodes((prev) => [
          ...prev.slice(-20), // Keep only last 20 nodes
          {
            x: Math.random() * 100,
            y: Math.random() * 100,
            id: Date.now() + Math.random(),
          },
        ]);
      }, 100);

      return () => clearInterval(interval);
    } else {
      setGlitchNodes([]);
    }
  }, [isHovered]);

  return (
    <div
      className="fixed md:hidden inset-0 overflow-hidden pointer-events-none z-[-1000]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ pointerEvents: "auto" }}
    >
      {/* Circuit board pattern */}
      <svg
        className={`absolute inset-0 w-full h-full transition-all duration-300 ${
          isHovered ? "opacity-20 scale-105" : "opacity-10"
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <line
              x1="0"
              y1="20"
              x2="100"
              y2="20"
              stroke="#11B55F"
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="0"
              y1="60"
              x2="100"
              y2="60"
              stroke="#11B55F"
              strokeWidth="1"
              opacity="0.2"
            />
            {/* Vertical lines */}
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="100"
              stroke="#11B55F"
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="60"
              y1="0"
              x2="60"
              y2="100"
              stroke="#11B55F"
              strokeWidth="1"
              opacity="0.2"
            />
            {/* Diagonal connections */}
            <line
              x1="20"
              y1="20"
              x2="60"
              y2="60"
              stroke="#1D5047"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <line
              x1="60"
              y1="20"
              x2="20"
              y2="60"
              stroke="#1D5047"
              strokeWidth="0.5"
              opacity="0.3"
            />
            {/* Circuit nodes */}
            <circle cx="20" cy="20" r="2" fill="#11B55F" opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur={isHovered ? "0.5s" : "3s"}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="80" cy="80" r="2" fill="#09302E" opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur={isHovered ? "0.3s" : "4s"}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="80" cy="20" r="1.5" fill="#1D5047" opacity="0.4">
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur={isHovered ? "0.2s" : "2s"}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="20" cy="80" r="1.5" fill="#1D5047" opacity="0.4">
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur={isHovered ? "0.4s" : "5s"}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="60" cy="60" r="1" fill="#11B55F" opacity="0.3">
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur={isHovered ? "0.1s" : "3.5s"}
                repeatCount="indefinite"
              />
            </circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Horizontal data streams */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className={`absolute h-px bg-gradient-to-r from-transparent via-[#11B55F] to-transparent transition-all duration-300 ${
              isHovered ? "opacity-60" : "opacity-30"
            }`}
            style={{
              width: "100%",
              top: `${10 + i * 12}%`,
              animation: `dataStreamHorizontal ${
                isHovered ? 0.5 + i * 0.1 : 3 + i
              }s linear infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Vertical data streams */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`vertical-${i}`}
            className={`absolute w-px bg-gradient-to-b from-transparent via-[#1D5047] to-transparent transition-all duration-300 ${
              isHovered ? "opacity-50" : "opacity-20"
            }`}
            style={{
              height: "100%",
              left: `${15 + i * 15}%`,
              animation: `dataStreamVertical ${
                isHovered ? 0.8 + i * 0.1 : 4 + i * 0.5
              }s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Diagonal streams */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`diagonal-${i}`}
            className={`absolute bg-gradient-to-br from-transparent via-[#09302E] to-transparent transition-all duration-300 ${
              isHovered ? "opacity-40" : "opacity-15"
            }`}
            style={{
              width: "141%", // sqrt(2) * 100% to cover diagonal
              height: "1px",
              top: `${20 + i * 20}%`,
              left: "-20%",
              transform: "rotate(45deg)",
              transformOrigin: "center",
              animation: `dataStreamDiagonal ${
                isHovered ? 1 + i * 0.2 : 5 + i
              }s linear infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Glitch nodes on hover */}
      {isHovered &&
        glitchNodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-1 h-1 bg-[#11B55F] rounded-full animate-pulse"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              animation: `glitchNode 0.5s ease-out forwards`,
            }}
          />
        ))}

      {/* Chaotic lines on hover */}
      {isHovered && (
        <svg className="absolute inset-0 w-full h-full opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`chaos-${i}`}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="#11B55F"
              strokeWidth="0.5"
              opacity="0.4"
              style={{
                animation: `chaosLine ${
                  0.5 + Math.random()
                }s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </svg>
      )}

      <style jsx>{`
        @keyframes dataStreamHorizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes dataStreamVertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes dataStreamDiagonal {
          0% {
            transform: rotate(45deg) translateX(-100%);
          }
          100% {
            transform: rotate(45deg) translateX(100%);
          }
        }

        @keyframes glitchNode {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }

        @keyframes chaosLine {
          0% {
            opacity: 0.1;
            stroke-dasharray: 0, 10;
          }
          50% {
            opacity: 0.6;
            stroke-dasharray: 5, 5;
          }
          100% {
            opacity: 0.2;
            stroke-dasharray: 10, 0;
          }
        }
      `}</style>
    </div>
  );
}
