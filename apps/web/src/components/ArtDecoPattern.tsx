const ArtDecoPattern = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Geometric art deco lines */}
      <g stroke="hsl(168 76% 46% / 0.3)" strokeWidth="1">
        {/* Concentric circles */}
        <circle cx="150" cy="150" r="40" />
        <circle cx="150" cy="150" r="60" />
        <circle cx="150" cy="150" r="80" />
        <circle cx="150" cy="150" r="100" />

        {/* Spiral pattern */}
        <path d="M 140 150 A 10 10 0 0 1 160 150 A 20 20 0 0 1 130 150 A 30 30 0 0 1 180 150 A 40 40 0 0 1 110 150" />

        {/* Right circle */}
        <circle cx="700" cy="250" r="50" />
        <circle cx="700" cy="250" r="70" />

        {/* Grid lines */}
        <line x1="0" y1="0" x2="800" y2="0" />
        <line x1="300" y1="0" x2="300" y2="600" />
        <line x1="500" y1="0" x2="500" y2="600" />
        <line x1="0" y1="300" x2="800" y2="300" />

        {/* Diamond shapes */}
        <rect x="340" y="100" width="20" height="40" rx="10" />
        <rect x="340" y="180" width="20" height="40" rx="10" />
        <rect x="340" y="260" width="20" height="40" rx="10" />
        <rect x="340" y="340" width="20" height="40" rx="10" />

        {/* Corner arcs */}
        <path d="M 500 0 Q 600 0 600 100" />
        <path d="M 500 0 Q 550 0 550 50" />

        {/* Diagonal lines */}
        <line x1="600" y1="0" x2="800" y2="200" />
        <line x1="650" y1="0" x2="800" y2="150" />
        <line x1="700" y1="0" x2="800" y2="100" />

        {/* Bottom rectangles */}
        <rect x="50" y="350" width="200" height="80" rx="2" />
        <rect x="70" y="370" width="160" height="40" rx="2" />

        {/* Vertical lines cluster */}
        <line x1="420" y1="50" x2="420" y2="550" />
        <line x1="440" y1="50" x2="440" y2="550" />
        <line x1="460" y1="50" x2="460" y2="550" />

        {/* Small circles */}
        <circle cx="430" cy="120" r="8" />
        <circle cx="450" cy="200" r="6" />
        <circle cx="430" cy="400" r="10" />
      </g>
    </svg>
  );
};

export default ArtDecoPattern;
