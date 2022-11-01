import React from "react";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import { addTask } from "../data/cardSlice";

export default class CheckList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { task: "" };
		this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
	}

	render() {
		let tasks = this.props.tasks.map((task, index) => (
			<ListItem cardId={this.props.cardId}
				key={task.id} task={task} taskIndex={index}
				dispatch={this.props.dispatch}
			/>
		));
		return (
			<div className="checklist">
				<ul>{tasks}</ul>
				<input value={this.state.task}
					type="text" className="checklist--add-task"
					placeholder="Type then hit enter to add a task"
					onKeyPress={this.handleEnterKeyPress}
					onChange={event => this.setState({ task: event.target.value })}
				/>
			</div>
		);
	}

	handleEnterKeyPress(event) {
		if (event.key.toLowerCase() === "enter") {
			const cardId = this.props.cardId;
			this.props.dispatch(addTask({ cardId, taskName: event.target.value }));
			this.setState({ task: "" });
		}
	}
}

CheckList.propTypes = {
	cardId: PropTypes.number,
	dispatch: PropTypes.func.isRequired,
	tasks: PropTypes.arrayOf(PropTypes.object)
}