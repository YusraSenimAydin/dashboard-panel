import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/orders/ordersSlice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

export default store;
