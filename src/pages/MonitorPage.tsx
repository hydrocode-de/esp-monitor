import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import  cloneDeep  from 'lodash.clonedeep';

import { connectSense, subscribeSense, disconnectSense, sendConfig, developmentFakeSensor } from '../sense';
import { BleDevice } from '@capacitor-community/bluetooth-le';


const MonitorPage: React.FC = () => {
  // define a state to hold the raw data
  const [rawData, setRawData] = useState<any[]>([]);
  const [device, setDevice] = useState<BleDevice | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);

  // callback function to store data
  const addRawData = (data: {[key: string]: any}) => {
    const newLog = {...cloneDeep(data), timestamp: new Date()};
    setRawData(old => [...old, newLog]);
  }

  // define a wrapper for the registration function
  const callRegisterSense = () => {
    connectSense().then(dev => {
      setDevice(dev);
      setConnected(true);
      subscribeSense(dev, addRawData, config => console.log(config));
    });
  }

  const stopSense = () => {
    if (device) {
      disconnectSense(device).then(() => setConnected(false));
    } else {
      console.log('No connected device to stop');
    }
  }

  const requestConfig = () => {
    if (device) {
      sendConfig(device, {config: 'get'}).then(() => console.log('sent config request'));
    } else {
      console.log('No connected device to request config');
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ESP Monitor</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={requestConfig}>CONFIG</IonButton>
            <IonButton onClick={() => developmentFakeSensor(addRawData)}>FAKE SENSOR</IonButton>
            { connected ? (
              <IonButton onClick={() => stopSense()} color="warn">DISCONNECT</IonButton>
            ) : (
              <IonButton onClick={callRegisterSense}>CONNECT</IonButton>
            ) }
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {rawData.map((log: {timestamp: Date, [key: string]: any}) => {
            return (
              <IonItem key={log.timestamp.toISOString()}>
                <code>{JSON.stringify(log, undefined, 4)}</code>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MonitorPage;
