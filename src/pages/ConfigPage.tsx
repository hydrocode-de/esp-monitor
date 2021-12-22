import { IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import EspRefreshConfigButton from "../components/EspRefreshConfigButton";

const ConfigPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Device configuration</IonTitle>
                    <IonButtons slot="end">
                        <EspRefreshConfigButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    );
}

export default ConfigPage;