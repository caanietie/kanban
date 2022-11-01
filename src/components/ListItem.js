import React from "react";
import PropTypes from "prop-types";
import { deleteTask, toggleTask } from "../data/cardSlice";

export default class ListItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	render() {
		const { done, name } = this.props.task;
		return (
			<li className="checklist__task">
				<input type="checkbox"
					defaultChecked={done}
					onChange={this.handleToggle}
				/>
				{` ${name} `}
				<span className="checklist__task--remove"
					onClick={this.handleDelete}
				/>
			</li>
		);
	}

	handleToggle() {
		const taskId = this.props.task.id;
		const { cardId, taskIndex } = this.props;
		this.props.dispatch(toggleTask({ cardId, taskIndex, taskId }));
	}

	handleDelete() {
		const taskId = this.props.task.id;
		const { cardId, taskIndex } = this.props;
		this.props.dispatch(deleteTask({ cardId, taskIndex, taskId }));
	}
}

ListItem.propTypes = {
	task: PropTypes.object,
	cardId: PropTypes.number,
	dispatch: PropTypes.func,
	taskIndex: PropTypes.number
};