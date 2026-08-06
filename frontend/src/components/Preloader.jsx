import React, { useEffect, useState } from 'react';

const keyframes = `
  @keyframes bounceSmooth {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-14px); }
  }
  @keyframes shadowPulse {
    0%, 100% { transform: scaleX(1); opacity: 0.3; }
    50% { transform: scaleX(0.55); opacity: 0.1; }
  }
  @keyframes cloudDrift {
    0%, 100% { transform: translateX(0px); }
    50%       { transform: translateX(6px); }
  }
  @keyframes cloudDrift2 {
    0%, 100% { transform: translateX(0px); }
    50%       { transform: translateX(-5px); }
  }
  @keyframes sunPulse {
    0%, 100% { opacity: 0.95; }
    50%       { opacity: 1; }
  }
  @keyframes wShimmer {
    0%, 100% { fill: #B8D9F0; opacity: 0.85; }
    50%       { fill: #D4ECFF; opacity: 1; }
  }
  @keyframes wShimmer2 {
    0%, 100% { fill: #C8E3F5; opacity: 0.9; }
    50%       { fill: #A8CEE8; opacity: 0.7; }
  }
  @keyframes flagWave {
    0%, 100% { transform: skewX(0deg); }
    50%       { transform: skewX(-8deg); }
  }
`;

function BuildingAnimation() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 130"
      className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40"
      aria-label="Building animation"
    >
      <circle cx="60" cy="72" r="54" fill="#EAF4FB" opacity="0.7" />

      {/* CRANE */}
      <g
        style={{
          animation: "craneSwing 3s ease-in-out infinite",
          transformOrigin: "50px 28px",
        }}
      >
        <rect x="49" y="18" width="3" height="28" rx="1" fill="#E07B39" />
        <rect x="28" y="18" width="44" height="3" rx="1" fill="#E07B39" />
        <rect x="26" y="17" width="8" height="6" rx="1" fill="#C5621A" />

        <g
          style={{
            animation: "cableSwing 3s ease-in-out infinite",
            transformOrigin: "69px 21px",
          }}
        >
          <line
            x1="69"
            y1="21"
            x2="69"
            y2="34"
            stroke="#999"
            strokeWidth="1"
            strokeDasharray="2,1"
          />
          <rect x="65" y="34" width="8" height="5" rx="1" fill="#888" />
        </g>
      </g>

      {/* MAIN BUILDING */}
      <rect x="30" y="44" width="40" height="62" rx="2" fill="#C9D8E8" />
      <rect x="31" y="45" width="38" height="60" rx="1" fill="#D6E4F0" />
      <rect x="28" y="42" width="44" height="4" rx="1" fill="#B0C4D8" />

      {/* WINDOWS */}
      <rect
        x="35"
        y="51"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowGlow 2.1s ease-in-out infinite" }}
      />
      <rect
        x="47"
        y="51"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowOff 1s infinite" }}
      />
      <rect
        x="59"
        y="51"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowGlow 2.7s ease-in-out infinite 0.4s" }}
      />

      <rect
        x="35"
        y="62"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowOff 1s infinite" }}
      />
      <rect
        x="47"
        y="62"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowGlow 1.9s ease-in-out infinite 0.8s" }}
      />
      <rect
        x="59"
        y="62"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowGlow 2.3s ease-in-out infinite 0.2s" }}
      />

      <rect
        x="35"
        y="73"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowGlow 2.5s ease-in-out infinite 0.6s" }}
      />
      <rect
        x="47"
        y="73"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowOff 1s infinite" }}
      />
      <rect
        x="59"
        y="73"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowGlow 1.8s ease-in-out infinite 1s" }}
      />

      <rect
        x="35"
        y="84"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowGlow 2.2s ease-in-out infinite 0.3s" }}
      />
      <rect
        x="47"
        y="84"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowGlow 2.6s ease-in-out infinite 0.7s" }}
      />
      <rect
        x="59"
        y="84"
        width="8"
        height="6"
        rx="1"
        style={{ animation: "windowOff 1s infinite" }}
      />

      {/* DOOR */}
      <rect x="45" y="96" width="10" height="10" rx="1" fill="#8AABCC" />
      <rect x="46" y="97" width="4" height="9" rx="0.5" fill="#7097BB" />
      <rect x="51" y="97" width="4" height="9" rx="0.5" fill="#7097BB" />

      {/* LEFT BUILDING */}
      <rect x="10" y="70" width="22" height="36" rx="2" fill="#C2D5A8" />
      <rect x="11" y="71" width="20" height="34" rx="1" fill="#CDDDB4" />
      <rect x="9" y="68" width="24" height="4" rx="1" fill="#A8BF8F" />

      <rect
        x="14"
        y="76"
        width="6"
        height="5"
        rx="1"
        style={{ animation: "windowGlow 2.4s ease-in-out infinite 0.5s" }}
      />
      <rect
        x="23"
        y="76"
        width="6"
        height="5"
        rx="1"
        style={{ animation: "windowOff 1s infinite" }}
      />

      <rect
        x="14"
        y="86"
        width="6"
        height="5"
        rx="1"
        style={{ animation: "windowOff 1s infinite" }}
      />
      <rect
        x="23"
        y="86"
        width="6"
        height="5"
        rx="1"
        style={{ animation: "windowGlow 2s ease-in-out infinite 0.9s" }}
      />

      <rect x="16" y="96" width="8" height="10" rx="1" fill="#8FA87A" />

      {/* RIGHT BUILDING */}
      <rect x="88" y="78" width="20" height="28" rx="2" fill="#D4BFDB" />
      <rect x="89" y="79" width="18" height="26" rx="1" fill="#DCCAE2" />
      <rect x="87" y="76" width="22" height="4" rx="1" fill="#BFA8C7" />

      <rect
        x="91"
        y="83"
        width="6"
        height="5"
        rx="1"
        style={{ animation: "windowGlow 2.8s ease-in-out infinite 0.1s" }}
      />
      <rect
        x="100"
        y="83"
        width="5"
        height="5"
        rx="1"
        style={{ animation: "windowOff 1s infinite" }}
      />

      <rect
        x="91"
        y="93"
        width="6"
        height="5"
        rx="1"
        style={{ animation: "windowOff 1s infinite" }}
      />
      <rect
        x="100"
        y="93"
        width="5"
        height="5"
        rx="1"
        style={{ animation: "windowGlow 2.1s ease-in-out infinite 0.6s" }}
      />

      <rect x="93" y="98" width="12" height="8" rx="1" fill="#B89FC4" />

      {/* GROUND */}
      <rect
        x="6"
        y="106"
        width="108"
        height="3"
        rx="1.5"
        fill="#B0BCC4"
        opacity="0.6"
      />

      <circle cx="20" cy="104" r="4" fill="#6FB86B" />
      <rect x="19" y="104" width="2" height="4" fill="#7A5C3A" />

      <circle cx="100" cy="104" r="3.5" fill="#6FB86B" />
      <rect x="99" y="104" width="2" height="3" fill="#7A5C3A" />
    </svg>
  );
}

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(t);
    }
  }, [loading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF9E5] transition-all duration-700 ease-in-out ${
        loading ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
      }`}
    >
     <style>{`
  @keyframes bounceSmooth {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes shadowPulse {
    0%, 100% { transform: scaleX(1); opacity: 0.4; }
    50% { transform: scaleX(0.6); opacity: 0.15; }
  }

  @keyframes windowGlow {
    0%, 100% { fill: #FFD966; }
    50% { fill: #FFBE33; }
  }

  @keyframes windowOff {
    0%, 100% {
      fill: #B8C4CC;
      opacity: 0.5;
    }
  }

  @keyframes craneSwing {
    0%, 100% { transform: rotate(-4deg); }
    50% { transform: rotate(4deg); }
  }

  @keyframes cableSwing {
    0%, 100% { transform: rotate(-4deg); }
    50% { transform: rotate(4deg); }
  }
`}</style>

      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className="relative flex items-center justify-center"
          style={{ animation: 'bounceSmooth 2.2s ease-in-out infinite' }}
        >
          <BuildingAnimation />
          <div
            className="absolute -bottom-1 w-16 h-1.5 sm:w-20 sm:h-2 bg-black/10 rounded-full blur-[5px]"
            style={{ animation: 'shadowPulse 2.2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </div>
  );
}
