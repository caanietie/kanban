import PropTypes from "prop-types";
import { throttle } from "../utils";
import CheckList from "./CheckList";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { positionUpdate } from "../data/cardSlice";
import { CSSTransitionGroup } from "react-transition-group";

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
	const dispatch = useDispatch();
	const [isShown, setIsShown] = useState(false);
	const showDetails = function () {
		return (
			<div className="card__details">
				{props.description}
				<CheckList cardId={props.id}
					tasks={props.tasks}
					dispatch={dispatch}
				/>
			</div>
		)
	}

	const [{ isDragging }, drag] = useDrag(() => ({
		type: "card",
		item: { id: props.id },
		collect: monitor => ({ isDragging: monitor.isDragging() })
	}));
	const { id: overId } = props;
	const [/**{ canDrop, isOver }**/, drop] = useDrop(() => ({
		accept: "card",
		hover: (item, /**monitor**/) => {
			throttle(dispatch(positionUpdate({ draggedId: item.id, overId })), 500)
		},
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	}), [dispatch, positionUpdate, overId]);

	let cardTitle = "card__title";
	if (isShown) cardTitle += " card__title--is-open";
	let borderLeft = { borderLeft: `7px solid ${props.color}` };
	return (
		<div style={borderLeft} ref={node => drag(drop(node))}
			className={"card" + (isDragging ? " card__opacity" : "")}>
			<div className={cardTitle} onClick={() => setIsShown(!isShown)}>
				{props.title}
				<Link to={`/edit/${props.id}`}
					className="card--edit"
					onClick={event => event.stopPropagation()}
				>
					{"\u270E"}
				</Link>
			</div>
			<CSSTransitionGroup transitionName="toggle"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				transitionAppear={true}
				transitionAppearTimeout={300}
			>
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
	tasks: PropTypes.arrayOf(PropTypes.object)
}