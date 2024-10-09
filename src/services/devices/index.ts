import { Device } from '../../redux/slices/devices';
import LocalStorage from '../../utils/LocalStorage';

const DEVICE_STORAGE_KEY = 'device_data';

export class DeviceService {
  private static instance: DeviceService | null = null;
  private localStorage = LocalStorage.getInstance();

  private constructor() {}

  public static getInstance(): DeviceService {
    if (!DeviceService.instance) {
      DeviceService.instance = new DeviceService();
    }
    return DeviceService.instance;
  }

  saveDeviceData(deviceData: Device[]): Promise<Device[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.localStorage.setItem(DEVICE_STORAGE_KEY, deviceData);
        resolve(deviceData);
      }, 1000);
    });
  }

  getDeviceData(): Promise<Device[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const devices = this.localStorage.getItem<Device[]>(DEVICE_STORAGE_KEY) || [];
        resolve(devices);
      }, 1000);
    });
  }
}

export const deviceService = DeviceService.getInstance();
