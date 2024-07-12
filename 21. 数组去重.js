/**
 * 数组去重的方法
 */

// 1. 利用对象属性名唯一的特性
Array.prototype.unique1 = function () {
  let arr = this;
  let temp = {};
  for (let i = 0; i < arr.length; i++) {
    let key = String(arr[i]); // 确保键可以被存储
    if (!temp[key]) {
      temp[key] = arr[i];
    }
  }
  return Object.values(temp);
};

// 2. 先排序再对比相邻元素
Array.prototype.unique2 = function () {
  let arr = this;
  const len = arr.length;
  let temp = [];
  const sorted = arr.slice().sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    if (sorted[i] !== sorted[i + 1]) {
      temp.push(sorted[i]);
    }
  }
  return temp;
};

// 3. 使用数组下标去重（适用于数组内容都是数字的情况）
Array.prototype.unique3 = function () {
  let arr = this;
  let temp = [];
  for (let value of arr) {
    if (temp[value] === undefined) {
      temp[value] = true;
    }
  }
  return Object.keys(temp).map((key) => Number(key));
};

// 4. set
Array.prototype.unique4 = function () {
  let arr = this;
  return [...new Set(arr)];
};

// 5. filter 和 indexOf 过滤
Array.prototype.unique5 = function () {
  return this.filter((value, index, self) => self.indexOf(value) === index);
};

// 6. reduce
Array.prototype.unique6= function() {
  return this.reduce((acc, value) => {
    if (!acc.includes(value)) {
      acc.push(value);
    }
    return acc;
  }, []);
}

// 7. 利用 Map 的键唯一性来去重。
Array.prototype.unique7 = function() {
  let map = new Map();
  this.forEach(item => map.set(item, null));
  return Array.from(map.keys());
}

let arr = [9, 2, 3, 4, 5, 1, 2, 3, 4, 5];
console.log(arr.unique1());
console.log(arr.unique2());
console.log(arr.unique3());
console.log(arr.unique4());
console.log(arr.unique5());
console.log(arr.unique6());
console.log(arr.unique7());
