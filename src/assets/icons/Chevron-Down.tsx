import React from 'react';

import { iconProps } from './types';

function ChevronDownIcon(props: iconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0,5.7c0-0.4,0.1-0.7,0.4-1c0.6-0.6,1.5-0.6,2,0l7.6,7.6l7.6-7.6c0.6-0.6,1.5-0.6,2,0c0.6,0.6,0.6,1.5,0,2L11,15.3c-0.6,0.6-1.5,0.6-2,0L0.4,6.7C0.1,6.4,0,6.1,0,5.7z" />
    </svg>
  );
}

export default ChevronDownIcon;
