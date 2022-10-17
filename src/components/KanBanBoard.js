import React from "react";
import PropTypes from "prop-types";

import List from "./List";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link, Outlet } from "react-router-dom";

export default function KanBanBoard(props) {
	const { taskCallbacks, cardCallbacks } = props;
	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<div className="KanBanBoard">
					<List id="todo" title="To Do"
						cardCallbacks={cardCallbacks} taskCallbacks={taskCallbacks}
						cards={props.cards.filter(card => card.status === "todo")} />
					<List id="in-progress" title="In Progress"
						cardCallbacks={cardCallbacks} taskCallbacks={taskCallbacks}
						cards={props.cards.filter(card => card.status === "in-progress")} />
					<List id="completed" title="Completed"
						cardCallbacks={cardCallbacks} taskCallbacks={taskCallbacks}
						cards={props.cards.filter(card => card.status === "completed")} />
					<Link to="/new" className="plusSign">{"\uFF0B"}</Link>
				</div>
			</DndProvider>
			<Outlet />
		</div>
	);
}

KanBanBoard.propTypes = {
	taskCallbacks: PropTypes.object.isRequired,
	cardCallbacks: PropTypes.object.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object)
};