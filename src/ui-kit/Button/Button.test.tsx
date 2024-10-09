import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from './Button';
import { ButtonType } from './type';

describe('Button Component', () => {
  const defaultProps: ButtonType = {
    type: 'button',
    buttonVariant: 'primary',
    className: '',
    onClick: jest.fn(),
    children: 'Click Me',
    disabled: false,
  };

  it('Should renders the Button component correctly', () => {
    render(<Button {...defaultProps} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('Should applies the correct classes based on props', () => {
    render(<Button {...defaultProps} className="custom-btn" buttonVariant="secondary" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('base-btn secondary-btn custom-btn');
  });

  it('Should calls the onClick handler when clicked', () => {
    render(<Button {...defaultProps} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('Should renders with the primary button variant by default', () => {
    render(<Button {...defaultProps} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('base-btn primary-btn');
  });

  it('Should renders the correct button type attribute', () => {
    render(<Button {...defaultProps} type="submit" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
