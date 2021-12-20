export interface EspPayload {
    _id: string;
    timestamp: string;
    [key: string]: any;
}

export interface EspConnectedSensor {
    name: string;
    _func: string;
    kwargs: {[key: string]: any};
}

export interface EspConfig {
    ble_name: string;
    notify_interval: number;
    sensors: EspConnectedSensor[]
}