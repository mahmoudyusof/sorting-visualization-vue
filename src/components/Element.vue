<template functional>
  <div
    class="el"
    :style="{
      width: `${props.width}px`,
      height: `${props.height}px`,
      left: `${props.pos * props.width + 1}px`,
      'background-color': props.state ? '#4fc08d' : '#2c3e50'
    }"
  ></div>
</template>

<script>
export default {
  name: "app-el",
  props: {
    height: Number,
    width: Number,
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
</style>
