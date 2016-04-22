import { canUseDOM } from 'exenv';
import _ from 'lodash';

let storage = {
  /*set (name, value = []) {
    if (!canUseDOM) { return; }
    localStorage.setItem(name, JSON.stringify(value));
  },*/

  add (name, value = []) {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '[]';

    let list = [].concat(JSON.parse(str));
    let found = _.find(list, {_id: value && value._id});

    let newList = list.concat(value);
    if(!found) localStorage.setItem(name, JSON.stringify(newList));
    return newList;
  },

  remove(name, id = '') {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '[]';
    let list = [].concat(JSON.parse(str));
    let removed = _.remove(list, {_id: id});
    console.log('localStore: removed: ', removed);

    localStorage.setItem(name, JSON.stringify(list));
    if (removed.length) return removed.shift();
  },

  get (name) {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '';
    return JSON.parse(str);
  }
};

export default storage;
