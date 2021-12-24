import { IonBackButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router";
import { EspConfig } from "../../models";

interface SensorDetailPageProps {
    config: EspConfig;
}

const SensorDetailPage: React.FC<SensorDetailPageProps> = ({ config }) => {
    // get the sensor index from the params
    const { index } = useParams<{index: string}>();

    // load the sensor
    const sensor = config.sensors[Number(index)];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Sensor details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel>Sensor Name</IonLabel>
                        <IonInput className="ion-text-right" type="text" value={sensor.name} disabled />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Device Function</IonLabel>
                        <IonInput className="ion-text-right" type="text" value={sensor._func} disabled />
                    </IonItem>
                    <IonListHeader>
                        <IonLabel>Attributes: <code>{sensor._func}(**kwargs)</code></IonLabel>
                    </IonListHeader>
                    { Object.entries(sensor.kwargs).map(([key, value]) => {
                        return (
                            <IonItem key={key}>
                                <IonLabel>{key}</IonLabel>
                                <IonInput className="ion-text-right" type="text" value={value} disabled />
                            </IonItem>
                        )
                    })}
                    { Object.keys(sensor.kwargs).length === 0 ? <IonItem className="ion-text-center" lines="none"><IonLabel>No Attributes</IonLabel></IonItem> : null }
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default SensorDetailPage;