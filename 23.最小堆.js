/**
 * 最小堆：首先是一个完全二叉树，然后是每个节点都小于等于其左右孩子节点。
 * 新增元素：将元素插入到堆的底部，然后向上调整，直到满足最小堆要求。
 * 删除元素：将堆顶元素与堆中最后一个元素交换，然后删除最后一个元素，然后向下调整，直到满足最小堆要求。
 */

class MinHeap {
  constructor() {
    this.heap = []; // 存放堆中的元素
  }

  add(value) {
    this.heap.push(value);
    this.slideUp(this.heap.length - 1);
    console.log('heap', this.heap.toString())
  }

  remove() {
    if (this.heap.length === 0) return undefined;
    this.swap(0, this.heap.length - 1);
    const value = this.heap.pop();
    this.slideDown(0);
    console.log('heap', this.heap.toString())
    return value;
  }
  // 向上调整
  slideUp(index) {
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] > this.heap[index]) {
        this.swap(index, parentIndex);
        this.slideUp(parentIndex);
      }
    }
  }

  // 向下调整
  slideDown(index) {
    const len = this.heap.length;
    if (index < len - 1) {
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 2;
      let minIndex = index;
      if (leftIndex < len && this.heap[leftIndex] < this.heap[minIndex]) {
        minIndex = leftIndex;
      }
      if (rightIndex < len && this.heap[rightIndex] < this.heap[minIndex]) {
        minIndex = rightIndex;
      }
      if (index !== minIndex) {
        this.swap(index, minIndex);
        this.slideDown(minIndex);
      }
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}


const minHeap = new MinHeap();

minHeap.add(3);
minHeap.add(2);
minHeap.remove();
minHeap.add(4);
minHeap.add(6);
minHeap.remove();
minHeap.add(5);
minHeap.add(1);
