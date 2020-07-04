export default {
  methods: {
    async timSort(ar, start) {
      if (ar.length <= 32) {
        await this.insertionSort(start, ar.length + start);
        return this.arr.slice(start, start + ar.length);
      } else {
        let mid = Math.floor(ar.length / 2);
        let left = await this.timSort(ar.slice(0, mid), start);
        let right = await this.timSort(ar.slice(mid), mid + start);
        for (let i = 0; i < this.arr.length; i++) {
          if (i >= start && i < start + ar.length) {
            this.$set(this.state, i, 1);
          } else {
            this.$set(this.state, i, 0);
          }
        }
        let s = this.merge(left, right, start, mid + start);
        await this.populate(s, start);
        return s;
      }
    },
  },
};
