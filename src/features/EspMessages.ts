import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EspPayload } from '../models';

export interface EspMessageState {
    messages: EspPayload[];
}

// define the initial internal state of the application
const initialState: EspMessageState = {
    messages: []
}

export const espMessageSlice = createSlice({
    name: 'espMessage',
    initialState,
    reducers: {
        // add a new EspPayload message to the stack
        add: (state, action: PayloadAction<{[key: string]: any}>) => {
            const message = {_id: 'anonymous sensor', ...action.payload, timestamp: new Date().toISOString()}
            state.messages.push(message);
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