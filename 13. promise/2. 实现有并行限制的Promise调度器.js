class Scheduler {
  constructor(maxCount) {
    this.maxCount = maxCount;
    this.runningCount = 0;
    this.queue = [];
  }

  add(promiseCreator) {
    this.queue.push(promiseCreator);
    // this.run();
    this.execute();
  }

  run() {
    if (this.queue.length === 0 || this.runningCount >= this.maxCount) {
      return Promise.resolve('finish')
    }
    this.runningCount++;
    this.queue.shift()().then(() => {
      this.runningCount--;
      this.run();
    })
  }

  async execute() {
    if (this.queue.length === 0 || this.runningCount >= this.maxCount) {
      return;
    }
    this.runningCount++;
    await this.queue.shift()();
    this.runningCount--;
    // 继续执行
    this.execute();
  }
}

const imgs = [
  'https://tse2-mm.cn.bing.net/th/id/OIP-C.qfnUFStQE-sgnwmLn_wBqAHaE5?w=254&h=180&c=7&r=0&o=5&pid=1.7',
  'https://tse2-mm.cn.bing.net/th/id/OIP-C.2ec6Dyg-4u5j1qbUZvtxkgHaE5?w=291&h=192&c=7&r=0&o=5&pid=1.7',
  'https://tse4-mm.cn.bing.net/th/id/OIP-C.bdW_UC38fwjR98UtCg6mBAHaE7?w=238&h=180&c=7&r=0&o=5&pid=1.7',
  'https://tse2-mm.cn.bing.net/th/id/OIP-C.mNy54S4FnC1mHcHhuoOuUQHaHZ?w=181&h=180&c=7&r=0&o=5&pid=1.7',
  'https://ddddtse2-mm.cn.bing.net/th/id/OIP-C.MqUgHm_PjjuwYNgCm7HOYAHaE9?w=283&h=189&c=7&r=0&o=5&pid=1.7'
]

function loadImg(src) {
  return () => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img)
    }
    img.onerror = e => {
      reject(e);
    }
    img.src = src;
  })
}

const sche = new Scheduler(3);
for (let i = 0; i < imgs.length; i++) {
  sche.add(loadImg(imgs[i]));
}
