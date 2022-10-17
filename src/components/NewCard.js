import React from "react";
import CardForm from "./CardForm";

export default function NewCard(props) {
  return (
    <CardForm buttonLabel="Create Card" handleSubmit={props.addCard} />
  )
}