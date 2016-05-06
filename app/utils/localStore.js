import { canUseDOM } from 'exenv';
import _ from 'lodash';

let storage = {
  /*set (name, value = []) {
    if (!canUseDOM) { return; }
    localStorage.setItem(name, JSON.stringify(value));
  },*/

  add (name, id = '') {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '[]';

    let list = [].concat(JSON.parse(str));
    let found = (list.indexOf(id) >= 0);

    if (id) list.push(id);
    if (!found) localStorage.setItem(name, JSON.stringify(list));
    return list;
  },

  remove (name, id = '') {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '[]';
    let list = [].concat(JSON.parse(str));
    let removed = _.remove(list, (item) => { return item == id; });
    // let removed = _.remove(list, {_id: id});
    console.log('localStore: removed: ', removed);

    localStorage.setItem(name, JSON.stringify(list));
    return removed;
  },

  get (name) {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '';
    return JSON.parse(str);
  },
  set(name, list) {
    if (!canUseDOM) { return; }
    localStorage.setItem(name, JSON.stringify(list));
  }
};

export default storage;
