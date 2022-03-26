export default class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;

		this.model.todoStateUpdate(this.view.createTodos);

		this.renderPage();
		this.view.handlePopState(this.changePage);
	}

	renderPage = () => {
		this.view.createPage(this.model.currentOwner, this.model.activeStore);

		this.view.handleAddTodo(this.addTodo);
		this.view.handleChangeTodo(this.doneTodo, this.deleteTodo);
		this.view.handleChangeStore(this.changeStore);
		this.view.handleChangePage(this.changePage);
	};

	addTodo = (todoName) => {
		this.model.addTodo(todoName);
	};

	doneTodo = (todoId) => {
		this.model.doneTodo(todoId);
	};

	deleteTodo = (todoId) => {
		this.model.deleteTodo(todoId);
	};

	changeStore = () => {
		this.model.changeActiveStore();
		this.renderPage();
	};

	changePage = (pageId) => {
		this.model.changeCurrentPage(pageId);
		this.renderPage();
	};
}
