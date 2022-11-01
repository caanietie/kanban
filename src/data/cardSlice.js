import { cards } from "./cards";
import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "cards",
  initialState: cards,
  reducers: {
    addCard: (state, action) => {
      action.payload.id = Date.now();
      action.payload.tasks = [];
      state.push(action.payload);
      return state;
    },
    editCard: (state, action) => {
      let { cardId, editedCard } = action.payload;
      let cardIndex = state.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        state[cardIndex] = { ...state[cardIndex], ...editedCard };
        return state;
      }
      else return state;
    },
    statusUpdate: (state, action) => {
      const { cardId, listStatus } = action.payload;
      let cardIndex = state.findIndex(card => card.id === cardId);
      if (cardIndex !== -1 && state[cardIndex].status !== listStatus) {
        state[cardIndex].status = listStatus;
        return state;
      }
      else return state;
    },
    positionUpdate: (state, action) => {
      const { draggedId, overId } = action.payload;
      let dragIndex = state.findIndex(card => card.id === draggedId);
      let overIndex = state.findIndex(card => card.id === overId);
      if (dragIndex !== -1 && overIndex !== -1 && dragIndex !== overIndex) {
        state.splice(overIndex, 0, state.splice(dragIndex, 1)[0]);
        return state;
      }
      else return state;
    },
    addTask: (state, action) => {
      const { cardId, taskName } = action.payload;
      let cardIndex = state.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        let newTask = { id: Date.now(), name: taskName.trim(), done: false };
        state[cardIndex].tasks.push(newTask);
        return state;
      }
      else return state;
    },
    toggleTask: (state, action) => {
      const { cardId, taskIndex, taskId } = action.payload;
      let cardIndex = state.findIndex(card => card.id === cardId);
      if (state[cardIndex] !== -1 && state[cardIndex].tasks[taskIndex].id === taskId) {
        let done = state[cardIndex].tasks[taskIndex].done;
        state[cardIndex].tasks[taskIndex].done = !done;
        return state;
      }
      else return state;
    },
    deleteTask: (state, action) => {
      const { cardId, taskIndex, taskId } = action.payload;
      let cardIndex = state.findIndex(card => card.id === cardId);
      if (state[cardIndex] !== -1 && state[cardIndex].tasks[taskIndex].id === taskId) {
        state[cardIndex].tasks.splice(taskIndex, 1);
        return state;
      }
      else return state;
    }
  }
});
const cardReducer = cardSlice.reducer;
export default cardReducer;
export const cardSelector = state => state.cards
export const {
  addCard, editCard, statusUpdate, positionUpdate,
  addTask, toggleTask, deleteTask } = cardSlice.actions;