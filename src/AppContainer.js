import "./App.css";
import React, { useState } from "react";
import { throttle } from "./utils";
import {
  addTask, deleteTask, positionUpdate, cards,
  statusUpdate, toggleTask, addCard, editCard
} from "./data/cards";
import KanBanBoard from "./components/KanBanBoard";

export default function AppContainer() {
  const [cardList, setCardList] = useState(cards);

  const handleAddTask = function (cardId, taskName) {
    let result = addTask(cardId, taskName);
    if (result) setCardList(result);
  }

  const handleToggleTask = function (cardId, taskIndex, taskId) {
    let result = toggleTask(cardId, taskIndex, taskId);
    if (result) setCardList(result);
  }

  const handleDeleteTask = function (cardId, taskIndex, taskId) {
    let result = deleteTask(cardId, taskIndex, taskId);
    if (result) setCardList(result);
  }

  const handleStatusUpdate = function (cardId, listStatus) {
    let result = statusUpdate(cardId, listStatus);
    if (result) setCardList(result);
  }

  const handlePositionUpdate = function (draggedId, overId) {
    let result = positionUpdate(draggedId, overId);
    if (result) setCardList(result);
  }

  const handleAddCard = function (newCard) {
    let result = addCard(newCard);
    setCardList(result);
  }

  const handleEditcard = function (cardId, editedCard) {
    let result = editCard(cardId, editedCard);
    if (result) setCardList(result);
  }

  return (
    <KanBanBoard cards={cardList}
      taskCallbacks={{
        onAddTask: handleAddTask,
        onToggleTask: handleToggleTask,
        onDeleteTask: handleDeleteTask
      }}
      cardCallbacks={{
        onAddCard: handleAddCard,
        onEditCard: handleEditcard,
        onStatusUpdate: throttle(handleStatusUpdate),
        onPositionUpdate: throttle(handlePositionUpdate, 500)
      }} />
  )
}