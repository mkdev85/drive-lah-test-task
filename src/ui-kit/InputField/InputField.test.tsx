import { render, screen, fireEvent } from '@testing-library/react';

import InputField, { InputFieldProps } from './InputField';

describe('InputField Component', () => {
  const defaultProps: InputFieldProps = {
    id: 'test-input',
    name: 'testInput',
    value: '',
    placeholder: 'Enter text',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    disabled: false,
    required: false,
  };

  it('Should renders the InputField component correctly', () => {
    render(<InputField {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('Should displays the label correctly', () => {
    render(<InputField {...defaultProps} label="Test Label" />);
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', defaultProps.id);
  });

  it('Should calls onChange handler when input value changes', () => {
    render(<InputField {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText('Enter text');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('Should displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<InputField {...defaultProps} error={errorMessage} />);

    const errorTextElement = screen.getByText(errorMessage);
    expect(errorTextElement).toBeInTheDocument();
  });

  it('Should displays helper text when helperText prop is provided', () => {
    const helperText = 'This is some helper text';
    render(<InputField {...defaultProps} helperText={helperText} />);

    const helperTextElement = screen.getByText(helperText);
    expect(helperTextElement).toBeInTheDocument();
  });

  it('Should applies the disabled attribute when disabled prop is true', () => {
    render(<InputField {...defaultProps} disabled={true} />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeDisabled();
  });

  it('Should renders as required when required prop is true', () => {
    render(<InputField {...defaultProps} required={true} label="Test Label" />);

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toContainHTML('<span class="required">*</span>');
  });
});
