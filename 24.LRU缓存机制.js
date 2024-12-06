/**
 * LRU缓存机制：Least Recently Used，用于管理缓存中的数据。LRU算法的核心思想是保留最近被访问过的数据，而淘汰最久未被访问的数据。
 * 1. 初始化：缓存被初始化为一定的容量，当缓存达到容量上限时，需要淘汰数据
 * 2. 访问数据：当访问缓存中的数据时，需要将其移动到缓存的最近被访问位置，即更新其访问时间。
 * 3. 添加数据：当缓存达到容量上限时，需要淘汰最久未被访问的数据，通常是数据结构的尾部的数据。
 */

// const testMap = new Map([
//   [1, "a"],
//   [2, "b"],
// ]);
// testMap.set(3, "c");
// testMap.set(4, "d");
// console.log(testMap.keys()); // 会返回一个迭代器
// for(let key of testMap.keys()) { // 会按照添加的顺序打印，第一个打印的则为最先添加的键值对
//   console.log(key)
// }

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // 使用map存放缓存队列，利用map.keys()返回一个迭代器
  }
  // 添加数据时，如果已经达到容量上限，则需要淘汰最久未被访问的数据
  put(key, value) {
    if (this.cache.has(key)) {
      // 如果已经存在，则把这个key设置成最新鲜的
      this.cache.set(key, value);
      this.makeRecently(key);
      return;
    }
    if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value; // 获取最久未被访问的数据的key
      this.cache.delete(firstKey); // 删除最久未被访问的数据
    }
    this.cache.set(key, value) // 添加数据
  }

  // 访问缓存数据时，需要将其移动到缓存的最近被访问位置，即更新其访问时间。
  get(key) {
    if (this.cache.has(key)) {
      this.makeRecently(key);
      return this.cache.get(key);
    } else {
      return -1;
    }
  }

  // 把key变成最新鲜的
  makeRecently(key) {
    const value = this.cache.get(key);
    // 删除key
    this.cache.delete(key);
    // 重新添加，则会被添加到map的末尾，即最近被访问位置
    this.cache.set(key, value);
  }
}


const lru = new LRUCache(3);

lru.put(1, 'a');
lru.put(2, 'b');
lru.get(1);
lru.put(3, 'c');
lru.put(4, 'd');
console.log(lru.cache)