import update from "immutability-helper";

export var cards = [
	{
		"id": 1,
		"title": "Read the Book",
		"description": "I should read the whole book",
		"color": "#8D8D31",
		"status": "in-progress",
		"tasks": []
	},
	{
		"id": 2,
		"title": "Write some code",
		"description": "Code along with the samples in the book",
		"color": "#3A7E28",
		"status": "todo",
		"tasks": [
			{ "id": 1, "name": "ContactList Example", "done": true },
			{ "id": 2, "name": "KanBan Example", "done": false },
			{ "id": 3, "name": "My own experiments", "done": false }
		]
	},
	{
		"id": 3,
		"title": "Buy a Reack Book",
		"description": "Pro: An app should be built throughout the book",
		"color": "#C0BFBC",
		"status": "completed",
		"tasks": []
	}
];

export function getCards() {
	return cards;
}

export function addTask(cardId, taskName) {
	let cardIndex = cards.findIndex(card => card.id === cardId);
	if (cardIndex !== -1) {
		let taskId = cards[cardIndex].tasks.length + 1;
		let newTask = { id: taskId, name: taskName, done: false };
		cards = update(cards, { [cardIndex]: { tasks: { $push: [newTask] } } });
		return cards;
	}
	return false;
}

export function toggleTask(cardId, taskIndex, taskId) {
	let cardIndex = cards.findIndex(card => card.id === cardId);
	if (cards[cardIndex] !== -1 && cards[cardIndex].tasks[taskIndex].id === taskId) {
		cards = update(cards, {
			[cardIndex]: { tasks: { [taskIndex]: { done: { $apply: done => !done } } } }
		});
		return cards;
	}
	return false;
}

export function deleteTask(cardId, taskIndex, taskId) {
	let cardIndex = cards.findIndex(card => card.id === cardId);
	if (cards[cardIndex] !== -1 && cards[cardIndex].tasks[taskIndex].id === taskId) {
		cards = update(cards, {
			[cardIndex]: { tasks: { $splice: [[taskIndex, 1]] } }
		});
		return cards;
	}
	return false;
}

export function statusUpdate(cardId, listStatus) {
	let cardIndex = cards.findIndex(card => card.id === cardId);
	if (cardIndex !== -1 && cards[cardIndex].status !== listStatus) {
		cards = update(cards, { [cardIndex]: { status: { $set: listStatus } } })
		return cards;
	}
	return false;
}

export function positionUpdate(draggedId, overId) {
	let dragIndex = cards.findIndex(card => card.id === draggedId);
	let overIndex = cards.findIndex(card => card.id === overId);
	if (dragIndex !== -1 && overIndex !== -1 && dragIndex !== overIndex) {
		cards = update(cards, {
			$splice: [[dragIndex, 1], [overIndex, 0, cards[dragIndex]]]
		});
		return cards;
	}
	return false;
}

export function addCard(newCard) {
	const cardId = cards.length + 1;
	cards = update(cards, {
		$push: [update(newCard, { $merge: { id: cardId, tasks: [] } })]
	});
	return cards;
}

export function editCard(cardId, editedCard) {
	let cardIndex = cards.findIndex(card => card.id === cardId);
	if (cardIndex !== -1) {
		cards = update(cards, { [cardIndex]: { $merge: editedCard } });
		return cards;
	}
	return false;
}