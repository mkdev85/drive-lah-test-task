import { iconProps } from './types';

function ArrowDownIcon(props: iconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8.9,16.1c0-0.1,0-0.2,0-0.3c0-4.9,0-9.7,0-14.6c0-0.7,0.3-1.1,0.9-1.2c0.6-0.1,1.3,0.3,1.3,1c0,0.1,0,0.2,0,0.4c0,4.8,0,9.6,0,14.4c0,0.1,0,0.2,0,0.4c0.1-0.1,0.2-0.2,0.2-0.2c1.9-1.9,3.7-3.7,5.6-5.6c0.3-0.3,0.7-0.5,1.2-0.4c0.8,0.2,1.1,1.1,0.6,1.8c-0.1,0.1-0.1,0.2-0.2,0.2c-2.5,2.5-5,5-7.5,7.5c-0.6,0.6-1.2,0.6-1.8,0c-2.5-2.5-5-5-7.5-7.5c-0.3-0.3-0.5-0.6-0.4-1.1c0.2-0.9,1.1-1.2,1.8-0.7c0.1,0.1,0.1,0.1,0.2,0.2C5,12.3,6.8,14.1,8.6,16C8.7,16,8.7,16.1,8.9,16.1C8.8,16.2,8.9,16.1,8.9,16.1z" />
    </svg>
  );
}

export default ArrowDownIcon;
