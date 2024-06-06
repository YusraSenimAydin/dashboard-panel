import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [
      { id: 1, tableNumber: 1, totalPrice: 50 },
      { id: 2, tableNumber: 2, totalPrice: 75 },
      { id: 3, tableNumber: 8, totalPrice: 725 },
      { id: 4, tableNumber: 10, totalPrice: 80 },
      { id: 5, tableNumber: 3, totalPrice: 43 },
      { id: 6, tableNumber: 6, totalPrice: 83 },
      { id: 7, tableNumber: 63, totalPrice: 83 },
      { id: 8, tableNumber: 6, totalPrice: 83 },
      { id: 9, tableNumber: 6, totalPrice: 83 },
      { id: 10, tableNumber: 6, totalPrice: 83 },
      { id: 11, tableNumber: 6, totalPrice: 83 },
      { id: 12, tableNumber: 6, totalPrice: 83 },
      { id: 13, tableNumber: 67, totalPrice: 83 },
      { id: 14, tableNumber: 33, totalPrice: 83 },
      { id: 15, tableNumber: 9, totalPrice: 83 },
      { id: 16, tableNumber: 43, totalPrice: 83 },
      { id: 17, tableNumber: 6, totalPrice: 83 },
      { id: 18, tableNumber: 26, totalPrice: 83 },
      { id: 19, tableNumber: 35, totalPrice: 83 },
      { id: 20, tableNumber: 78, totalPrice: 83 },
    ],
    pastOrders: [],
    currentOrder: null,
    paymentAmounts: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    completeOrder: (state, action) => {
      const orderId = action.payload;
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      const completedOrder = state.orders.splice(orderIndex, 1)[0];
      state.pastOrders.push(completedOrder);
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    addPayment: (state, action) => {
      state.paymentAmounts.push(action.payload);
    },
    updatePayment: (state, action) => {
      const { id, amount } = action.payload;
      const paymentIndex = state.paymentAmounts.findIndex(payment => payment.id === id);
      if (paymentIndex !== -1) {
        state.paymentAmounts[paymentIndex].amount = amount;
      }
    },
    deletePayment: (state, action) => {
      state.paymentAmounts = state.paymentAmounts.filter(payment => payment.id !== action.payload);
    },
    resetPayments: (state) => {
      state.paymentAmounts = [];
    },
  },
});

export const { addOrder, completeOrder, setCurrentOrder, addPayment, updatePayment, deletePayment, resetPayments } = ordersSlice.actions;

export default ordersSlice.reducer;
