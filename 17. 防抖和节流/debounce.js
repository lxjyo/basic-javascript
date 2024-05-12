/**
 * 防抖: 触发时不立即执行，而是等待n秒后再执行；如果函数在n秒内再次被触发，则重新计时
 * 支持立即执行
 * 获取函数返回值
 * 支持取消功能
 * @param {函数} fn 
 * @param {延迟时间} delay 
 * @param {是否立即执行} immediate 
 * @returns 
 */
function debounce(fn, delay, immediate = false) {
  let timer = null;
  let isInvoked = false; // 用于记录是否已经执行
  function _debounce(...args) {
    // 返回promise，支持获取函数返回值
    return new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }
      if (immediate && !isInvoked) {
        const res = fn.apply(this, args);
        resolve(res)
        isInvoked = true;
      }
      timer = setTimeout(() => {
        const result = fn.apply(this, args);
        timer = null;
        resolve(result);
      }, delay);
    });
  }

  // 支持取消
  _debounce.cancel = () => {
    clearTimeout(timer);
    timer = null;
    isInvoked = false;
  };

  return _debounce;
}