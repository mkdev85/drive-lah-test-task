export interface Feature {
  icon: JSX.Element;
  text: string;
}

export interface AddOn {
  id: string;
  label: string;
  comingSoon?: boolean;
}

export interface Plan {
  title: string;
  price: string;
  features: Feature[];
  addOns: AddOn[];
}

export type PlanKey = 'justMates' | 'goodMates' | 'bestMates';
