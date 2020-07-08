export default {
  methods: {
    async quickSort(start, end) {
      if (start >= end) return;
      let pivot = Math.floor((start + end) / 2);
      this.$set(this.state, pivot, 3);
      let index = await this.partition(start, end, pivot);
      // if you want to see how it would look like if you use parallel processing
      // await Promise.all([this.quickSort(start, index - 1), this.quickSort(index, end)])
      // Note that javascript is single thrided, but this is how it WOULD look like
      await this.quickSort(start, index - 1);
      for (let i = start; i < index; i++) {
        this.$set(this.state, i, 1);
      }
      await this.quickSort(index, end);
      for (let i = index; i <= end; i++) {
        this.$set(this.state, i, 1);
      }
    },
    async partition(start, end, pivot) {
      var left = start;
      var right = end;
      var c = this.arr[pivot];
      while (left <= right) {
        while (this.arr[left] < c) {
          left += 1;
        }

        while (this.arr[right] > c) {
          right -= 1;
        }

        if (left <= right) {
          this.$set(this.state, left, 2);
          this.$set(this.state, right, 2);
          await this.sleep(this.delay);
          this.swap(left, right);
          this.$set(this.state, left, 0);
          this.$set(this.state, right, 0);
          left += 1;
          right -= 1;
        }
      }
      return left;
    },
  },
};
