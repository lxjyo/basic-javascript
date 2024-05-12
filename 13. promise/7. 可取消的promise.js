class CancelablePromise {
  /**
   * 构造器
   * @param executor Promise中的 executor
   * @param abortSignal AbortController中的signal对象
   * @returns
   */
  constructor(executor, abortSignal) {
    // 记录reject和resolve方法
    let _reject = null;
    let _resolve = null;
    let _isExecResolve = false;

    // 创建和执行Promise
    const cancelablePromise = new Promise((resolve, reject) => {
      _reject = reject;
      _resolve = (value) => {
        _isExecResolve = true;
        resolve(value);
      };
      return executor(_resolve, reject);
    });

    // 监听Signal的abourt事件
    abortSignal.addEventListener('abort', () => {
      if (_isExecResolve) {
        return;
      }
      // 抛出错误
      const error = new DOMException(
        'user cancel promise',
        CancelablePromise.CancelExceptionName
      );
      _reject(error);
    });
    return cancelablePromise;
  }

  // 取消后抛出的异常名称
  static CancelExceptionName = 'CancelablePromise AbortError';
}


const ab = new AbortController();
Promise.resolve().then(() => {
  setTimeout(() => {
    ab.abort();
  }, 1000);
});
const instance = new CancelablePromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 3000);
}, ab.signal).then(
  () => {
    console.log('resolved');
  },
  (error) => {
    console.log('error', error);
  }
);
