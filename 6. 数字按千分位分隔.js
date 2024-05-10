/**
 * 数字按千分位分隔, 正则方式
 */
function partition1(num) {
  /**
   * \B 匹配一个非单词边界
   * x(?=y):先行断言，匹配x仅当x后面跟着y; (?<=y)x: 后行断言，匹配x仅当x前面是y
   * x(?!y) 仅当x后面不跟着y时匹配x
   */
  const reg = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(reg, ',');
}

console.log(partition1(12345678));
console.log(partition1(12345678.123));
console.log(partition1(-12345));
console.log(partition1(-12345678.123));

/**
 * 数字按千分位分隔, 遍历方式
 * @param {*} num
 * @returns
 */
function partition2(num) {
  const negetive = num < 0;
  let [part1, part2 = ''] = String(num).split('.');
  if (negetive) {
    part1 = part1.slice(1);
  }
  const len = part1.length;
  let result = '';
  for (let i = len - 1; i >= 0; i--) {
    if (i !== 0 && (len - i) % 3 === 0) {
      result = ',' + part1[i] + result;
    } else {
      result = part1[i] + result;
    }
  }
  return `${negetive ? '-' : ''}${result}${part2 ? `.${part2}` : ''}`;
}

console.log(partition2(12345678));
console.log(partition2(12345678.123));
console.log(partition2(-12345));
console.log(partition2(-12345678.123));
