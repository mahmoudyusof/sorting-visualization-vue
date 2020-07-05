<template>
  <div id="app">
    <nav>
      <button @click="shuffle" :disabled="sorting">Shuffle</button>
      <div class="sorters">
        <button @click="sort('merge')" :disabled="sorting">Merge</button>
        <button @click="sort('tim')" :disabled="sorting">Tim</button>
        <button @click="sort('insertion')" :disabled="sorting">Insertion</button>
        <button @click="sort('quick')" :disabled="sorting">Quick</button>
      </div>
      <div class="knobs">
        <div class="knob-group">
          <label for="width">Width</label>
          <input
            :disabled="sorting"
            id="width"
            type="range"
            v-model="elWidth"
            min="2"
            max="80"
            step="2"
          />
        </div>
        <div class="knob-group">
          <label for="delay">Delay</label>
          <input id="delay" type="range" v-model="delay" min="0" max="1000" step="10" />
        </div>
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
import insertion from "./mixins/insertion.js";
import tim from "./mixins/tim.js";

export default {
  name: "App",
  mixins: [merge, quick, insertion, tim],
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
      elWidth: 5,
      sorting: false,
      delay: 10
    };
  },
  methods: {
    shuffle() {
      for (let i = this.arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        this.swap(i, j);
        this.$set(this.state, i, 0);
      }
      this.$set(this.state, 0, 0);
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    initialize() {
      const steps = Math.floor(this.width / this.elWidth);
      const step_height = this.height / steps;
      for (let i = 1; i <= steps; i++) {
        this.arr.push(Math.floor(i * step_height));
        this.state.push(0);
      }
      this.shuffle();
    },
    swap(i, j) {
      let temp = this.arr[i];
      this.$set(this.arr, i, this.arr[j]);
      this.$set(this.arr, j, temp);
    },
    async merge(start, mid, end, auxilaryArray) {
      let k = start;
      let i = start;
      let j = mid + 1;
      for (let i = 0; i < this.arr.length; i++) {
        if (i >= start && i <= end) {
          this.$set(this.state, i, 1);
        } else {
          this.$set(this.state, i, 0);
        }
      }

      while (i <= mid && j <= end) {
        this.$set(this.state, i, 2);
        this.$set(this.state, j, 2);
        await this.sleep(this.delay);
        this.$set(this.state, i, 1);
        this.$set(this.state, j, 1);
        if (auxilaryArray[i] <= auxilaryArray[j]) {
          this.$set(this.arr, k, auxilaryArray[i]);
          i++;
        } else {
          this.$set(this.arr, k, auxilaryArray[j]);
          j++;
        }
        k++;
      }
      while (i <= mid) {
        this.$set(this.arr, k, auxilaryArray[i]);
        i++;
        k++;
      }

      while (j <= end) {
        this.$set(this.arr, k, auxilaryArray[j]);
        j++;
        k++;
      }
      for (let x = start; x < k; x++) {
        auxilaryArray[x] = this.arr[x];
      }
    },
    async sort(algo) {
      this.sorting = true;
      if (algo === "merge") {
        await this.mergeSort(this.arr.slice(), 0, this.arr.length - 1);
      } else if (algo === "insertion") {
        await this.insertionSort(0, this.arr.length - 1);
      } else if (algo === "quick") {
        await this.quickSort(0, this.arr.length - 1);
      } else if (algo === "tim") {
        await this.timSort(this.arr.slice(), 0, this.arr.length - 1);
      }
      this.sorting = false;
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
.knobs {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.knob-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 10px;
}
.knob-group label {
  color: white;
}
</style>
