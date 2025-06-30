/**
 * 冒泡排序：比较相邻的两项，如果第一项比第二项大，则交换他们。
 * @param {*} arr
 */
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

const arr = [3, 2, 5, 1, 7, 9];
bubbleSort(arr);
console.log(arr);

/**
 * 选择排序: 原址比较排序算法。找到数据结构中的最小值放在第一位，然后找到第二小的值放到第二位…
 */

function selectSort(arr) {
  const len = arr.length;
  let minIndex;
  for (let i = 0; i < len; i++) {
    minIndex = i;
    // 找到最小值的索引
    for (var j = i; j < len; j++) {
      if (this[j] < this[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      temp = this[minIndex];
      this[minIndex] = this[i];
      this[i] = temp;
    }
  }
}

Array.prototype.insertSort = function () {
  var len = this.length,
    temp = this[0],
    tempIndex = 0;
  for (var i = 1; i < len; i++) {
    tempIndex = i;
    temp = this[i];
    while (tempIndex > 0 && this[tempIndex - 1] > temp) {
      this[tempIndex] = this[tempIndex - 1];
      tempIndex--;
    }
    this[tempIndex] = temp;
  }
};
arr.insertSort();
