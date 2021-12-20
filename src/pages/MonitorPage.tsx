import { IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { useAppSelector } from '../hooks';
import EspConnectButton from '../components/EspConnectButton';



const MonitorPage: React.FC = () => {  
  // load the raw payloads from the store
  const messages = useAppSelector(state => state.espMessages.messages);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ESP Monitor</IonTitle>
          <IonButtons slot="end">
            <EspConnectButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {messages.map(message => (
            <IonItem key={message.timestamp}>
              <pre><code>{JSON.stringify(message, undefined, 4)}</code></pre>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MonitorPage;
