export class BasicElement {
	constructor(tag, classes = []) {
		this.element = document.createElement(tag);
		this.element.classList.add(...classes);
	}
}
