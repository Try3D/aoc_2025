class Heap<T> {
  heap: T[];
  comparator: (a: T, b: T) => boolean;

  constructor(nums: T[] = [], comparator: (a: T, b: T) => boolean) {
    this.heap = [];
    this.comparator = comparator;

    for (const num of nums) {
      this.add(num);
    }
  }

  private swap(i: number, j: number) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  add(value: T) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  private heapifyUp(index: number) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parent])) {
        this.swap(index, parent);
        index = parent;
      } else {
        break;
      }
    }
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop() as T;
    this.heapifyDown(0);

    return root;
  }

  private heapifyDown(index: number) {
    const n = this.heap.length;

    while (true) {
      let best = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < n && this.comparator(this.heap[left], this.heap[best])) {
        best = left;
      }

      if (right < n && this.comparator(this.heap[right], this.heap[best])) {
        best = right;
      }

      if (best !== index) {
        this.swap(index, best);
        index = best;
      } else {
        break;
      }
    }
  }
}

export default Heap;
