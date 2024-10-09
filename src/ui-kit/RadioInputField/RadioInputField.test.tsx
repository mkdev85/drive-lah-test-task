import { render, screen, fireEvent } from '@testing-library/react';

import RadioInputField, { RadioInputProps } from './RadioInputField';

describe('RadioInputField Component', () => {
  const defaultProps: RadioInputProps = {
    id: 'test-radio',
    label: 'Test Radio',
    name: 'testRadio',
    value: 'testValue',
    checked: false,
    onChange: jest.fn(),
  };

  it('Should renders the radio input correctly', () => {
    render(<RadioInputField {...defaultProps} />);
    const radioElement = screen.getByLabelText('Test Radio');
    expect(radioElement).toBeInTheDocument();
    expect(radioElement).toHaveAttribute('type', 'radio');
    expect(radioElement).not.toBeChecked();
  });

  it('Should applies the checked state correctly', () => {
    render(<RadioInputField {...defaultProps} checked={true} />);
    const radioElement = screen.getByLabelText('Test Radio');
    expect(radioElement).toBeChecked();
  });

  it('Should calls onChange handler when the radio input is clicked', () => {
    render(<RadioInputField {...defaultProps} />);
    const radioElement = screen.getByLabelText('Test Radio');

    fireEvent.click(radioElement);
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('Should renders the label on the right by default', () => {
    render(<RadioInputField {...defaultProps} />);
    const labelElement = screen.getByText('Test Radio');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('radio-label-right');
  });

  it('Should applies the disabled attribute when disabled prop is true', () => {
    render(<RadioInputField {...defaultProps} disabled={true} />);
    const radioElement = screen.getByLabelText('Test Radio');
    expect(radioElement).toBeDisabled();
  });

  it('Should applies the checked class when checked is true', () => {
    render(<RadioInputField {...defaultProps} checked={true} />);
    const radioField = screen.getByText('Test Radio').closest('div');
    expect(radioField).toHaveClass('checked');
  });
});
