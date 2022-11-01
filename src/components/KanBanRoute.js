import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KanBan from "./KanBan";
import NewCard from "./NewCard";
import EditCard from "./EditCard";
import KanBanError from "./KanBanError";

export default function KanBanRoute(props) {
	const { cards, taskCallbacks, cardCallbacks } = props;
	const { onAddCard, onEditCard } = cardCallbacks;
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={
					<KanBan cards={cards} cardCallbacks={cardCallbacks}
						taskCallbacks={taskCallbacks} />}>
					<Route path="new" element={
						<NewCard addCard={onAddCard} />} />
					<Route path="edit/:cardId" element={
						<EditCard cards={cards} editCard={onEditCard} />} />
					<Route path="*" element={
						<KanBanError message="Resource not found" />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

KanBanRoute.propTypes = {
	taskCallbacks: PropTypes.object.isRequired,
	cardCallbacks: PropTypes.object.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object.isRequired)
};