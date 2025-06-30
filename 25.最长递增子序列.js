/**
 * 求一个数组的最长递增子序列
 * [10, 9, 2, 5, 3, 7, 101, 18] => 4 [2, 3, 7, 101] 或者 [2, 5, 7, 101]
 */

// O(n^2) 时间复杂度
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

console.log(LIS([2, 1, 5, 3, 6, 4, 8, 9, 7])); // [ 1, 3, 4, 8, 9 ]

/**
 * 贪心算法 + 二分查找
 * 贪心：每次选择当前最小的元素(即当前最小的尾元素)作为局部最优解
 * @param {*} arr 
 */
function LISBetter(arr) {
  const tails = []; // 最长递增子序列
  for(let num of arr) {
    // 利用二分查找，在tails中找到第一个大于等于num的元素
    let left = 0;
    let right = tails.length;
    while(left < right) {
      const mid = Math.floor((left + right) / 2);
      if (num > tails[mid]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    if (left >= tails.length) {
      // 如果没有找到，说明当前元素比tails中的所有元素都大
      tails.push(num);
    } else {
      // 如果找到了，说明当前元素比tails中的某个元素小
      tails[left] = num;
    }
  }
  return tails;
}
console.log(LISBetter([2, 1, 5, 3, 6, 4, 8, 9, 7])); // [ 1, 3, 4, 7, 9 ]