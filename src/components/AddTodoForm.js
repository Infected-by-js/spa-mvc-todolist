import { BasicElement, Button } from '../shared/ui';

export class AddTodoForm extends BasicElement {
	constructor() {
		super('form', ['input-group', 'mb-3', 'gap-3']);

		this.input = new BasicElement('input', ['form-control']);
		this.buttonWrapper = new BasicElement('div', ['input-group-append']);
		this.button = new Button('Добавить дело', ['btn', 'btn-primary']);

		this.input.element.placeholder = 'Введите название нового дела';
		this.input.element.setAttribute('autofocus', '');
		this.button.element.disabled = true;

		this.buttonWrapper.element.append(this.button.element);
		this.element.append(this.input.element, this.buttonWrapper.element);
	}
}
