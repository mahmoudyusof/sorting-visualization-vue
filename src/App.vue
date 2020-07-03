<template>
  <div id="app">
    <nav>
      <div class="sorters">
        <button @click="shuffle">Shuffle</button>
        <button @click="mergeSort(arr, 0)">Merge</button>
        <button>Bubble</button>
        <button>Insertion</button>
        <button @click="quickSort(0, arr.length-1)">Quick</button>
      </div>
      <div class="knobs">
        <input type="range" v-model="elWidth" min="2" max="80" step="2" />
      </div>
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
import merge from "./mixins/merge.js";
import quick from "./mixins/quick.js";

export default {
  name: "App",
  mixins: [merge, quick],
  components: {
    "app-el": Element
  },
  created() {
    this.initialize();
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
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    initialize() {
      const steps = Math.floor(this.width / this.elWidth);
      const step_height = Math.floor(this.height / (this.width / this.elWidth));
      for (let i = 1; i <= steps; i++) {
        this.arr.push(i * step_height);
        this.state.push(0);
      }
      this.shuffle();
    }
  },
  watch: {
    elWidth() {
      this.arr = [];
      this.initialize();
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
