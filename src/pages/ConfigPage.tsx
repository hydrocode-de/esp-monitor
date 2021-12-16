import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const ConfigPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Device configuration</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
}

export default ConfigPage;