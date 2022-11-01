import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CardForm from "./CardForm";
import KanBanError from "./KanBanError";

export default function EditCard(props) {
  const cardId = parseInt(useParams().cardId);
  const card = props.cards.find(card => card.id === cardId);
  if (card) {
    const { title, color, status, description } = card;
    return (
      <CardForm buttonLabel="Edit Card" title={title} color={color}
        status={status} description={description}
        handleSubmit={editedCard => props.editCard(cardId, editedCard)} />
    )
  }
  else return <KanBanError message="Card not found" />;
}

EditCard.propTypes = {
  editCard: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object.isRequired)
}