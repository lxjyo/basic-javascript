/**
 * 函数合并：将多个函数合并为一个函数
 */

function compose(...fns) {
  // 从前到后执行
  return arg => fns.reduce((fn1, fn2) => fn2(fn1), arg);
}

function composeReverse(...fns) {
  // 从后到前执行
  return arg => fns.reduceRight((fn1, fn2) => fn2(fn1), arg);
}

function add(num) {
  return num + 4;
}
function pow(num) {
  return Math.pow(num, 2);
}
console.log(compose(add, pow)(4))
console.log(composeReverse(add, pow)(4))