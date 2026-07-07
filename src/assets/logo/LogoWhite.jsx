import React from 'react';

const LogoWhite = ({ className = "h-14 w-auto", ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 380" 
      className={className} 
      {...props}
    >
      <defs>
        {/* Gradients and Styles */}
        <linearGradient id="logoWhiteGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD166" />
          <stop offset="100%" stopColor="#C6922E" />
        </linearGradient>
      </defs>

      {/* Symbol Group */}
      <g transform="translate(0, 5)">
        {/* 1. The Serif Number '1' (White) */}
        <path 
          d="M 170 170 L 210 170 L 210 163 L 194 163 L 194 68 L 150 84 L 150 96 L 170 88 L 170 163 L 155 163 Z" 
          fill="#FFFFFF" 
        />

        {/* 2. The Door Frame (White, behind open door) */}
        <path 
          d="M 215 67 L 315 67 L 315 160 L 215 160" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="6" 
          strokeLinejoin="miter" 
        />

        {/* 3. The Open Door (Gold, perspective tilt) */}
        <polygon 
          points="215,67 265,77 265,165 215,170" 
          fill="url(#logoWhiteGold)" 
        />
        
        {/* Door Knob (White dot) */}
        <circle cx="256" cy="120" r="2.5" fill="#FFFFFF" />

        {/* 4. Stylized Figure reaching up (White) */}
        <circle cx="282" cy="115" r="7" fill="#FFFFFF" />
        <path 
          d="M 268 156 C 274 146 284 135 275 128 C 280 127 285 124 288 118 C 294 110 299 104 304 111 C 298 124 295 140 268 156 Z" 
          fill="#FFFFFF" 
        />

        {/* 5. Gold Star */}
        <polygon 
          points="306,93 308,97 312,97 309,100 310,104 306,101 302,104 304,100 301,97 305,97" 
          fill="url(#logoWhiteGold)" 
        />

        {/* 6. Curved path ground (Light white-gray) */}
        <path 
          d="M 222 169 C 255 160 285 160 325 167" 
          fill="none" 
          stroke="#E2E8F0" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />
      </g>

      {/* Typography Stack */}
      {/* 1. FIRST DOOR */}
      <text 
        x="250" 
        y="235" 
        textAnchor="middle" 
        className="font-headings font-extrabold text-[42px]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 }}
      >
        <tspan fill="#FFFFFF">FIRST </tspan>
        <tspan fill="#C6922E">DOOR</tspan>
      </text>

      {/* 2. HR SOLUTIONS flanked by thin gold lines */}
      <g>
        {/* Left Line */}
        <line x1="60" y1="272" x2="160" y2="272" stroke="#C6922E" strokeWidth="1.5" />
        
        {/* Text */}
        <text 
          x="250" 
          y="278" 
          textAnchor="middle" 
          fill="#FFFFFF" 
          className="font-body font-bold text-[18px] tracking-[8px]"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
        >
          HR SOLUTIONS
        </text>
        
        {/* Right Line */}
        <line x1="340" y1="272" x2="440" y2="272" stroke="#C6922E" strokeWidth="1.5" />
      </g>

      {/* 3. WHERE POTENTIAL FINDS PURPOSE tagline flanked by thin gold lines */}
      <g>
        {/* Left Line */}
        <line x1="60" y1="316" x2="110" y2="316" stroke="#C6922E" strokeWidth="1" />
        
        {/* Text */}
        <text 
          x="250" 
          y="320" 
          textAnchor="middle" 
          fill="#FFFFFF" 
          className="font-body font-semibold text-[10px] tracking-[4.5px]"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          WHERE POTENTIAL FINDS PURPOSE
        </text>
        
        {/* Right Line */}
        <line x1="390" y1="316" x2="440" y2="316" stroke="#C6922E" strokeWidth="1" />
      </g>
    </svg>
  );
};

export default LogoWhite;

