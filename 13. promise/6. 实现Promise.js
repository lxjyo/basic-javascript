/**
 * 实现Promise
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class CustomPromise {
  constructor(executor) {
    this.status = PENDING;
    this.fulfilledQueue = [];
    this.rejectedQueue = [];
    this.value = undefined;

    const resolveFn = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 执行then
        this.fulfilledQueue.forEach((fn) => fn());
      }
    };
    const rejectFn = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.value = reason;
        // 执行catch
        this.rejectedQueue.forEach((fn) => fn());
      }
    };

    executor(resolveFn, rejectFn);
  }

  then(resolveHandler, rejectHandler) {
    const onResolved =
      typeof resolveHandler === 'function' ? resolveHandler : (value) => value;

    const onRejected =
      typeof rejectHandler === 'function'
        ? rejectHandler
        : (reason) => {
            throw reason;
          };

    const returnP = new CustomPromise((resolve, reject) => {
      if (this.status === PENDING) {
        this.fulfilledQueue.push(() => {
          queueMicrotask(() => {
            try {
              const result = onResolved(this.value);
              resolvePromise(returnP, result, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
        this.rejectedQueue.push(() => {
          queueMicrotask(() => {
            try {
              const result = onRejected(this.value);
              resolvePromise(returnP, result, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
      } else if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const result = onResolved(this.value);
            resolvePromise(returnP, result, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const result = onRejected(this.value);
            resolvePromise(returnP, result, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }
    });

    return returnP;
  }

  catch(rejectHandler) {
    return this.then(null, rejectHandler);
  }

  static resolve(value) {
    if (value instanceof CustomPromise) return value;
    return new CustomPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new CustomPromise((resolve, reject) => {
      reject(value);
    });
  }

  static all(promiseArr) {
    if (promiseArr.length === 0) return CustomPromise.resolve([]);
    const result = [];
    let size = 0;
    const len = promiseArr.length;
    return new CustomPromise((resolve, reject) => {
      promiseArr.forEach((promise, index) => {
        promise.then((res) => {
          result[index] = res;
          size++;
          if (size === len) {
            resolve(result);
          }
        }, reject);
      });
    });
  }

  static race(promiseArr) {
    return new CustomPromise((resolve, reject) => {
      promiseArr.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }

  static allSettled(promiseArr) {
    let result = [];
    return new CustomPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        CustomPromise.resolve(p).then(
          (val) => {
            result.push({
              status: 'fulfilled',
              value: val,
            });
            if (result.length === promiseArr.length) {
              resolve(result);
            }
          },
          (err) => {
            result.push({
              status: 'rejected',
              reason: err,
            });
            if (result.length === promiseArr.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }
}

/**
 * 处理返回的结果
 * @param {*} promise
 * @param {结果值} x
 * @param {*} resolve
 * @param {*} reject
 * @returns
 */
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 具有then 方法，直接执行
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果
    resolve(x);
  }
}

// const p1 = new CustomPromise((resolve) => {
//   console.log('p1 start'); // 2
//   setTimeout(() => {
//     resolve('p1');
//   }, 1000);
// });
// p1.then((value) => {
//   console.log(value)
//   return value + ' then';
// }).then((value) => {
//   console.log(value);
// });
// const p3 = new CustomPromise((resolve) => {
//   setTimeout(() => resolve('p3'), 1000);
// });

// const p2 = CustomPromise.resolve('p2');
// const p4 = p2
//   .then((value) => {
//     console.log(value);
//     return p3;
//   })
//   .then(console.log);

// const p5 = new CustomPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject('p5 error');
//   }, 3000);
// })
//   .then(console.log)
//   .catch((error) => {
//     console.log('catch', error);
//     return 'p5 ok';
//   });
