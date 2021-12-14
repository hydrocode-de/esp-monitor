import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import  cloneDeep  from 'lodash.clonedeep';

import { registerSense, developmentFakeSensor } from '../sense';


const MonitorPage: React.FC = () => {
  // define a state to hold the raw data
  const [rawData, setRawData] = useState<any[]>([]);

  // callback function to store data
  const addRawData = (data: {[key: string]: any}) => {
    const newLog = {...cloneDeep(data), timestamp: new Date()};
    setRawData(old => [...old, newLog]);
  }

  // define a wrapper for the registration function
  const callRegisterSense = () => {
    registerSense(addRawData);
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ESP Monitor</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => developmentFakeSensor(addRawData)}>FAKE SENSOR</IonButton>
            <IonButton onClick={callRegisterSense}>CONNECT</IonButton>
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
