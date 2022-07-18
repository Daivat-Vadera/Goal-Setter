import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalsReducer from "../features/goals/goalsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
  },
});

export default store;
