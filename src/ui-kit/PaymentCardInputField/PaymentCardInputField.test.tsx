import { render, screen, fireEvent } from '@testing-library/react';

import CardValidator from '../../utils/CardValidator';

import PaymentCardInputField from './PaymentCardInputField';

jest.mock('../../utils/CardValidator', () => ({
  validateCardNumber: jest.fn(),
  validateExpiryDate: jest.fn(),
  validateCVC: jest.fn(),
}));

describe('PaymentCardInputField', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should renders without crashing', () => {
    render(
      <PaymentCardInputField
        id="test"
        onChange={mockOnChange}
        value={{ cardNumber: '', expiryDate: '', cvc: '' }}
      />,
    );

    expect(screen.getByPlaceholderText('1234 5678 1234 5678')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('CVC')).toBeInTheDocument();
  });

  it('Should calls onChange with formatted card number', () => {
    render(
      <PaymentCardInputField
        id="test"
        onChange={mockOnChange}
        value={{ cardNumber: '', expiryDate: '', cvc: '' }}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('1234 5678 1234 5678'), {
      target: { value: '4111111111111111', name: 'cardNumber' },
    });

    expect(mockOnChange).toHaveBeenCalledWith('cardNumber', '4111 1111 1111 1111');
  });

  it('Should displays error for invalid card number', () => {
    (CardValidator.validateCardNumber as jest.Mock).mockReturnValue('Invalid card number');

    render(
      <PaymentCardInputField
        id="test"
        onChange={mockOnChange}
        value={{ cardNumber: '', expiryDate: '', cvc: '' }}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('1234 5678 1234 5678'), {
      target: { value: '1234', name: 'cardNumber' },
    });

    expect(screen.getByText('Invalid card number')).toBeInTheDocument();
  });

  it('Should does not display error message when valid', () => {
    (CardValidator.validateCardNumber as jest.Mock).mockReturnValue('');

    render(
      <PaymentCardInputField
        id="test"
        onChange={mockOnChange}
        value={{ cardNumber: '', expiryDate: '', cvc: '' }}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('1234 5678 1234 5678'), {
      target: { value: '4111111111111111', name: 'cardNumber' },
    });

    expect(screen.queryByText('Invalid card number')).toBeNull();
  });

  it('Should renders helper text when there are no errors', () => {
    render(
      <PaymentCardInputField
        id="test"
        onChange={mockOnChange}
        value={{ cardNumber: '', expiryDate: '', cvc: '' }}
        helperText="Your helper text"
      />,
    );

    expect(screen.getByText('Your helper text')).toBeInTheDocument();
  });

  it('Should does not render helper text when there are errors', () => {
    (CardValidator.validateCVC as jest.Mock).mockReturnValue('Invalid CVC');

    render(
      <PaymentCardInputField
        id="test"
        onChange={mockOnChange}
        value={{ cardNumber: '', expiryDate: '', cvc: '' }}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('CVC'), {
      target: { value: '12', name: 'cvc' },
    });

    expect(screen.queryByText('Your helper text')).toBeNull();
  });
});
