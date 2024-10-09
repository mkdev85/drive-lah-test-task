import './SwitchInputField.scss';

export interface SwitchInputFieldProps {
  id: string;
  label: string;
  name: string;
  value?: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  labelPosition?: 'left' | 'right';
}

const SwitchInputField: React.FC<SwitchInputFieldProps> = ({
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
      className={`custom-switch-field ${checked ? 'checked' : ''} ${labelPosition === 'left' ? 'label-left' : 'label-right'}`}
    >
      {labelPosition === 'left' && (
        <label
          htmlFor={id}
          className={`switch-label switch-label-left ${disabled ? 'disabled' : ''} ${checked ? 'checked' : ''}`}
        >
          {label}
          <span className="switch-btn" />
        </label>
      )}
      <input
        type="checkbox"
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
          className={`switch-label switch-label-right ${disabled ? 'disabled' : ''} ${checked ? 'checked' : ''}`}
        >
          {label}
          <span className="switch-btn" />
        </label>
      )}
    </div>
  );
};

export default SwitchInputField;
