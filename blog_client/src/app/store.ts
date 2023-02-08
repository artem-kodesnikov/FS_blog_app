import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "../features/loader/loaderSlice";

const store = configureStore({
  reducer: {
    loader: loaderSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
