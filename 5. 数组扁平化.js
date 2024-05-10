/**
 * 数组扁平化
 * @param {*} arr 
 * @returns 
 */
function flatten(arr) {
  return arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? flatten(cur) : cur),
    []
  );
}

/**
 *  按照深度扁平
 * @param {*} arr 
 * @param {*} level >= 1
 * @returns 
 */
function flattenByLevel(arr, level) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array as the first argument');
  }
  if (typeof level !== 'number' || level <= 0) {
    throw new TypeError('Expected a positive number as the second argument');
  }

  // 处理边界条件
  if (!arr.length || level === 1) {
    return arr;
  }

  let result = [];
  for (let value of arr) {
    if (Array.isArray(value) && level > 1) {
      result = result.concat(flattenByLevel(value, level - 1));
    } else {
      result.push(value);
    }
  }
  return result;
}

const arr = [1, [2, [3, 4, [5]]]];

console.log(flatten(arr));
console.log(flattenByLevel(arr, 4), flattenByLevel(arr, 2));
