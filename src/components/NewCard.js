import React from "react";
import CardForm from "./CardForm";
import { addCard } from "../data/cardSlice";

export default function NewCard() {
  return <CardForm buttonLabel="Create Card" handleSubmit={addCard} />;
}