import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import Card from "./Card";

export default function List(props) {
	var cards = props.cards.map(card => {
		const { id, title, color, description, tasks } = card;
		return (
			<Card key={id} id={id} title={title} color={color}
				description={description} tasks={tasks}
				taskCallbacks={props.taskCallbacks}
				handlePositionUpdate={props.cardCallbacks.onPositionUpdate} />
		)
	});
	const handleStatusUpdate = props.cardCallbacks.onStatusUpdate;
	const listStatus = props.id;
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: "card",
		drop: (item, monitor) => handleStatusUpdate(item.id, listStatus),
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}), [listStatus, handleStatusUpdate]);
	return (
		<div className={canDrop && isOver ? "list list__drop" : "list"} ref={drop}>
			<h1>{props.title}</h1>
			{cards}
		</div>
	);
}

List.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	cardCallbacks: PropTypes.object.isRequired,
	taskCallbacks: PropTypes.object.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object.isRequired)
}