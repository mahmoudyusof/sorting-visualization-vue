export default {
  methods: {
    async timSort(auxilaryArray, start, end) {
      if (end - start <= 32) {
        for (let i = 0; i < this.arr.length; i++) {
          if (!(i >= start && i <= end)) {
            this.$set(this.state, i, 0);
          }
        }
        await this.insertionSort(start, end);
        for (let i = start; i <= end; i++) {
          auxilaryArray[i] = this.arr[i];
        }
        return;
      } else {
        let mid = Math.floor((start + end) / 2);
        await this.timSort(auxilaryArray, start, mid);
        await this.timSort(auxilaryArray, mid + 1, end);
        await this.merge(start, mid, end, auxilaryArray);
      }
    },
  },
};
