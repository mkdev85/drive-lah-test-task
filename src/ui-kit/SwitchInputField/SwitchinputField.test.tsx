import { render, screen, fireEvent } from '@testing-library/react';

import SwitchInputField, { SwitchInputFieldProps } from './SwitchInputField';

describe('SwitchInputField Component', () => {
  const defaultProps: SwitchInputFieldProps = {
    id: 'test-switch',
    label: 'Test Switch',
    name: 'testSwitch',
    checked: false,
    onChange: jest.fn(),
  };

  it('Should renders the switch input correctly', () => {
    render(<SwitchInputField {...defaultProps} />);
    const switchElement = screen.getByLabelText('Test Switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('type', 'checkbox');
    expect(switchElement).not.toBeChecked();
  });

  it('Should applies the checked state correctly', () => {
    render(<SwitchInputField {...defaultProps} checked={true} />);
    const switchElement = screen.getByLabelText('Test Switch');
    expect(switchElement).toBeChecked();
  });

  it('Should calls onChange handler when the switch is clicked', () => {
    render(<SwitchInputField {...defaultProps} />);
    const switchElement = screen.getByLabelText('Test Switch');

    fireEvent.click(switchElement);
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('Should renders the label on the right by default', () => {
    render(<SwitchInputField {...defaultProps} />);
    const labelElement = screen.getByText('Test Switch');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('switch-label-right');
  });

  it('Should renders the label on the left when labelPosition is "left"', () => {
    render(<SwitchInputField {...defaultProps} labelPosition="left" />);
    const labelElement = screen.getByText('Test Switch');
    expect(labelElement).toHaveClass('switch-label-left');
  });

  it('Should applies the disabled attribute when disabled prop is true', () => {
    render(<SwitchInputField {...defaultProps} disabled={true} />);
    const switchElement = screen.getByLabelText('Test Switch');
    expect(switchElement).toBeDisabled();
  });

  it('Should applies the custom className when provided', () => {
    const customClass = 'custom-class';
    render(<SwitchInputField {...defaultProps} className={customClass} />);
    const switchElement = screen.getByLabelText('Test Switch');
    expect(switchElement).toHaveClass(customClass);
  });

  it('Should applies the checked class when checked is true', () => {
    render(<SwitchInputField {...defaultProps} checked={true} />);
    const switchField = screen.getByText('Test Switch').closest('div');
    expect(switchField).toHaveClass('checked');
  });
});
