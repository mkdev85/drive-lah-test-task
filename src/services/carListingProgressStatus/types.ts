export enum ProgressStepName {
  Location = 'Location',
  About = 'About',
  Features = 'Features',
  Rules = 'Rules',
  Pricing = 'Pricing',
  Promotion = 'Promotion',
  Pictures = 'Pictures',
  Insurance = 'Insurance',
  Subscription = 'Subscription',
  Device = 'Device',
  EarlyAccess = 'Early Access',
}

export enum ProgressStatus {
  Completed = 'completed',
  Incomplete = 'incomplete',
}

export interface ProgressStep {
  name: ProgressStepName;
  status: ProgressStatus;
}
