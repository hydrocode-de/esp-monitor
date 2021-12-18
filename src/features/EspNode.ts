import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EspPayload } from '../Payload.model';

export interface EspNodeState {
    messages: EspPayload[];
    deviceId?: string;
}

// define the initial internal state of the application
const initialState: EspNodeState = {
    messages: [],
}

export const espMessageSlice = createSlice({
    name: 'espMessage',
    initialState,
    reducers: {
        // add a new EspPayload message to the stack
        add: (state, action: PayloadAction<EspPayload>) => {
            state.messages.push({...action.payload, timestamp: new Date().toISOString()});
        },

        clear: (state) => {
            state.messages = [];
        }
    }
});

// create a redux Action for each case of the reducer
export const { add, clear } = espMessageSlice.actions;

// export the reducer generated code
export default espMessageSlice.reducer;