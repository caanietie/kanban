import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { throttle } from "../utils";
import { useDispatch } from "react-redux";
import { statusUpdate } from "../data/cardSlice";

export default function List(props) {
	const dispatch = useDispatch();
	var cards = props.cards.map(card => {
		const { id, title, color, description, tasks } = card;
		return (
			<Card key={id} id={id}
				title={title} color={color}
				description={description} tasks={tasks}
			/>
		)
	});
	const listStatus = props.id;
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: "card",
		drop: (item, /**monitor**/) => {
			throttle(dispatch(statusUpdate({ cardId: item.id, listStatus })))
		},
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}), [dispatch, statusUpdate, listStatus]);
	return (
		<div ref={drop}
			className={canDrop && isOver ? "list list__drop" : "list"}
		>
			<h1>{props.title}</h1>
			{cards}
		</div>
	);
}

List.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object.isRequired)
}