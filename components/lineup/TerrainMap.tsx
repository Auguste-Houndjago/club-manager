import React from 'react';

const FootballFieldBackground = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="30 30 990 620" /* padding */
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1050" height="680" fill="#2d8a2d" />

      {/* Field lines */}
      <g stroke="rgba(255,255,255,0.8)" strokeWidth="4" fill="none">
        {/* Outer border */}
        <rect x="50" y="50" width="950" height="580" />

        {/* Center line */}
        <line x1="525" y1="50" x2="525" y2="630" />

        {/* Center circle */}
        <circle cx="525" cy="340" r="50.5" />
        <circle cx="525" cy="340" r="2" fill="rgba(255,255,255,0.3)" />

        {/* Penalty areas */}
        <rect x="50" y="195" width="165" height="290" opacity="0.5" />
        <rect x="835" y="195" width="165" height="290" opacity="0.5"  />

        {/* Goal areas */}
        <rect x="50" y="255" width="55" height="170" />
        <rect x="945" y="255" width="55" height="170" />

        {/* Corner arcs */}
        <path d="M50,80 A30,30 0 0,1 80,50" />
        <path d="M970,50 A30,30 0 0,1 1000,80" />
        <path d="M50,600 A30,30 0 0,0 80,630" />
        <path d="M970,630 A30,30 0 0,0 1000,600" />

        {/* Additional vertical lines */}
        {/* Leftmost */}
        <line x1="275" y1="50" x2="275" y2="630" strokeDasharray="4 4" />
        {/* Rightmost */}
        <line x1="775" y1="50" x2="775" y2="630" strokeDasharray="4 4" />
        {/* Closer to center (new lines) */}
        <line x1="375" y1="50" x2="375" y2="630" strokeDasharray="4 4" />
        <line x1="675" y1="50" x2="675" y2="630" strokeDasharray="4 4" />
      </g>

      {/* Field texture */}
      <pattern id="grass" patternUnits="userSpaceOnUse" width="40" height="40">
        <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      </pattern>
      <rect width="1050" height="680" fill="url(#grass)" />
    </svg>
  );
};

export default FootballFieldBackground;
