function instanceOf(value1, value2) {
  while (value1.__proto__) {
    if (value1.__proto__ === value2.prototype) {
      return true;
    }
    value1 = value1.__proto__;
  }
  return false;
}

function Person(name) {
  this.name = name;
}
const obj = new Person('test');

console.log(instanceOf(obj, Person), instanceOf(obj, Object))