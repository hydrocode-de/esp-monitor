import { configureStore } from '@reduxjs/toolkit';
import espMessagesReducer from './features/EspNode';

export const store = configureStore({
    reducer: {
        espMessages: espMessagesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;