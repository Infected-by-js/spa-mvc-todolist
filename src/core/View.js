import { PAGES, BTN_SWITCH_STORE_TITLE, CURRENT_STORE_TITLE } from '../shared/constants';
import { Title } from '../shared/ui/';
import { Navigation, AddTodoForm, TodoList, TodoItem, SwitchStoreButton } from '../components/';

export default class View {
	constructor(rootElement) {
		this.rootElement = rootElement;
	}

	createPage = (currentOwner, activeStore) => {
		const btnSwitchStoreTitle = BTN_SWITCH_STORE_TITLE[activeStore];
		const pageTitle = PAGES.find(({ owner }) => owner === currentOwner).title;

		this.navigation = new Navigation(PAGES, currentOwner);
		this.title = new Title(pageTitle);
		this.form = new AddTodoForm();
		this.todoList = new TodoList();
		this.switchStoreButton = new SwitchStoreButton(btnSwitchStoreTitle);
		this.storeTitle = new Title(CURRENT_STORE_TITLE[activeStore], ['fs-6', 'my-3']);

		this.rootElement.textContent = '';
		this.rootElement.append(
			this.navigation.element,
			this.title.element,
			this.form.element,
			this.storeTitle.element,
			this.switchStoreButton.element,
			this.todoList.element
		);

		this.form.element.addEventListener('input', this.handleInput);
	};

	createTodos = (todos) => {
		this.todoList.element.textContent = '';

		const todoElements = todos.map((todo) => new TodoItem(todo).element);

		this.todoList.element.append(...todoElements);
	};

	handleAddTodo(addTodo) {
		this.form.element.addEventListener('submit', (event) => {
			event.preventDefault();

			const input = this.form.input.element;
			const button = this.form.button.element;
			const todoTitle = input.value.trim();

			input.value = '';
			button.disabled = true;

			addTodo(todoTitle);
		});
	}

	handleChangeTodo(doneTodo, deleteTodo) {
		this.todoList.element.addEventListener('click', (event) => {
			const itemId = event.target?.closest('li')?.dataset?.id;
			const buttonName = event.target?.closest('button')?.dataset?.name;

			if (!itemId || !buttonName) return;

			buttonName === 'done' ? doneTodo(itemId) : deleteTodo(itemId);
		});
	}

	handleChangeStore(changeStore) {
		this.switchStoreButton.element.addEventListener('click', changeStore);
	}

	handleChangePage(changeActivePage) {
		this.navigation.element.addEventListener('click', (event) => {
			event.preventDefault();
			const navButton = event.target?.closest('a');
			const pageId = navButton?.dataset?.id;

			if (!navButton || !pageId) return;

			changeActivePage(pageId);

			window.history.pushState({ page: pageId }, pageId, navButton.href);
		});
	}

	handlePopState(changeActivePage) {
		window.addEventListener('popstate', (event) => {
			const page = event.state?.page;

			// redirect to '/'
			if (!page) return changeActivePage(PAGES[0].owner);

			changeActivePage(page);
		});
	}

	handleInput = () => {
		const input = this.form.input.element;
		const button = this.form.button.element;

		button.disabled = !input.value.trim();
	};
}
