<template>
  <div id="app">
    <nav>
      <button @click="shuffle">Shuffle</button>
      <button @click="mergeSort(arr, 0)">Merge</button>
      <button>Bubble</button>
      <button>Insertion</button>
      <button>Quick</button>
    </nav>
    <div class="container">
      <div class="array">
        <app-el
          v-for="(h, i) in arr"
          :state="state[i]"
          :width="elWidth"
          :height="h"
          :pos="i"
          :key="i"
        ></app-el>
      </div>
    </div>
  </div>
</template>

<script>
import Element from "./components/Element.vue";

export default {
  name: "App",
  components: {
    "app-el": Element
  },
  created() {
    const steps = Math.floor(this.width / this.elWidth);
    const step_height = Math.floor(this.height / steps);
    for (let i = 1; i <= steps; i++) {
      this.arr.push(i * step_height);
      this.state.push(0);
    }
    this.shuffle();
  },
  data() {
    return {
      arr: [],
      state: [],
      width: 800,
      height: 500,
      elWidth: 5
    };
  },
  methods: {
    shuffle() {
      for (let i = this.arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = this.arr[i];
        this.$set(this.arr, i, this.arr[j]);
        this.$set(this.arr, j, temp);
        this.$set(this.state, i, 0);
      }
      this.$set(this.state, 0, 0);
    },
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
      while (a.length && b.length) {
        if (a[0] >= b[0]) {
          res.push(b[0]);
          b.shift();
        } else {
          res.push(a[0]);
          a.shift();
        }
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
        this.$set(this.arr, start + i, ar[i]);
        await this.sleep(10);
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  background-color: #eee;
  height: 600px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.array {
  height: 500px;
  width: 800px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 0 20px;
}
nav button {
  background-color: #222;
  border: none;
  padding: 20px 30px;
  color: #ddd;
  cursor: pointer;
  transition: ease all 0.2s;
}
nav button:hover {
  background-color: black;
  color: white;
}
</style>
