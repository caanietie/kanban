import cardReducer from "./cardSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { cards: cardReducer }
});
export default store;