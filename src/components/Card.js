import React, { useState } from "react";
import PropTypes from "prop-types";
import { CSSTransitionGroup } from "react-transition-group";
import CheckList from "./CheckList";
import { useDrag, useDrop } from "react-dnd";
import { Link } from "react-router-dom";

function titlePropType(props, propName, componentName) {
	if (props[propName]) {
		let propValue = props[propName];
		if (typeof propValue !== "string" || propValue.length > 80)
			return new Error(
				`${propName} in ${componentName} should be a string of length < 50`
			);
	}
}

export default function Card(props) {
	const [isShown, setIsShown] = useState(false);
	const showDetails = function () {
		return (
			<div className="card__details">
				{props.description}
				<CheckList cardId={props.id} tasks={props.tasks}
					taskCallbacks={props.taskCallbacks} />
			</div>
		)
	}

	const [{ isDragging }, drag] = useDrag(() => ({
		type: "card",
		item: { id: props.id },
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	}));
	const { id: overId, handlePositionUpdate } = props;
	// eslint-disable-next-line
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: "card",
		hover: (item, monitor) => handlePositionUpdate(item.id, overId),
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}), [overId, handlePositionUpdate]);

	let cardTitle = "card__title";
	if (isShown) cardTitle += " card__title--is-open";
	let borderLeft = { borderLeft: `7px solid ${props.color}` };
	return (
		<div style={borderLeft} ref={node => drag(drop(node))}
			className={"card" + (isDragging ? " card__opacity" : "")}>
			<div className={cardTitle} onClick={() => setIsShown(!isShown)}>
				{props.title}
				<Link to={`/edit/${props.id}`} className="card--edit"
					onClick={event => event.stopPropagation()}>
					{"\u270E"}
				</Link>
			</div>
			<CSSTransitionGroup transitionName="toggle"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				transitionAppear={true}
				transitionAppearTimeout={300}>
				{isShown ? showDetails() : ""}
			</CSSTransitionGroup>
		</div >
	);
}

Card.propTypes = {
	id: PropTypes.number,
	title: titlePropType,
	color: PropTypes.string,
	description: PropTypes.string,
	taskCallbacks: PropTypes.object,
	handlePositionUpdate: PropTypes.func,
	tasks: PropTypes.arrayOf(PropTypes.object)
}