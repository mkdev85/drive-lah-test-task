export type CarListingProgressStatus = 'completed' | 'incomplete';

export interface ProgressStep {
  name: string;
  status: CarListingProgressStatus;
}
