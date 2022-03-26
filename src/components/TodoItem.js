import { BasicElement, Button } from '../shared/ui';
export class TodoItem extends BasicElement {
	constructor({ id, name, done }) {
		super('li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center']);

		this.buttonsWrapp = new BasicElement('div', ['btn-group', 'btn-group-sm', 'gap-2']).element;
		this.doneButton = new Button('Готово', ['btn', 'btn-success']).element;
		this.deleteButton = new Button('Удалить', ['btn', 'btn-danger']).element;

		this.element.textContent = name;
		this.element.classList.toggle('list-group-item-success', done);

		this.element.dataset.id = id;
		this.doneButton.dataset.name = 'done';
		this.deleteButton.dataset.name = 'delete';

		this.buttonsWrapp.append(this.doneButton, this.deleteButton);
		this.element.append(this.buttonsWrapp);
	}
}
