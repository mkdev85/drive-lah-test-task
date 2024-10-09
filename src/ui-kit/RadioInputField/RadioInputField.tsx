import './RadioInputField.scss';

interface SwitchInputFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  labelPosition?: 'left' | 'right';
}

const RadioInputField: React.FC<SwitchInputFieldProps> = ({
  id,
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  className = '',
  labelPosition = 'right',
}) => {
  return (
    <div
      className={`custom-radio-field ${checked ? 'checked' : ''} ${labelPosition === 'left' ? 'label-left' : 'label-right'}`}
    >
      {labelPosition === 'left' && (
        <label
          htmlFor={id}
          className={`radio-label radio-label-left ${disabled ? 'disabled' : ''} ${checked ? 'checked' : ''}`}
        >
          {label}
        </label>
      )}
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={className}
      />
      {labelPosition === 'right' && (
        <label
          htmlFor={id}
          className={`radio-label radio-label-right ${disabled ? 'disabled' : ''} ${checked ? 'checked' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioInputField;
