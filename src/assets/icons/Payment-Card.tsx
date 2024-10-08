import { iconProps } from './types';

function PaymentCardIcon(props: iconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2.2,2.2C1,2.2,0,3.2,0,4.4v1.1h20V4.4c0-1.2-1-2.2-2.2-2.2H2.2z M20,8.9H0v6.7c0,1.2,1,2.2,2.2,2.2h15.6c1.2,0,2.2-1,2.2-2.2V8.9z M3.9,13.3h2.2c0.3,0,0.6,0.3,0.6,0.6c0,0.3-0.2,0.6-0.6,0.6H3.9c-0.3,0-0.6-0.3-0.6-0.6C3.3,13.6,3.6,13.3,3.9,13.3z M7.8,13.9c0-0.3,0.2-0.6,0.6-0.6h4.4c0.3,0,0.6,0.3,0.6,0.6c0,0.3-0.2,0.6-0.6,0.6H8.3C8,14.4,7.8,14.2,7.8,13.9z" />
    </svg>
  );
}

export default PaymentCardIcon;
