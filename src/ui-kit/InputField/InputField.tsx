import './InputFieldStyle.scss';

export interface InputFieldProps {
  id: string;
  type?: string;
  label?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type = 'text',
  label,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  disabled = false,
  error,
  helperText,
  required = false,
}) => {
  return (
    <div className="custom-input-field">
      {label && (
        <label htmlFor={id} className={`input-label ${disabled ? 'disabled' : ''}`}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`input-field ${error ? 'error' : ''}`}
        required={required}
      />
      {error && <span className="error-text">{error}</span>}
      {helperText && !error && <span className="helper-text">{helperText}</span>}
    </div>
  );
};

export default InputField;
