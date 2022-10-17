import React from "react";
import { useParams } from "react-router-dom";
import CardForm from "./CardForm";

export default function EditCard(props) {
  const cardId = parseInt(useParams().cardId);
  const card = props.cardList.find(card => card.id === cardId);
  const { title, color, status, description } = card;
  return (
    <CardForm buttonLabel="Edit Card" title={title} color={color}
      status={status} description={description}
      handleSubmit={editedCard => props.editCard(cardId, editedCard)} />
  )
}