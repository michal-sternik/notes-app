import { configureStore } from "@reduxjs/toolkit";
import colorReducer from './colorSlice';
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        color: colorReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;