import './Button.scss';
import { ButtonType } from './type';

const Button = ({ type, className, onClick, children, disabled, buttonVariant = 'primary' }: ButtonType) => {
  return (
    <button
      type={type}
      className={`base-btn ${buttonVariant}-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
