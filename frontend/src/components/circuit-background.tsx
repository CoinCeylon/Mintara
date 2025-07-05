"use client";

export default function CircuitBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1000]">
      {/* Circuit board pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
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

            {/* Circuit nodes */}
            <circle cx="20" cy="20" r="2" fill="#11B55F" opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="80" cy="80" r="2" fill="#09302E" opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="80" cy="20" r="1.5" fill="#1D5047" opacity="0.4">
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="20" cy="80" r="1.5" fill="#1D5047" opacity="0.4">
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Animated data streams */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#11B55F] to-transparent opacity-30"
            style={{
              width: "100%",
              top: `${20 + i * 20}%`,
              animation: `dataStream ${3 + i}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes dataStream {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
