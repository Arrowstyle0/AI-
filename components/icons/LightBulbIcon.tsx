import React from 'react';

const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5c0-2.2-1.8-4-4-4-1.2 0-2.3.5-3.1 1.4" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 14v3" />
    <path d="M12 3a2.5 2.5 0 0 0-2.5 2.5c0 1.2.7 2.3 1.5 3" />
    <path d="M8.5 10c.8-.8 1.5-1.8 1.5-3A2.5 2.5 0 0 1 12 4.5" />
  </svg>
);

export default LightBulbIcon;
