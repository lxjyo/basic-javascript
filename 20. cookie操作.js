const cookieUtil = {
  set(key, value, expires, path, domain, secure = false) {
    let cookieStr = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    if (expires instanceof Date) {
      cookieStr += `;expires=${expires.toUTCString()}`;
    } else {
      cookieStr += `;max-age=${expires}`;
    }
    if (path) {
      cookieStr += `;path=${path}`;
    }
    if (domain) {
      cookieStr += `;domain=${domain}`;
    }
    if (secure) {
      cookieStr += `;secure`;
    }
    document.cookie = cookieStr;
  },
  get(name) {
    const cookieStr = document.cookie;
    const reg = new RegExp(`(?<=${encodeURIComponent(name)}\=)[^;]+`);
    if (reg.test(cookieStr)) {
      const value = cookieStr.match(reg)[0];
      return decodeURIComponent(value);
    }
    return null;
  },
  getAll() {
    const arr = cookieStr.split('; ');
    const result = {};
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const [key, value] = item.split('=');
      result[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return result;
  },
  delete(name) {
    this.set(name, '', -1);
  },
};
