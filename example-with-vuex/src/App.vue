<template>
  <div id="app">
    <Example />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { HistoryStack, EVENT_TYPES, EVENT_SUBTYPE_RESETS } from 'vue-declarative-plots';
import { ContinuousScale, DataContainer } from 'vue-declarative-plots';

import Example from './components/Example.vue';

export default {
  name: 'app',
  components: {
    Example
  },
  created() {
    /* 
      Initialize the data
    */
    // Example of passing a promise that returns an array to the DataContainer constructor:
    const carsData = new DataContainer(
      "cars",
      "Cars",
      fetch('https://vega.github.io/vega-datasets/data/cars.json', {mode: 'cors'}).then((response) => {
          return response.json();
      })
    );
    this.setData({ key: "cars", data: carsData });
    
    /* 
      Initialize the scales
    */
    // Example of passing an array to the ContinuousScale constructor:
    const cylindersScale = new ContinuousScale(
      "Cylinders",
      "Number of Cylinders",
      [2, 9]
    );
    this.setScale({ key: "Cylinders", scale: cylindersScale });

    // Example of passing a promise that returns an array to the ContinuousScale constructor:
    const horsepowerScale = new ContinuousScale(
      "Horsepower",
      "Horsepower",
      fetch('https://vega.github.io/vega-datasets/data/cars.json', {mode: 'cors'}).then((response) => {
          return response.json();
      }).then((data) => {
        let values = data.map(el => el["Horsepower"]);
        return [Math.min(...values), Math.max(...values)];
      })
    );
    this.setScale({ key: "Horsepower", scale: horsepowerScale });

    /* 
      Initialize the history stack
    */
    const stack = new HistoryStack(
      {
        [EVENT_TYPES.SCALE]: this.getScale,
        [EVENT_TYPES.DATA]: this.getData
      }, 
      {
        ...EVENT_SUBTYPE_RESETS
      }
    );
    this.setStack(stack);
  },
  methods: {
    ...mapMutations([
      'setStack',
      'setData',
      'setScale'
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
</style>
