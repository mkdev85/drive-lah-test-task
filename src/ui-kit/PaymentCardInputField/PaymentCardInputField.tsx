import PaymentCardIcon from '../../assets/icons/Payment-Card';

import './PaymentCardInputField.scss';

interface PaymentCardInputFieldProps {
  id: string;
  type?: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const PaymentCardInputField: React.FC<PaymentCardInputFieldProps> = ({
  id,
  type = 'text',
  name,
  value,
  placeholder = '1234 5678 1234 5678',
  onChange,
  onBlur,
  disabled = false,
  error,
  helperText,
  required = false,
}) => {
  return (
    <div className="custom-payment-card-input-field">
      <div className="custom-payment-card-input-field-inner">
        <PaymentCardIcon className="payment-card-icon" />
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`input-field card-number-input-field ${error ? 'error' : ''}`}
          required={required}
        />
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder="MM/YY"
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`input-field card-validity-input-field ${error ? 'error' : ''}`}
          required={required}
        />
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder="CVC"
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`input-field card-cvc-number-input-field ${error ? 'error' : ''}`}
          required={required}
        />
      </div>
      {error && <span className="error-text">{error}</span>}
      {helperText && !error && <span className="helper-text">{helperText}</span>}
    </div>
  );
};

export default PaymentCardInputField;
