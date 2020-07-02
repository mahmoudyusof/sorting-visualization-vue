export default {
  methods: {
    async mergeSort(ar, start) {
      if (ar.length == 1) {
        return ar;
      } else {
        let mid = Math.floor(ar.length / 2);
        let left = await this.mergeSort(ar.slice(0, mid), start);
        let right = await this.mergeSort(ar.slice(mid), mid + start);
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
    merge(a, b, start, mid) {
      let res = [];
      let i = 0;
      let j = 0;
      while (a.length && b.length) {
        let s1 = this.state[start + i];
        let s2 = this.state[mid + j];
        this.$set(this.state, start + i, 2);
        this.$set(this.state, mid + j, 2);
        if (a[0] >= b[0]) {
          res.push(b[0]);
          b.shift();
        } else {
          res.push(a[0]);
          a.shift();
        }
        this.$set(this.state, start + i, s1);
        this.$set(this.state, mid + j, s2);
      }
      if (!a.length) {
        res = res.concat(b);
      } else if (!b.length) {
        res = res.concat(a);
      }
      return res;
    },
    async populate(ar, start) {
      for (let i = 0; i < ar.length; i++) {
        let s = this.state[start + i];
        this.$set(this.state, start + i, 2);
        await this.sleep(1);
        this.$set(this.arr, start + i, ar[i]);
        this.$set(this.state, start + i, s);
      }
    },
  },
};
