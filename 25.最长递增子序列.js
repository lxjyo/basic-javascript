/**
 * 求一个数组的最长递增子序列
 * [10, 9, 2, 5, 3, 7, 101, 18] => 4 [2, 3, 7, 101] 或者 [2, 5, 7, 101]
 */

function LIS(arr) {
  const len = arr.length;
  let maxSeq = [];
  let maxLen = 0;
  const seqs = new Array(len).fill().map(() => []);
  for (let i = 0; i < len; i++) {
    // 创建一个以当前元素为结尾的递增子序列
    let seq = [arr[i]];
    // 遍历之前的元素，找到比当前元素小的元素，从而构建递增子序列
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        // 把之前存储的序列和当前元素拼接起来
        seq = seqs[j].concat(arr[i]);
      }
    }
    // 存储当前元素的递增子序列
    seqs[i] = seq;
    // 更新最长递增子序列
    if (seq.length > maxLen) {
      maxLen = seq.length;
      maxSeq = seq;
    }
  }
  return maxSeq;
}

console.log(LIS([2, 1, 5, 3, 6, 4, 8, 9, 7])); // [2, 3, 7, 101]
