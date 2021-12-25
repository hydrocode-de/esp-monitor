import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { bluetooth } from 'ionicons/icons';

import { useAppSelector, useAppDispatch } from "../hooks";
import { connect, disconnect, setConfig, setDeviceId } from "../features/EspNode";
import { add } from "../features/EspMessages";
import { connectSense, subscribeSense, disconnectSense } from "../sense";

interface EspConnectButtonProps {
    useIcon?: "none" | "both" | "only";
}
const EspConnectButton: React.FC<EspConnectButtonProps> = ({useIcon= "both"}) => {
    // create a dispatcher
    const dispatch = useAppDispatch();

    // get the connection state from the store
    const connected = useAppSelector(state => state.esp.connected);

    // get the device from the store
    const deviceId = useAppSelector(state => state.esp.deviceId);

    // define the handler functions
    const stopSense = () => {
        disconnectSense(deviceId!).then(() => dispatch(disconnect()));
    }
    const startSense = () => {
        connectSense().then(device => {
            subscribeSense(device, data => dispatch(add(data)), config => dispatch(setConfig(config)))
            //subscribeSense(device, data => dispatch(add(data)), config => console.log(config))
            .then(() => {
                // we are subscribed -> store device and status to store
                dispatch(connect());
                dispatch(setDeviceId(device.deviceId));
            })
        });
    }

    if (connected) {
        return (
            <IonButton onClick={stopSense} color={useIcon === 'only' ? 'primary': 'default'}>
                    { ['both', 'only'].includes(useIcon) ? <IonIcon slot={useIcon==="only" ? "icon-only" : "start"} icon={bluetooth} /> : null }
                    { ['none', 'both'].includes(useIcon) ?  <IonLabel>DISCONNECT</IonLabel> : null }
            </IonButton>
        )
    } else {
        return (
            <IonButton onClick={startSense} color={useIcon === 'only' ? 'danger': 'default'}>
                { ['both', 'only'].includes(useIcon) ? <IonIcon slot={useIcon==="only" ? "icon-only" : "start"} icon={bluetooth} /> : null }
                { ['none', 'both'].includes(useIcon) ?  <IonLabel>CONNECT</IonLabel> : null }
            </IonButton>
        )
    }
}
EspConnectButton.defaultProps = {useIcon: 'both'}

export default EspConnectButton;