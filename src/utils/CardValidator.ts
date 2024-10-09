class CardValidator {
  /**
   * Validates the credit card number.
   * Card number should be exactly 16 digits long.
   */
  static validateCardNumber(cardNumber: string): string {
    const regex = /^[0-9]{16}$/;
    const sanitizedCardNumber = cardNumber.replace(/\s/g, '');
    return regex.test(sanitizedCardNumber) ? '' : 'Invalid card number. Please enter 16 digits.';
  }

  /**
   * Validates the expiry date of the credit card.
   * The format should be MM/YY, and the date should be in the future.
   */
  static validateExpiryDate(expiryDate: string): string {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(expiryDate)) {
      return 'Invalid expiry date. Format should be MM/YY.';
    }

    const [monthStr, yearStr] = expiryDate.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear) {
      return 'Expiry date cannot be in the past.';
    }

    if (year === currentYear && month < currentMonth) {
      return 'Expiry date cannot be in the past.';
    }

    return '';
  }

  /**
   * Validates the CVC (Card Verification Code).
   * CVC should be exactly 3 digits long.
   */
  static validateCVC(cvc: string): string {
    const regex = /^[0-9]{3}$/;
    return regex.test(cvc) ? '' : 'Invalid CVC. Please enter 3 digits.';
  }
}

export default CardValidator;
