import { BleClient, BleDevice, dataViewToText, textToDataView } from '@capacitor-community/bluetooth-le';

const SERVICE =  '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const SENSE_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const SENSE_WRITE = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
// read: '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'
// write '6E400003-B5A3-F393-E0A9-E50E24DCCA9E'

export const connectSense = async (serviceUUID: string= SERVICE): Promise<BleDevice> => {
  try {
    // Start Bluetooth Device
    await BleClient.initialize();

    // Register for Bluetooth Device
    const device = await BleClient.requestDevice({
      services: [serviceUUID],
    });

    // connect the device
    await BleClient.connect(device.deviceId);
    console.log('connected to device', device);
    
    // resolve Promise
    return Promise.resolve(device);
    
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export const subscribeSense = async (device: BleDevice, senseCallback: (data: any) => void, configCallback: (data: any) => void): Promise<void> => {
  try {
    // subscribe to sense notifications
    await BleClient.startNotifications(device.deviceId, SERVICE, SENSE_CHARACTERISTIC, (data) => {
      const payload = parseSenseData(data);
      if (Object.keys(payload).includes('config')) {
        configCallback(payload.config);
      } else {
        senseCallback(payload);
      }
    });

  } catch (error) {
    return Promise.reject(error);
  }
}


export const disconnectSense = async (device: BleDevice): Promise<void> => {
  try {
    await BleClient.stopNotifications(device.deviceId, SERVICE, SENSE_CHARACTERISTIC);
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export const sendConfig = async (device: BleDevice, config: any): Promise<void> => {
  const data = textToDataView(JSON.stringify(config));
  try {
    await BleClient.write(device.deviceId, SERVICE, SENSE_WRITE, data); 
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

const parseSenseData = (data: DataView): {[key: string]: any} => {
  // const flags = data.getUint8(0);
  // const rate16Bits = flags & 0x01;
  let payload: {[key: string]: any};
  
  // try to parse it
  try {
    payload = JSON.parse(dataViewToText(data));
  } catch (error) {
    console.log(error);
    payload = {error: error}
  }

  // return payload
  return payload;
}

export const developmentFakeSensor = (callback: (data: any) => void, interval: number = 5000): void => {
  // make fake data and call callback function
  const fakedata = {firmware: "1.0.0", "random": {value: Math.random() * 100}};
  callback(fakedata);

  // fire the interval
  setTimeout(() => developmentFakeSensor(callback, interval), interval);
}
