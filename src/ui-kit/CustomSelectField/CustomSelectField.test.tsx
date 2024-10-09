import { render, screen, fireEvent } from '@testing-library/react';

import CustomSelectField, { CustomSelectFieldProps } from './CustomSelectField';

describe('CustomSelectField Component', () => {
  const defaultProps: CustomSelectFieldProps = {
    id: 'test-select',
    options: ['Option 1', 'Option 2', 'Option 3'],
    onChange: jest.fn(),
  };

  it('Should renders the select field correctly', () => {
    render(<CustomSelectField {...defaultProps} label="Select an Option" />);
    const labelElement = screen.getByText('Select an Option');
    expect(labelElement).toBeInTheDocument();

    const selectBox = screen.getByText('Select option(s)');
    expect(selectBox).toBeInTheDocument();
  });

  it('Should opens the dropdown menu when the select box is clicked', () => {
    render(<CustomSelectField {...defaultProps} />);
    const selectBox = screen.getByText('Select option(s)');
    fireEvent.click(selectBox);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('Should selects a single option and closes the dropdown', () => {
    render(<CustomSelectField {...defaultProps} />);
    fireEvent.click(screen.getByText('Select option(s)'));
    fireEvent.click(screen.getByText('Option 1'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(['Option 1']);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('Should shows error message when error prop is provided', () => {
    render(<CustomSelectField {...defaultProps} error="This field is required." />);
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
    expect(screen.queryByText('This is a helper text.')).not.toBeInTheDocument();
  });
});
