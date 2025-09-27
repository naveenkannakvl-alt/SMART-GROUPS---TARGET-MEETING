
import React from 'react';

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    {...props}
  >
    <path d="M11 3a1 1 0 10-2 0v1.586l-1.293-1.293a1 1 0 00-1.414 1.414L8.586 6H7a1 1 0 00-1 1v3a1 1 0 001 1h1v1H7a1 1 0 000 2h1v1H7a1 1 0 000 2h1v1a1 1 0 102 0v-1h2v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1h1a1 1 0 100-2h-1V7a1 1 0 00-1-1h-1.586l2.293-2.293a1 1 0 00-1.414-1.414L11 4.586V3z" />
    <path d="M3.5 10.5a1 1 0 00-1 1v3a1 1 0 001 1h1a1 1 0 001-1v-3a1 1 0 00-1-1h-1z" />
    <path d="M15.5 10.5a1 1 0 00-1 1v3a1 1 0 001 1h1a1 1 0 001-1v-3a1 1 0 00-1-1h-1z" />
  </svg>
);

export default TrophyIcon;
