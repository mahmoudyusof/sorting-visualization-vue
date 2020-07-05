export default {
  methods: {
    async mergeSort(auxilaryArray, start, end) {
      if (start === end) return;

      const mid = Math.floor((start + end) / 2);
      await this.mergeSort(auxilaryArray, start, mid);
      await this.mergeSort(auxilaryArray, mid + 1, end);
      await this.merge(start, mid, end, auxilaryArray);
    },
  },
};
