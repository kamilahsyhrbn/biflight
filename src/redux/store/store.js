import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import loginReducers from "../reducers/auth/loginReducers";
import registerReducers from "../reducers/auth/registerReducers";
import otpReducers from "../reducers/auth/otpReducers";
import passwordSlice from "../reducers/auth/passwordSlice";
import flightReducers from "../reducers/flight/flightReducers";
import paymentReducers from "../reducers/flight/paymentReducers";
import bookingReducers from "../reducers/flight/bookingReducers";
import userReducers from "../reducers/user/userReducers";
import notificationReducers from "../reducers/flight/notificationReducers";
import ticketReducers from "../reducers/ticket/ticketReducers";
import transactionReducers from "../reducers/flight/transactionReducers";

const rootReducer = combineReducers({
  login: loginReducers,
  register: registerReducers,
  otp: otpReducers,
  authPass: passwordSlice,
  flight: flightReducers,
  payment: paymentReducers,
  booking: bookingReducers,
  user: userReducers,
  notification: notificationReducers,
  ticket: ticketReducers,
  transaction: transactionReducers,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
