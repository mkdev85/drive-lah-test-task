import { iconProps } from './types';

function ArrowLeftIcon(props: iconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3.9,8.9c0.1,0,0.2,0,0.3,0c4.9,0,9.7,0,14.6,0c0.7,0,1.1,0.3,1.2,0.9c0.1,0.6-0.3,1.3-1,1.3c-0.1,0-0.2,0-0.4,0c-4.8,0-9.6,0-14.4,0c-0.1,0-0.2,0-0.4,0C3.9,11.2,4,11.3,4,11.3c1.9,1.9,3.7,3.7,5.6,5.6c0.3,0.3,0.5,0.7,0.4,1.2c-0.2,0.8-1.1,1.1-1.8,0.6C8.1,18.6,8,18.5,8,18.4c-2.5-2.5-5-5-7.5-7.5c-0.6-0.6-0.6-1.2,0-1.8c2.5-2.5,5-5,7.5-7.5c0.3-0.3,0.6-0.5,1.1-0.4c0.9,0.2,1.2,1.1,0.7,1.8C9.7,3,9.6,3.1,9.5,3.2C7.7,5,5.9,6.8,4,8.6C4,8.7,3.9,8.7,3.9,8.9C3.8,8.8,3.9,8.9,3.9,8.9z" />
    </svg>
  );
}

export default ArrowLeftIcon;
