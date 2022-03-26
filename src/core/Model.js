import { PAGES, STORAGES } from '../shared/constants';
import { Store } from '../shared/storages';

export default class Model {
	#setTodoStateUpdate = () => {};

	#createTodo(name) {
		return {
			name,
			done: false,
			owner: this.currentOwner,
		};
	}

	constructor(initialTodos) {
		this.currentOwner = window.location?.pathname?.split('/')?.pop() || PAGES[0].owner;
		this.activeStore = STORAGES[0];
		this.todos = initialTodos || (async () => await this.getTodos())();
	}

	todoStateUpdate(callback) {
		this.#setTodoStateUpdate = callback;
	}

	async getTodos() {
		const store = new Store[this.activeStore](this.currentOwner);

		this.todos = await store.getItems();

		this.#setTodoStateUpdate(this.todos);
	}

	async addTodo(todoName) {
		const store = new Store[this.activeStore](this.currentOwner);
		const todo = this.#createTodo(todoName);

		const createdTodo = await store.createItem(todo);

		this.todos = [createdTodo, ...this.todos];

		this.#setTodoStateUpdate(this.todos);
	}

	async doneTodo(todoId) {
		const store = new Store[this.activeStore](this.currentOwner);
		const todo = this.todos.find(({ id }) => id === todoId);

		const updatedTodo = await store.updateItem({ ...todo, done: !todo.done });

		this.todos = this.todos.map((item) => (item.id === todoId ? updatedTodo : item));

		this.#setTodoStateUpdate(this.todos);
	}

	async deleteTodo(todoId) {
		const store = new Store[this.activeStore](this.currentOwner);

		await store.deleteItem(todoId);

		this.todos = this.todos.filter((item) => item.id !== todoId);

		this.#setTodoStateUpdate(this.todos);
	}

	async changeActiveStore() {
		const currentStoreIndex = STORAGES.indexOf(this.activeStore);
		const isLastStoreIndex = currentStoreIndex === STORAGES.length - 1;

		if (isLastStoreIndex) {
			this.activeStore = STORAGES[0];
		} else {
			this.activeStore = STORAGES[currentStoreIndex + 1];
		}

		await this.getTodos();
	}

	async changeCurrentPage(pageId) {
		this.currentOwner = pageId;
		this.activeStore = STORAGES[0];
		await this.getTodos();
	}
}
