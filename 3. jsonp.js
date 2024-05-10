/**
 * jsonp
 * @param {*} url
 * @param {*} data
 * @returns
 */
function jsonp(url, data = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_${Math.random()
      .toString(36)
      .slice(2)}_${new Date().getTime()}`;

    // 获取url
    const getUrl = () => {
      const params = Object.keys(data).map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      );
      return `${url}?${params.join('&')}&callback=${callbackName}`;
    };

    // 回调函数
    window[callbackName] = (data) => {
      try {
        resolve(data);
      } catch (error) {
        reject(error);
      }
      // 移除
      removeScriptAndCallback(callbackName);
    };

    // 添加script
    const script = document.createElement('script');
    script.onerror = () => {
      reject(new Error('Script load error'));
      removeScriptAndCallback(callbackName);
    };
    script.src = getUrl();
    document.body.appendChild(script);

    // 移除script和回调函数的工具函数
    function removeScriptAndCallback(callbackName) {
      if (script && script.parentNode) {
        document.body.removeChild(script);
      }
      if (typeof window[callbackName] === 'function') {
        delete window[callbackName];
      }
    }
  });
}
