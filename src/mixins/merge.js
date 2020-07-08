export default {
  methods: {
    async mergeSort(auxilaryArray, start, end) {
      if (start === end) return;

      const mid = Math.floor((start + end) / 2);
      // if you want to see how it would look like if you use parallel processing
      // await Promise.all([this.mergeSort(auxilaryArray, start, mid), this.mergeSort(auxilaryArray, mid + 1, end)])
      // Note that javascript is single thrided, but this is how it WOULD look like
      await this.mergeSort(auxilaryArray, start, mid);
      await this.mergeSort(auxilaryArray, mid + 1, end);
      await this.merge(start, mid, end, auxilaryArray);
    },
  },
};
