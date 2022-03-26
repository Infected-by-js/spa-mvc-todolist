import { BasicElement } from './BasicElement';

export class Button extends BasicElement {
	constructor(title, classes) {
		super('button', classes);

		this.element.textContent = title;
	}
}
