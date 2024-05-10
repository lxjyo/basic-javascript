/**
 * 数组乱序
 * @param {*} arr 
 */
function shuttle(arr) {
  const len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    // 在剩余位置中随机生成一个索引
    const randomIndex = Math.floor(Math.random() * (i + 1));
    console.log(i + 1, randomIndex);
    // 交换两个位置
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
}

const arr = [1, 2, 3, 4, 5];
shuttle(arr);
console.log(arr);
