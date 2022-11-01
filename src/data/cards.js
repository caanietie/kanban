export const cards = [
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