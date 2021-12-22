import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EspConfig } from "../models";


export interface EspNodeState {
    deviceId?: string;
    config?: EspConfig;
    connected: boolean;
}

const initialState: EspNodeState = {
    connected: false
}

export const espNodeSlice = createSlice({
    name: 'espNode',
    initialState,
    reducers: {
        setConfig: (state, action: PayloadAction<EspConfig>) => {
            state.config = action.payload;
        },
        connect: (state) => {
            state.connected = true;
        },
        disconnect: (state) => {
            state.connected = false;
            state.deviceId = undefined;
        },
        setDeviceId: (state, action: PayloadAction<string>) => {
            state.deviceId = action.payload;
        }
    }
});


// export the actions 
export const { setConfig, connect, disconnect, setDeviceId } = espNodeSlice.actions;

// export the reducer generated code as module default
export default espNodeSlice.reducer;