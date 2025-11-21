import type { Persistor } from "redux-persist";

let persistorRef: Persistor | null = null;

export const setPersistor = (persistor: Persistor) => {
  persistorRef = persistor;
};

export const getPersistor = () => persistorRef;
