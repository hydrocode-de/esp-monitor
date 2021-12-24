import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useAppSelector } from "../../hooks";

import EspConnectButton from "../../components/EspConnectButton";
import EspRefreshConfigButton from "../../components/EspRefreshConfigButton";
import { EspConfig } from "../../models";
import ConfigDetailPage from "./ConfigDetailPage";
import { Redirect, Route } from "react-router";
import SensorDetailPage from "./SensorDetailPage";


const DEV: EspConfig = {
    ble_name: "ESP32",
    notify_interval: 1000,
    sensors: [
        {name: "Temperature",_func: "get_temp",kwargs: {foo: 'bar'}},
        {name: "Light",_func: "get_light",kwargs: {}}
    ]
}

/**
 * Default page to inform the user that no device is connected, or no
 * config was requested from the device

 * @param param0 
 * @returns 
 */
const NoDevicePage: React.FC<{connected: boolean}> = ({connected}) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Device configuration</IonTitle>
                    <IonButtons slot="end">
                        <EspConnectButton />
                        {connected ? <EspRefreshConfigButton /> : null}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid style={{height: '100%'}}>
                    <IonRow className="ion-justify-content-center ion-align-items-center" style={{height: '100%'}}>
                        <IonCol size="10" sizeMd="6" sizeLg="4">
                            <IonCard>
                                <IonCardContent style={{textAlign: 'center', padding: '10%'}}>
                                    {!connected ? (
                                        <i>No device connected</i>
                                    ) : (
                                        <i>No config received, try to refresh</i>
                                    )}
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

const ConfigPage: React.FC = () => {
    // load the deviceId to see if a device is connected
    //const connected = useAppSelector(state => !!state.esp.deviceId)
    const connected = true;

    // load the config
    //const config = useAppSelector(state => state.esp.config);
    const config = DEV;

    if (!connected || !config) {
        return <NoDevicePage connected={connected} />
    }
    return (
        <IonRouterOutlet>
            <Route exact path="/config">
                <ConfigDetailPage config={config} />
            </Route>
            <Route exact path="/config/sensors/:index">
                <SensorDetailPage config={config} />
            </Route>
        </IonRouterOutlet>
    );
}

export default ConfigPage;