import { LOCAL_STORAGE, SESSION_STORAGE } from '../constants';
import { LocalStorage } from './LocalStorage';
import { SessionStorage } from './SessionStorage';

export const Store = {
	[LOCAL_STORAGE]: LocalStorage,
	[SESSION_STORAGE]: SessionStorage,
};
