export const LOCAL_STORAGE = 'LOCAL_STORAGE';
export const SESSION_STORAGE = 'SESSION_STORAGE';

export const STORAGES = [LOCAL_STORAGE, SESSION_STORAGE];

export const BTN_SWITCH_STORE_TITLE = {
	[LOCAL_STORAGE]: 'Переключить на сессионное хранилище',
	[SESSION_STORAGE]: 'Переключить на локальное хранилище',
};

export const CURRENT_STORE_TITLE = {
	[LOCAL_STORAGE]: 'Текущее хранилище - Local Storage',
	[SESSION_STORAGE]: 'Текущее хранилище - Session Storage',
};

export const PAGES = [
	{ title: 'Мои дела', owner: 'my' },
	{ title: 'Дела папы', owner: 'dad' },
	{ title: 'Дела мамы', owner: 'mom' },
];
