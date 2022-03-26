export class SessionStorage {
	#parse(value) {
		return JSON.parse(value);
	}
	#stringify(value) {
		return JSON.stringify(value);
	}

	constructor(owner) {
		this.owner = owner;
	}

	async getItems() {
		const items = this.#parse(sessionStorage.getItem(this.owner)) || [];

		return Promise.resolve(items);
	}

	async createItem(todo) {
		const items = await this.getItems(this.owner);
		const newItem = { ...todo, id: Date.now().toString(16) };

		sessionStorage.setItem(this.owner, this.#stringify([newItem, ...items]));

		return Promise.resolve(newItem);
	}

	async updateItem(todo) {
		const items = await this.getItems(this.owner);
		const updatedItems = items.map((item) => (item.id === todo.id ? todo : item));

		sessionStorage.setItem(this.owner, this.#stringify(updatedItems));

		return Promise.resolve(todo);
	}

	async deleteItem(todoId) {
		const items = await this.getItems(this.owner);
		const newItems = items.filter(({ id }) => id !== todoId);

		sessionStorage.setItem(this.owner, this.#stringify(newItems));

		return Promise.resolve(todoId);
	}
}
