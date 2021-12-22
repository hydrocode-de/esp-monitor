import { IonButton, IonIcon } from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';
import { useState } from 'react';
import { CreateAnimation } from '@ionic/react';

import { useAppSelector } from '../hooks';
import { sendConfig } from '../sense';

const EspRefreshConfigButton: React.FC = () => {
    // load the deviceId from the store
    const deviceId = useAppSelector(state => state.esp.deviceId);

    // create a state for the animation
    const [loading, setLoading] = useState<boolean>(false);

    // if there is no device Id, return a disabled button
    if (!deviceId) {
        return <IonButton disabled><IonIcon slot="icon-only" icon={refreshOutline} /></IonButton>
    }

    // define the wrapper to send the get-config request
    const refreshConfig = () => {
        // start the laoding animation
        setLoading(true);

        // request the config
        sendConfig(deviceId, {config: 'get'}).finally(() => setLoading(false));
    }

    // display the button according to the state
    if (loading) {
        return (
            <CreateAnimation duration={1500} iterations={Infinity} play={loading}
                fromTo={{
                    property: 'transform',
                    fromValue: 'rotate(0deg)',
                    toValue: 'rotate(360deg)'
                }}>
                    <IonButton disabled>
                        <IonIcon slot="icon-only" icon={refreshOutline} />
                    </IonButton>
            </CreateAnimation>
        );
    } else {
        return <IonButton onClick={refreshConfig}><IonIcon slot="icon-only" icon={refreshOutline} /></IonButton>
    }
}

export default EspRefreshConfigButton;