import { Button } from '../shared/ui';

export class SwitchStoreButton extends Button {
	constructor(text) {
		super(text, ['btn', 'btn-warning', 'mb-3', 'w-100']);
	}
}
