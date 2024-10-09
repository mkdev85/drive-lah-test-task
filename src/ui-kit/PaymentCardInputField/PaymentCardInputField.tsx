import { useState } from 'react';

import PaymentCardIcon from '../../assets/icons/Payment-Card';
import { formatCardInputValue } from '../../helpers/formatCardInputValues';
import { getCardPropsMaxLength } from '../../helpers/getCardPropsMaxLength';
import { CardDetails } from '../../redux/slices/subscriptions';
import CardValidator from '../../utils/CardValidator';

import './PaymentCardInputField.scss';
import { PaymentCardInputFieldProps } from './types';

const PaymentCardInputField: React.FC<PaymentCardInputFieldProps> = ({
  id,
  disabled = false,
  value: cardDetails,
  helperText,
  onChange: handleInputChage,
  required = false,
}) => {
  const [errors, setErrors] = useState<CardDetails>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof CardDetails;
    const formattedValue = formatCardInputValue(value, fieldName);

    if (formattedValue.length <= getCardPropsMaxLength(fieldName)) {
      handleInputChage(fieldName, formattedValue);

      let error = '';

      switch (fieldName) {
        case 'cardNumber':
          error = CardValidator.validateCardNumber(value);
          break;
        case 'expiryDate':
          error = CardValidator.validateExpiryDate(value);
          break;
        case 'cvc':
          error = CardValidator.validateCVC(value);
          break;
      }

      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  const renderInputField = (field: keyof CardDetails, placeholder: string, className: string) => (
    <input
      id={`${id}-${field}`}
      type="text"
      name={field}
      value={cardDetails?.[field]}
      placeholder={placeholder}
      onChange={handleChange}
      disabled={disabled}
      className={`input-field ${className} ${errors[field] ? 'error' : ''}`}
      maxLength={getCardPropsMaxLength(field)}
      required={required}
    />
  );

  return (
    <div className="custom-payment-card-input-field">
      <div className="custom-payment-card-input-field-inner">
        <PaymentCardIcon className="payment-card-icon" />
        {renderInputField('cardNumber', '1234 5678 1234 5678', 'card-number-input-field')}
        {renderInputField('expiryDate', 'MM/YY', 'card-validity-input-field')}
        {renderInputField('cvc', 'CVC', 'card-cvc-number-input-field')}
      </div>
      {Object.entries(errors).map(
        ([field, error]) =>
          error && (
            <span key={field} className="error-text">
              {error}
            </span>
          ),
      )}
      {helperText && !Object.values(errors).some(Boolean) && (
        <span className="helper-text">{helperText}</span>
      )}
    </div>
  );
};

export default PaymentCardInputField;
