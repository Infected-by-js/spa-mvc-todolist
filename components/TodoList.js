import { BasicElement } from '../shared/ui';

export class TodoList extends BasicElement {
	constructor() {
		super('ul', ['list-group']);
	}
}
