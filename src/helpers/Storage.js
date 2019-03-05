import Cookie from 'js-cookie';
import { STORAGE_KEYS } from '@/constants';

class Storage {
  isValidKey (key = '') {
    return Object.values(STORAGE_KEYS).some(storageKey => key === storageKey);
  }

  setItem (key = '', data = '', expires = 0) {
    if (!this.isValidKey(key)) {
      throw new Error('IS_INVALID_STORE_KEY');
    }

    const stringified = JSON.stringify(data);
    if (expires || !localStorage) {
      Cookie.set(key, stringified, { expires });
    }
    else {
      localStorage.setItem(key, stringified);
    }
  }

  getItem (key = '', isCookie = false) {
    if (!this.isValidKey(key)) {
      throw new Error('IS_INVALID_STORE_KEY');
    }

    const data = localStorage && !isCookie
      ? localStorage.getItem(key)
      : Cookie.get(key);
    return data ? JSON.parse(data) : data;
  }

  removeItem (key = '') {
    if (!this.isValidKey(key)) {
      throw new Error('IS_INVALID_STORE_KEY');
    }

    if (localStorage) {
      localStorage.removeItem(key);
    }
    else {
      Cookie.remove(key);
    }
  }
}

export default new Storage();
