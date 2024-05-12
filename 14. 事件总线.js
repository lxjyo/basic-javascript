class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(callback);
  }

  off(name, fn) {
    const tasks = this.events[name];
    if (tasks) {
      if (fn) {
        const index = this.events[name].findIndex((item) => item === fn);
        if (index >= 0) {
          this.events[name].splice(index, 1);
        }
      } else {
        this.events[name] = [];
      }
    }
  }

  emit(name, once = false, ...args) {
    if (this.events[name]) {
      const cbs = this.events[name].slice();
      cbs.forEach((fn) => fn.apply(this, args));
      if (once) {
        this.events[name] = [];
      }
    }
  }
}


// 测试
let eventBus = new EventEmitter()
let fn1 = function(name, age) {
	console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
	console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, '布兰', 12)
eventBus.off('aaa', fn2);
eventBus.emit('aaa', false, '布兰', 12)
