import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {
  user: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: initialState,
});

export default store;
