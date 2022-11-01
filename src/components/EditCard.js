import React from "react";
import CardForm from "./CardForm";
import KanBanError from "./KanBanError";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cardSelector, editCard } from "../data/cardSlice";

export default function EditCard() {
  const cardId = parseInt(useParams().cardId);
  const cards = useSelector(cardSelector);
  const card = cards.find(card => card.id === cardId);
  if (card) {
    const { title, color, status, description } = card;
    return (
      <CardForm buttonLabel="Edit Card"
        title={title} color={color}
        status={status} description={description}
        handleSubmit={editedCard => editCard({ cardId, editedCard })}
      />
    )
  }
  else return <KanBanError message="Card not found" />;
}