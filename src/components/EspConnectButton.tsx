import { IonButton } from "@ionic/react";

import { useAppSelector, useAppDispatch } from "../hooks";
import { connect, disconnect, setConfig, setDeviceId } from "../features/EspNode";
import { add } from "../features/EspMessages";
import { connectSense, subscribeSense, disconnectSense } from "../sense";

const EspConnectButton: React.FC = () => {
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
            .then(() => {
                // we are subscribed -> store device and status to store
                dispatch(connect());
                dispatch(setDeviceId(device.deviceId));
            })
        });
    }

    if (connected) {
        return <IonButton onClick={stopSense}>DISCONNECT</IonButton>
    } else {
        return <IonButton onClick={startSense}>CONNECT</IonButton>
    }
}

export default EspConnectButton;