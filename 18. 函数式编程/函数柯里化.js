/**
 * 函数柯里化
 * 接收多个参数的函数更改成接收单个参数的函数，并返回接收剩下参数而且返回结果的函数
 */

function curry(fn, ...args) {
  const len = fn.length;
  let params = args;
  function _curryFn(...arguments) {
    params = params.concat(arguments);
    if (params.length >= len) {
      return fn.apply(this, params);
    } else {
      return _curryFn;
    }
  }

  return _curryFn;
}

function plus(a, b, c, d, e) {
  return a + b + c + d + e;
}

console.log(plus(1, 2, 3, 4, 5));
const curryPlus = curry(plus);
console.log(curryPlus(1)(2, 3)(4)(5));

/**
 * 实现一个add方法，使计算结果能够满足如下预期：
 * add(1)(2)(3) == 6; true
 * add(1, 2, 3)(4) == 10; true
 * add(1)(2)(3)(4)(5) == 15; true
 */

function add(...args) {
  function _add(...arguments) {
    args = args.concat(arguments);
    return _add;
  }
  // 利用隐式转换  .valueOf .toString
  _add.valueOf = () => args.reduce((p, q) => p + q);
  return _add;
}


console.log(add(1)(2)(3) == 6)
console.log(add(1, 2, 3)(4) == 10)
console.log(add(1)(2)(3)(4)(5) == 15)