import { BleClient, dataViewToText } from '@capacitor-community/bluetooth-le';

const SERVICE =  '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const SENSE_CHARACTERISTIC = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
// read: '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'
// write '6E400003-B5A3-F393-E0A9-E50E24DCCA9E'

export const registerSense = async (callback: (data: any) => void): Promise<void> => {
  try {
    // Start Bluetooth Device
    await BleClient.initialize();

    // Register for Bluetooth Device
    const device = await BleClient.requestDevice({
      services: [SERVICE],
    });

    // connect the device
    await BleClient.connect(device.deviceId);
    console.log('connected to device', device);

    // subscribe to notifications
    await BleClient.startNotifications(
      device.deviceId,
      SERVICE,
      SENSE_CHARACTERISTIC,
      (data) => callback(parseSenseData(data))
    );

  } catch (error) {
    callback({error: error});
  }
}

const parseSenseData = (data: DataView): {[key: string]: any} => {
  // const flags = data.getUint8(0);
  // const rate16Bits = flags & 0x01;
  let payload: {[key: string]: any} = {};
  
  // try to parse it
  try {
    const payload = JSON.parse(dataViewToText(data));
  } catch (error) {
    const payload = {error: error}
  }

  // return payload
  return payload;
}
