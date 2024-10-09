import React from 'react';

import { iconProps } from './types';

const CheckCircleSolidIcon: React.FC<iconProps> = props => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M10,20c5.5,0,10-4.5,10-10S15.5,0,10,0S0,4.5,0,10S4.5,20,10,20z M14.4,8.2l-5,5c-0.4,0.4-1,0.4-1.3,0l-2.5-2.5c-0.4-0.4-0.4-1,0-1.3C6,9,6.6,9,6.9,9.3l1.8,1.8l4.3-4.3c0.4-0.4,1-0.4,1.3,0C14.8,7.2,14.8,7.8,14.4,8.2L14.4,8.2z" />
    </svg>
  );
};

export default CheckCircleSolidIcon;
