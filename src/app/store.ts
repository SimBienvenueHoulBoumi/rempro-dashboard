import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";

/**
 * Configure le store Redux avec le reducer d'authentification.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

/**
 * Type représentant l'état global du store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type représentant la fonction dispatch du store Redux.
 */
export type AppDispatch = typeof store.dispatch;
