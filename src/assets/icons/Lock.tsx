import { iconProps } from './types';

function LockIcon(props:iconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path id="Lock" d="M15.8,20H4.2c-1,0-1.8-0.8-1.8-1.8V8.5c0-1,0.8-1.8,1.8-1.8h1.1V4.7C5.3,2.1,7.4,0,10,0c2.6,0,4.7,2.1,4.7,4.7v2.1h1.1c1,0,1.8,0.8,1.8,1.8v9.7C17.6,19.2,16.8,20,15.8,20z M4,8.4v10H16v-10H4z M10,1.5c-1.7,0-3.2,1.4-3.2,3.2v2.1h6.3V4.7C13.2,2.9,11.7,1.5,10,1.5L10,1.5z M10,15.2c-1,0-1.8-0.8-1.8-1.8c0-1,0.8-1.8,1.8-1.8c1,0,1.8,0.8,1.8,1.8C11.8,14.4,11,15.2,10,15.2L10,15.2z"/>
    </svg>
  );
}

export default LockIcon;
