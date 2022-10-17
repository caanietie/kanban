import React from "react";
import PropTypes from "prop-types";

import ListItem from "./ListItem";

export default class CheckList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { task: "" };
		this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
	}
	render() {
		const { onToggleTask, onDeleteTask } = this.props.taskCallbacks;
		let tasks = this.props.tasks.map((task, index) => (
			<ListItem cardId={this.props.cardId}
				key={task.id} task={task} taskIndex={index}
				onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />
		));
		return (
			<div className="checklist">
				<ul>{tasks}</ul>
				<input value={this.state.initTask}
					type="text" className="checklist--add-task"
					placeholder="Type then hit enter to add a task"
					onKeyPress={this.handleEnterKeyPress}
					onChange={event => this.setState({ task: event.target.value })} />
			</div>
		);
	}
	handleEnterKeyPress(event) {
		if (event.key.toLowerCase() === "enter") {
			const cardId = this.props.cardId;
			this.props.taskCallbacks.onAddTask(cardId, event.target.value);
			event.target.value = "";
		}
	}
}

CheckList.propTypes = {
	cardId: PropTypes.number,
	taskCallbacks: PropTypes.object,
	tasks: PropTypes.arrayOf(PropTypes.object)
}