import React, { useState, useRef, useEffect } from 'react';

import ChevronDownIcon from '../../assets/icons/Chevron-Down';
import ChevronUpIcon from '../../assets/icons/Chevron-Up';
import CloseCircleSolidIcon from '../../assets/icons/Close-Circle-Solid';

import './CustomSelectField.scss';

export interface CustomSelectFieldProps {
  id: string;
  label?: string;
  options: string[];
  isMultiple?: boolean;
  selectedOptions?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  id,
  label,
  options,
  isMultiple = false,
  selectedOptions = [],
  onChange,
  disabled = false,
  required = false,
  error,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedOptions);
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownRef.current) {
      const { bottom, top } = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - bottom;
      const spaceAbove = top;

      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    if (isMultiple) {
      if (selected.includes(option)) {
        setSelected(selected.filter(item => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    } else {
      setSelected([option]);
      setIsOpen(false);
    }

    if (onChange) {
      onChange(isMultiple ? [...selected, option] : [option]);
    }
  };

  const handleDeselectAll = () => {
    setSelected([]);
    if (onChange) {
      onChange([]);
    }
  };

  const isOptionSelected = (option: string) => {
    return selected.includes(option);
  };

  return (
    <div className="custom-select-field" ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className={`input-label ${disabled ? 'disabled' : ''}`}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      <div
        className={`select-box ${isOpen ? 'select-box-open' : ''}`}
        id={id}
        onClick={toggleDropdown}
      >
        <div className="selected-options">
          {selected.length > 0
            ? selected.map((item, index) => (
                <span
                  key={index}
                  className={`selected-option-text${selected.length > 1 ? '' : '-single'}`}
                >
                  {item}
                  {index < selected.length - 1 && ''}
                </span>
              ))
            : 'Select option(s)'}
        </div>
        <div className="dropdown-arrow">{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
      </div>
      {error && <span className="error-text">{error}</span>}
      {helperText && !error && <span className="helper-text">{helperText}</span>}

      {isOpen && (
        <div
          className={`dropdown-menu ${
            dropdownPosition === 'top' ? 'dropdown-top' : 'dropdown-bottom'
          }`}
        >
          {isMultiple && selected.length > 0 && (
            <div className="deselect-all" onClick={handleDeselectAll}>
              Deselect All
            </div>
          )}

          {options.map(option => (
            <div
              key={option}
              className={`dropdown-item ${isOptionSelected(option) ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
              {isMultiple && isOptionSelected(option) && (
                <span
                  className="deselect-button"
                  onClick={e => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                >
                  <CloseCircleSolidIcon />
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelectField;
