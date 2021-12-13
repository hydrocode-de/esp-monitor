import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { registerSense } from '../sense';

const callRegisterSense = () => {
  registerSense();
}

const MonitorPage: React.FC = () => {
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


        <h1>Monitor Application</h1>

      </IonContent>
    </IonPage>
  );
};

export default MonitorPage;
