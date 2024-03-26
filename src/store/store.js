import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authorizationSlice from "../features/authorization/authorizationSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: authorizationSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "histograms/getHistograms/fulfilled",
          "publicationIds/getObjectSearchId/fulfilled",
          "publication/getObjectSearch/fulfilled",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
