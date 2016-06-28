/* eslint-env browser */
import { canUseDOM } from 'exenv';

let cookie = {
  set ({ name, value = '', path = '/', domain = '', expires = '' }) {
    if (!canUseDOM) { return; }

    if (expires instanceof Date) {
      expires = expires.toUTCString();
    }

    document.cookie = [
      `${name}=${value}`,
      `path=${path}`,
      `domain=${domain}`,
      `expires=${expires}`
    ].join(';');
  },

  unset (name) {
    cookie.set({ name, expires: new Date(0) });
  },

  removeAll() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  get (name) {
    var re = new RegExp(['(?:^|; )',
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
      '=([^;]*)'
    ].join(''));

    var matches = document.cookie.match(re);

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
};

export default cookie;
