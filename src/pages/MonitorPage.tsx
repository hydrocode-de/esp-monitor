import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { registerSense } from '../sense';


const MonitorPage: React.FC = () => {
  // define a state to hold the raw data
  const [rawData, setRawData] = useState<any[]>([]);

  // callback function to store data
  const addRawData = (data: {[key: string]: any}) => {
    const newLog = {...data, timestamp: new Date()};
    setRawData([...rawData, newLog]);
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
            <IonButton onClick={callRegisterSense}>CONNECT</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {rawData.map((log: {timestamp: Date, [key: string]: any}) => {
            return (
              <IonItem>
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
