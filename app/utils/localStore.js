/* eslint-env browser */
import { canUseDOM } from 'exenv';

let storage = {
  set (name, value = []) {
    if (!canUseDOM) { return; }

    localStorage.setItem(name, JSON.stringify(value));
  },

  push (name, value = []) {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '';
    let list = JSON.parse(str);
    let newList = list.concat(value);

    localStorage.setItem(name, JSON.stringify(newList));

  },

  get (name) {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '';
    return JSON.parse(str);
  }
};

export default storage;
