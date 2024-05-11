/**
 * 实现JSON.stringify
 * 1. 传入null，返回 'null'
 * 2. 传入数字类型，如果是NaN或者Infinity，返回 'null', 否则返回数字字符串
 * 3. 传入boolean，返回 'true' 或 'false'
 * 4. 传入symbol、undefined、function，返回 undefined
 * 5. 传入对象
 *    5.1 如果有toJSON 方法，则先调用toJSON方法
 *    5.2 如果是数组，则遍历数组，递归调用jsonStringify方法，将结果拼接起来，用逗号分隔,
 *        数组中symbol、undefined、function，会被处理成null
 *    5.3 如果是对象，则遍历对象，将key和value用冒号分隔，用逗号分隔，将结果拼接起来
 *        对象中symbol、undefined、function，会被忽略
 * 
 * 6. 传入字符串，返回字符串
 */

function jsonStringify(value) {
  const valueType = typeof value;
  if (value === null) {
    return 'null';
  } else if (valueType === 'number') {
    // NaN 和 Infinity 将会被处理处理成null
    return isNaN(value) || !isFinite(value) ? 'null' : value.toString();
  } else if (valueType === 'boolean') {
    return value.toString();
  } else if (
    valueType === 'undefined' ||
    valueType === 'symbol' ||
    valueType === 'function'
  ) {
    // symbol 和 function 、undefinded 会被处理成 undefined
    return undefined;
  } else if (valueType === 'object') {
    // 如果存在toJSON方法，则先调用toJSON方法
    if (typeof value.toJSON === 'function') {
      return jsonStringify(value.toJSON());
    }
    if (Array.isArray(value)) {
      // 数组的情况
      let result = '[';
      for (let i = 0; i < value.length; i++) {
        let cur = value[i];
        // symbol、undefined、function 类型的将会被处理成null
        if (typeof cur === 'symbol' ||  typeof cur === 'function' || typeof cur === 'undefined') {
          cur = null;
        }
        result += `${i === 0 ? '' : ','}${jsonStringify(cur)}`;
      }
      return result + ']';
    } else {
      // 普通对象的情况
      const temp = [];
      Object.keys(value).forEach((key) => {
        let cur = value[key];
        // 处理对象时会忽略掉symbol、undefined、function
        const ignored =
          typeof cur === 'symbol' ||
          typeof cur === 'undefined' ||
          typeof cur === 'function';
        if (!ignored) {
          temp.push('"' + key + '":' + jsonStringify(value[key]));
        }
      });
      return `{${temp.join(',')}}`;
    }
  }
  return '"' + value + '"';
}

const OriginalJSON = JSON.stringify;

JSON.stringify = function (...args) {
  const testValue = jsonStringify.apply(null,args);
  const result = OriginalJSON.apply(null, args);
  console.log('custom: ', testValue, typeof testValue, ' | origin: ', result, typeof result);
};
JSON.stringify(1);
JSON.stringify(NaN);
JSON.stringify({});
JSON.stringify(undefined);
JSON.stringify(null); 
const data = {
  a: 'A',
  b: undefined, // 忽略
  [Symbol('c')]: 'c', // 忽略
  print() { // 忽略
    console.log('print');
  },
  data: null,
  notNumber: NaN, // null
  infinity: Infinity, // null
  // // 有toJSON, 会调用toJSON方法序列化
  // toJSON: function () {
  //   return 'WTF';
  // },
};
JSON.stringify(data);

JSON.stringify([1, '3', NaN, 'false', false, undefined, data.print, Symbol('test')]); // [1,"3",4,"false",false]
