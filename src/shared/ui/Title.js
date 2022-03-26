import { BasicElement } from './BasicElement';

export class Title extends BasicElement {
	constructor(title, classes) {
		super('h2', classes);
		this.element.textContent = title;
	}
}
