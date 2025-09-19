import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  combineReducers,
  configureStore,
  UnknownAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

import { AuthSlice, CommonSlice, theme } from ".";
import { api } from "../services/api";

const reducers = combineReducers({
  theme,
  auth: AuthSlice,
  common: CommonSlice,
  [api.reducerPath]: api.reducer,
});

const rootReducer = (
  state: ReturnType<typeof reducers> | undefined,
  action: UnknownAction
) => {
  /* if you are using RTK, you can import your action and use it's type property instead of the literal definition of the action  */
  if (action.type === "logout") {
    return reducers(undefined, { type: undefined } as any);
  }

  return reducers(state, action);
};

export const reduxStorage = {
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, value);
    return true;
  },
  getItem: async (key: string) => {
    return await AsyncStorage.getItem(key);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

const persistConfig: PersistConfig<ReturnType<typeof reducers>> = {
  key: "root",
  storage: reduxStorage,
  whitelist: ["auth", "favorite"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(api.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>; // 👈 Root state type
export type AppDispatch = typeof store.dispatch;

export { persistor, store };
