import { CardDetails } from '../redux/slices/subscriptions';

export const getCardPropsMaxLength = (type: keyof CardDetails): number =>
  ({
    cardNumber: 19,
    expiryDate: 5,
    cvc: 3,
  })[type];
