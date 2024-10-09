import { Subscription } from '../../redux/slices/subscriptions';
import LocalStorage from '../../utils/LocalStorage';

const SUBSCRIPTION_STORAGE_KEY = 'subscription_data';

export class SubscriptionService {
  private localStorage = LocalStorage.getInstance();
  private static instance: SubscriptionService;

  private constructor() {}

  public static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  saveSubscriptionData(subscriptionData: Subscription): Promise<Subscription> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, subscriptionData);
        resolve(subscriptionData);
      }, 1000);
    });
  }

  getSubscriptionData(): Promise<Subscription | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const subscriptionData =
          this.localStorage.getItem<Subscription>(SUBSCRIPTION_STORAGE_KEY) || null;
        resolve(subscriptionData);
      }, 1000);
    });
  }
}

export const subscriptionService = SubscriptionService.getInstance();
