import LocalStorage from '../../utils/LocalStorage';

import { ProgressStep } from './types';

const localStorageKey = 'carListingProgressStatus';

const initialMockData: ProgressStep[] = [
  { name: 'Location', status: 'completed' },
  { name: 'About', status: 'completed' },
  { name: 'Features', status: 'completed' },
  { name: 'Rules', status: 'completed' },
  { name: 'Pricing', status: 'completed' },
  { name: 'Promotion', status: 'completed' },
  { name: 'Pictures', status: 'completed' },
  { name: 'Insurance', status: 'completed' },
  { name: 'Subscription', status: 'incomplete' },
  { name: 'Device', status: 'incomplete' },
  { name: 'Early Access', status: 'incomplete' },
];

export const carListingProgressStatusService = {
  getCarListingProgressStatus: (): Promise<ProgressStep[]> => {
    const localStorageInstance = LocalStorage.getInstance();
    const carListingProgressStatusList =
      localStorageInstance.getItem<ProgressStep[]>(localStorageKey) || initialMockData;

    return new Promise(resolve => {
      setTimeout(() => resolve(carListingProgressStatusList), 1000);
    });
  },

  updateCarListingProgressStatus: (updatedProgressStep: ProgressStep): Promise<ProgressStep[]> => {
    const localStorageInstance = LocalStorage.getInstance();

    const oldData =
      localStorageInstance.getItem<ProgressStep[]>(localStorageKey) || initialMockData;

    const updatedData = oldData.map(progressStep =>
      progressStep.name === updatedProgressStep.name
        ? { ...progressStep, status: updatedProgressStep.status }
        : progressStep,
    );

    localStorageInstance.setItem(localStorageKey, updatedData);

    return new Promise(resolve => {
      setTimeout(() => resolve(updatedData), 1000);
    });
  },
};
