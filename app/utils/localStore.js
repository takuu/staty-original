import { canUseDOM } from 'exenv';
import _ from 'lodash';

let storage = {
  add (name, item = {}) {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '[]';

    let list = [].concat(JSON.parse(str));
    let ids = _.map(list, '_id');
    let found = (ids.indexOf(item._id) >= 0);

    if (item) list.push(item);
    if (!found) localStorage.setItem(name, JSON.stringify(list));
    console.log('localStore: ', list);
    return list;
  },

  remove (name, item = {}) {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '[]';
    let list = [].concat(JSON.parse(str));
    _.remove(list, (data) => { return data._id == item._id; });
    console.log('localStore: ', list);

    localStorage.setItem(name, JSON.stringify(list));
    return list;
  },

  get (name) {
    if (!canUseDOM) { return; }
    let str = localStorage.getItem(name) || '';
    return JSON.parse(str);
  },

  set (name, list = []) {
    if (!canUseDOM) { return; }
    localStorage.setItem(name, JSON.stringify(list));
  }
};

export default storage;
