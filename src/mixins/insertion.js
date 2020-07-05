export default {
  methods: {
    async insertionSort(start, end) {
      for (let i = start + 1; i <= end; i++) {
        if (this.arr[i] < this.arr[i - 1]) {
          await this.insert(i, start);
        } else {
          this.$set(this.state, i, 1);
        }
      }
    },
    async insert(index, start) {
      while (this.arr[index] < this.arr[index - 1] && index > start) {
        this.$set(this.state, index, 2);
        this.$set(this.state, index - 1, 2);
        await this.sleep(this.delay);
        this.swap(index, index - 1);
        this.$set(this.state, index, 1);
        this.$set(this.state, index - 1, 1);
        index = index - 1;
      }
      this.$set(this.state, index, 1);
    },
  },
};
