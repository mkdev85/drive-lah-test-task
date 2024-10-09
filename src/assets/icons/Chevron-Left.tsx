import { iconProps } from './types';

function ChevronLeftIcon(props: iconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.3,0c0.4,0,0.7,0.1,1,0.4c0.6,0.6,0.6,1.5,0,2L7.7,10l7.6,7.6c0.6,0.6,0.6,1.5,0,2c-0.6,0.6-1.5,0.6-2,0L4.7,11c-0.6-0.6-0.6-1.5,0-2l8.6-8.6C13.6,0.1,13.9,0,14.3,0z" />
    </svg>
  );
}

export default ChevronLeftIcon;
