import { BasicElement } from '../shared/ui';

export class Navigation extends BasicElement {
	constructor(navList, activeItemValue) {
		super('nav', ['nav', 'mb-5', 'justify-content-center']);

		this.itemElements = navList.map(({ title, owner }, index) => {
			const { element } = new BasicElement('a', ['nav-link', 'm-1']);

			element.dataset.id = owner;
			element.textContent = title;
			element.href = index === 0 ? '/' : owner;

			if (activeItemValue === owner) element.classList.add('disabled');

			return element;
		});

		this.element.append(...this.itemElements);
	}
}
