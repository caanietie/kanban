import React from "react";
import PropTypes from "prop-types";
import CardForm from "./CardForm";

export default function NewCard(props) {
  return (
    <CardForm buttonLabel="Create Card" handleSubmit={props.addCard} />
  )
}

NewCard.propTypes = {
  addCard: PropTypes.func.isRequired
}