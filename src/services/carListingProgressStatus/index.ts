import LocalStorage from '../../utils/LocalStorage';

import { ProgressStatus, ProgressStep, ProgressStepName } from './types';

const CAR_LISTING_PROGRESS_STATUS = 'car_listing_progress_status';

const initialMockData: ProgressStep[] = [
  { name: ProgressStepName.Location, status: ProgressStatus.Completed },
  { name: ProgressStepName.About, status: ProgressStatus.Completed },
  { name: ProgressStepName.Features, status: ProgressStatus.Completed },
  { name: ProgressStepName.Rules, status: ProgressStatus.Completed },
  { name: ProgressStepName.Pricing, status: ProgressStatus.Completed },
  { name: ProgressStepName.Promotion, status: ProgressStatus.Completed },
  { name: ProgressStepName.Pictures, status: ProgressStatus.Completed },
  { name: ProgressStepName.Insurance, status: ProgressStatus.Completed },
  { name: ProgressStepName.Subscription, status: ProgressStatus.Incomplete },
  { name: ProgressStepName.Device, status: ProgressStatus.Incomplete },
  { name: ProgressStepName.EarlyAccess, status: ProgressStatus.Incomplete },
];

class CarListingProgressStatusService {
  private static instance: CarListingProgressStatusService;
  private localStorageInstance = LocalStorage.getInstance();

  private constructor() {}

  public static getInstance(): CarListingProgressStatusService {
    if (!CarListingProgressStatusService.instance) {
      CarListingProgressStatusService.instance = new CarListingProgressStatusService();
    }
    return CarListingProgressStatusService.instance;
  }

  getCarListingProgressStatus(): Promise<ProgressStep[]> {
    const carListingProgressStatusList =
      this.localStorageInstance.getItem<ProgressStep[]>(CAR_LISTING_PROGRESS_STATUS) ||
      initialMockData;

    return new Promise(resolve => {
      setTimeout(() => resolve(carListingProgressStatusList), 1000);
    });
  }

  updateCarListingProgressStatus(updatedProgressStep: ProgressStep): Promise<ProgressStep[]> {
    const oldData =
      this.localStorageInstance.getItem<ProgressStep[]>(CAR_LISTING_PROGRESS_STATUS) ||
      initialMockData;

    const updatedData = oldData.map(progressStep =>
      progressStep.name === updatedProgressStep.name
        ? { ...progressStep, status: updatedProgressStep.status }
        : progressStep,
    );

    this.localStorageInstance.setItem(CAR_LISTING_PROGRESS_STATUS, updatedData);

    return new Promise(resolve => {
      setTimeout(() => resolve(updatedData), 1000);
    });
  }
}

export const carListingProgressStatusService = CarListingProgressStatusService.getInstance();
