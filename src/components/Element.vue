<template functional>
  <div
    class="el"
    :style="{
      width: `${props.width}px`,
      height: `${props.height}px`,
      left: `${props.pos * props.width + 1}px`,
    }"
    :class="{
      default: props.state === 0,
      sort: props.state === 1,
      compare: props.state === 2,
      pivot: props.state === 3
    }"
  ></div>
</template>

<script>
export default {
  name: "app-el",
  props: {
    height: Number,
    width: {
      type: [Number, String]
    },
    pos: Number,
    state: Number
  }
};
</script>

<style>
.el {
  background-color: #2c3e50;
  border-right: 1px solid white;
  position: absolute;
  bottom: 0;
}
.default {
  background-color: #2c3e50;
}
.sort {
  background-color: #4fc08d;
}
.compare {
  background-color: #ff3232;
}
.pivot {
  background-color: #ffff6a;
}
</style>
