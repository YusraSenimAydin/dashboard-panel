// src/Features/orders/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [
    { id: 1, tableNumber: 1, totalPrice: 50 },
    { id: 2, tableNumber: 2, totalPrice: 75 },
    { id: 3, tableNumber: 8, totalPrice: 725 },
    { id: 4, tableNumber: 10, totalPrice: 80 },
    { id: 5, tableNumber: 3, totalPrice: 43 },
    { id: 6, tableNumber: 6, totalPrice: 83 },
  ],
  pastOrders: [],
  currentOrder: null,
  paymentAmounts: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    completeOrder: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload
      );
      if (index !== -1) {
        const completedOrder = state.orders.splice(index, 1);
        state.pastOrders.push(completedOrder[0]);
        state.currentOrder = null;
      }
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    addPayment: (state, action) => {
      state.paymentAmounts.push(action.payload);
    },
    resetPayments: (state) => {
      state.paymentAmounts = [];
    },
  },
});

export const { addOrder, completeOrder, setCurrentOrder, addPayment, resetPayments } = ordersSlice.actions;
export default ordersSlice.reducer;
