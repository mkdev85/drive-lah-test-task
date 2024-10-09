import { CardDetails } from '../../redux/slices/subscriptions';

export interface PaymentCardInputFieldProps {
  id: string;
  value?: CardDetails;
  onChange: (fieldName: string, formatedValues: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  helperText?: string;
  required?: boolean;
  onSave?: (cardDetails: CardDetails) => void;
}
