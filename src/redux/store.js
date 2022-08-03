import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  // blacklist: ["globalReducer", "shopReducer"],
  blacklist: ["shopReducer"],
};

const pReducer = persistReducer(persistConfig, rootReducer);
const createdStore = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const initializeStore = (initialState = {}) => {
  return createdStore;
};
export const persistor = persistStore(createdStore);
