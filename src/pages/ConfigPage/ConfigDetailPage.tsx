import { IonList, IonListHeader, IonItem, IonLabel, IonInput, IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/react';
import { useParams } from 'react-router';
import EspRefreshConfigButton from '../../components/EspRefreshConfigButton';
import { EspConfig } from '../../models';


interface ConfigDetailPageProps {
    config: EspConfig;
}

const ConfigDetailPage: React.FC<ConfigDetailPageProps> = ({ config }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{config.ble_name} configuration</IonTitle>
                    <IonButtons slot="end">
                        <EspRefreshConfigButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonListHeader>Device Settings</IonListHeader>
                    {Object.entries(config).map(([key, value]) => {
                        return key === 'sensors' ? null : (
                            <IonItem key={key}>
                                <IonLabel>{key}</IonLabel>
                                <IonInput className="ion-text-right" value={value} readonly />
                            </IonItem>
                        );
                    })}

                    <IonListHeader>Sensors configured</IonListHeader>
                    {config.sensors.map((sensor, index) => {
                        return (
                            <IonItem key={index} routerLink={`/config/sensors/${index}`} routerDirection="forward" >
                                <IonLabel>{sensor.name}</IonLabel>
                            </IonItem>
                        )
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default ConfigDetailPage;