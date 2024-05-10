/**
 *
 * @param {Object} origin 要拷贝的对象
 * @param {WeakMap} visited 已访问，检查循环引用
 * @returns
 */
function deepClone(origin, visited = new WeakMap()) {
  // 处理非对象和null值
  if (typeof origin !== 'object' || origin === null) {
    return origin;
  }

  // 检查循环引用
  if (visited.has(origin)) {
    return visited.get(origin);
  }

  // 特殊对象的深拷贝
  if (origin instanceof RegExp) {
    return new RegExp(origin.source, origin.flags);
  }
  if (origin instanceof Date) {
    return new Date(origin.getTime());
  }

  // 处理数组和对象
  const result = Array.isArray(origin) ? [] : {};
  visited.set(origin, result); // 添加到已访问

  Object.keys(origin).forEach((prop) => {
    const value = origin[prop];
    result[prop] = deepClone(value, visited);
  });

  return result;
}


const a = {};
const origin = {
  name: 'x',
  arr: [3, 4, [5, 6]],
  obj: {
    name: 'obj',
    date: new Date(),
  },
  a,
};
a.origin = origin;

const cloned = deepClone(origin);
cloned.arr.push(4);
cloned.obj.date.setDate(20);
console.log(cloned);
