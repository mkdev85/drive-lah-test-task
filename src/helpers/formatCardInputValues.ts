import { CardDetails } from '../redux/slices/subscriptions';

export const formatCardInputValue = (value: string, type: keyof CardDetails): string => {
  const formatters: Record<keyof CardDetails, (val: string) => string> = {
    cardNumber: val =>
      val
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim(),
    expiryDate: val =>
      val
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, (_, p1, p2) => `${p1}${p2 ? '/' + p2 : ''}`)
        .slice(0, 5),
    cvc: val => val.replace(/\D/g, ''),
  };
  return formatters[type](value);
};
