const NUMS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const SMALL_UNITS = ['', '十', '百', '千'];
const BIG_UNITS = ['', '万', '亿'];

/**
 * 1 2345 一万 二千三百四十五
 * 1234567890 一千二百三十四万五千六百七十八
 *
 * @param {*} num
 */
function transfer(num) {
  const [part1, part2] = num.toString().split('.');
  let result = '';
  const len = part1.length;
  let zeroCount = 0;
  for (let i = 0; i < len; i++) {
    const digit = +part1[i];
    const pos = len - i - 1;
    if (digit === 0) {
      zeroCount++;
    } else {
      result += (zeroCount > 0 ? NUMS[0] : '') + NUMS[digit];
      zeroCount = 0;
    }
    const smallUnit = digit !== 0 ? SMALL_UNITS[pos % 4] : '';
    const bigUnit = pos % 4 === 0 ? BIG_UNITS[pos / 4] : '';
    result += `${smallUnit}${bigUnit}`;
  }

  // 小数部分
  if (part2) {
    result += '点';
    for (let i = 0; i < part2.length; i++) {
      const digit = part2[i];
      result += NUMS[digit];
    }
  }

  return result;
}

console.log(transfer(12345));
console.log(transfer(123450));
console.log(transfer(12345678));
console.log(transfer(123456789));
console.log(transfer(10000000.23));
