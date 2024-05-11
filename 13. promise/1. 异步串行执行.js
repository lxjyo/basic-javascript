/**
 * 手写实现方式：
 * const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

  createFlow([
    () => log("a"),
    () => log("b"),
    subFlow,
    [() => delay(1000).then(() => log("d")), () => log("e")],
  ]).run(() => {
    console.log("done");
  });

  // 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
**/

class Flow {
  constructor(arr) {
    this.queue = this._format(arr);
  }
  _format(arr) {
    let queue = [];
    arr.forEach((item) => {
      if (typeof item === 'function') {
        queue.push(item);
      } else if (item instanceof Flow) {
        queue.push(...item.queue);
      } else if (Array.isArray(item)) {
        queue.push(...this._format(item));
      }
    });
    return queue;
  }

  run(cb) {
    this.queue.reduce((p, q) => p.then(q), Promise.resolve()).then(cb);
  }
}

function createFlow(arr) {
  return new Flow(arr);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const log = (content) => console.log(content);

const subFlow = createFlow([() => delay(1000).then(() => log('c'))]);

createFlow([
  () => log('a'),
  () => log('b'),
  subFlow,
  [() => delay(1000).then(() => log('d')), () => log('e')],
]).run(() => {
  console.log('done');
});
