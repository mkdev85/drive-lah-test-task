export type ButtonVariantType = 'primary' | 'secondary';

export interface ButtonType {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  buttonVariant: ButtonVariantType;
  disabled?: boolean;
}
