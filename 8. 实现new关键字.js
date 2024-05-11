function newOperator() {
  const fn = arguments[0];
  const args = [].slice.call(arguments, 1);
  const obj = {};
  obj.__proto__ = fn.prototype;
  const result = fn.apply(obj, args);
  return typeof result === 'object' ? result || obj : obj;
}

// 测试
function person(name, age) {
  this.name = name
  this.age = age
}
let p = newOperator(person, '布兰', 12)
console.log(p)  // { name: '布兰', age: 12 }
