// 21. 使用es5实现es6构造函数
class Example {
  constructor(name) {
    this.name = name;
  }

  init() {
    const func = () => {
      console.log(this.name)
    };
    func();
  }
}
const example = new Example("example");
example.init();

/**
 * es5实现es6构造函数
 * 1. 构造函数必须使用new调用
 * 2. ES6 的 class 中的所有代码均处于严格模式之下
 * 3. ES6 中的原型方法是不可被枚举的
 * 4. 原型上的方法不允许通过 new 来调用
 */

function Example2(name) {
  "use strict";
  if (!new.target) {
    throw new TypeError("Class constructor cannot be invoked without new");
  }
  this.name = name;
}
// class原型方法不可枚举
Object.defineProperty(Example2.prototype, "init", {
  enumerable: false,
  value: function () {
    "use strict";
    if (new.target) {
      throw new TypeError("init is not a constructor");
    }
    function func() {
      console.log(this.name);
    }
    func.call(this);
  },
});

const exp = new Example2("example");
exp.init();