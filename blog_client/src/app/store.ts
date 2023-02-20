import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { getPersistConfig } from 'redux-deep-persist';
import storage from 'redux-persist/lib/storage';
import loaderSlice from "../features/loader/loaderSlice";
import userInfoSlice from "../features/userInfo/userInfoSlice";
import postSlice from "../features/Post/postSlice";

const rootReducer = combineReducers({
  loader: loaderSlice,
  userInfo: userInfoSlice,
  post: postSlice,
});

const persistConfig = getPersistConfig({
  key: 'root',
  storage,
  blacklist: ['loader', 'userInfo.updatingRow', 'post'],
  rootReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
