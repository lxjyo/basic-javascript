/**
 * 节流函数生成器。
 * 根据指定的间隔时间(interval)和选项(options)，生成一个节流函数。
 * 节流函数可以控制某个函数在一定时间内最多执行一次，可用于限制事件处理函数的触发频率。
 *
 * @param {Function} fn 要节流的函数。
 * @param {number} interval 节流间隔时间，单位为毫秒。
 * @param {{leading:Boolean,tailing:Boolean}}配置选项
 *        leading: 第一次触发时是否立即执行，默认为 false
 *        tailing: 最后一次触发时，如果在间隔时间(interval)内未能再次执行，是否执行，默认为 false。
 * @returns {Function} 返回一个节流函数。
 */
function throttle(
  fn,
  interval,
  options = {
    leading: false, // 第一次是否立即执行
    tailing: false, // 最后一次是否执行；如果最后一次触发时，满足不了间隔时间>=interval，导致无法执行
  }
) {
  let last = 0; // 记录上一次触发时间
  let timer = null;
  function _throttle(...args) {
    // 返回一个promise， 以便获取返回值
    return new Promise((resolve) => {
      const current = Date.now(); // 获取当前时间
      if (!options.leading && !last) {
        // 第一次时，不立即执行
        last = current;
      }
      const remainTime = interval - (current - last); // 剩余时间
      if (remainTime <= 0) {
        // 到时间了
        if (timer) {
          // 执行函数时，取消设置的最后一次执行定时器
          clearTimeout(timer);
          timer = null;
        }
        const result = fn.apply(this, args);
        resolve(result);
        // 保留上次触发的时间
        last = current;
        return;
      }

      // 还有剩余时间
      if (options.tailing && !timer) {
        // 最后一次执行
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          resolve(result);
          timer = null;
          last = !options.leading ? 0 : Date.now(); // 第一次不立即执行时为0
        }, remainTime);
      }
    });
  }

  // 支持取消
  _throttle.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    last = 0;
  };

  return _throttle;
}