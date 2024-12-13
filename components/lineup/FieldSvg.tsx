export function FootballFieldSVG() {
    return (
      <svg 
        viewBox="0 0 1000 700" 
        className="w-full h-[450px] md:h-[750px]"
      >
        {/* Fond du terrain */}
        <defs>
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2d8a2d' }} />
            <stop offset="100%" style={{ stopColor: '#1f6e1f' }} />
          </linearGradient>
          <pattern id="grassPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <line 
              x1="0" y1="0" x2="0" y2="2" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="2"
            />
          </pattern>
        </defs>
  
        {/* Rectangle principal */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#grassGradient)"
        />
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#grassPattern)"
        />
  
        {/* Lignes du terrain */}
        <g stroke="rgba(255,255,255,0.3)" strokeWidth="4" fill="none">
          {/* Bordure principale */}
          <rect x="20" y="20" width="960" height="660" />
          
          {/* Ligne médiane */}
          <line x1="20" y1="350" x2="980" y2="350" />
          
          {/* Ligne verticale centrale */}
          <line x1="500" y1="20" x2="500" y2="680" />
          
          {/* Rond central */}
          <circle cx="500" cy="350" r="75" />
          <circle cx="500" cy="350" r="5" fill="rgba(255,255,255,0.3)" />
          
          {/* Surfaces de réparation - Haut */}
          <rect x="340" y="20" width="320" height="120" />
          <rect x="400" y="20" width="200" height="60" />
          
          {/* Point de penalty - Haut */}
          <circle cx="500" cy="100" r="3" fill="rgba(255,255,255,0.3)" />
          
          {/* Arc surface de réparation - Haut */}
          <path d="M 400 140 A 60 60 0 0 0 600 140" />
          
          {/* Surfaces de réparation - Bas */}
          <rect x="340" y="560" width="320" height="120" />
          <rect x="400" y="620" width="200" height="60" />
          
          {/* Point de penalty - Bas */}
          <circle cx="500" cy="600" r="3" fill="rgba(255,255,255,0.3)" />
          
          {/* Arc surface de réparation - Bas */}
          <path d="M 400 560 A 60 60 0 0 1 600 560" />
          
          {/* Corners */}
          <path d="M 20 20 A 20 20 0 0 1 40 40" />
          <path d="M 980 20 A 20 20 0 0 0 960 40" />
          <path d="M 20 680 A 20 20 0 0 0 40 660" />
          <path d="M 980 680 A 20 20 0 0 1 960 660" />
        </g>
      </svg>
    );
  }