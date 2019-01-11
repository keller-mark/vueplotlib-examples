<template>
  <div id="example">
    <PlotContainer
      :pWidth="500"
      :pHeight="300"
      :pMarginTop="10"
      :pMarginLeft="120"
      :pMarginRight="10"
      :pMarginBottom="100"
    >
      <Axis
        slot="axisLeft"
        variable="Horsepower"
        side="left" 
        :tickRotation="-35"
        :getScale="getScale"
        :getStack="getStack"
      />
      <ScatterPlot
        slot="plot"
        data="cars"
        x="Cylinders"
        y="Horsepower"
        :getData="getData"
        :getScale="getScale"
      />
      <Axis
        slot="axisBottom"
        variable="Cylinders"
        side="bottom" 
        :getScale="getScale"
        :getStack="getStack"
      />
    </PlotContainer>
  </div>
</template>
<script>
import { PlotContainer, Axis, ScatterPlot } from 'vue-declarative-plots';
import { HistoryStack, EVENT_TYPES, EVENT_SUBTYPE_RESETS } from 'vue-declarative-plots';
import { ContinuousScale, DataContainer } from 'vue-declarative-plots';

export default {
  name: 'Example',
  components: {
    PlotContainer,
    Axis,
    ScatterPlot
  },
  data() {
    return {
      plotData: {},
      plotScales: {},
      plotStack: null
    };
  },
  created() {
    /* 
      Initialize the data
    */
    // Example of passing a promise that returns an array to the DataContainer constructor:
    this.plotData["cars"] = new DataContainer(
      "cars",
      "Cars",
      fetch('https://vega.github.io/vega-datasets/data/cars.json', {mode: 'cors'}).then((response) => {
          return response.json();
      })
    );
    
    /* 
      Initialize the scales
    */
    // Example of passing an array to the ContinuousScale constructor:
    this.plotScales["Cylinders"] = new ContinuousScale(
      "Cylinders",
      "Number of Cylinders",
      [2, 9]
    );

    // Example of passing a promise that returns an array to the ContinuousScale constructor:
    this.plotScales["Horsepower"] = new ContinuousScale(
      "Horsepower",
      "Horsepower",
      fetch('https://vega.github.io/vega-datasets/data/cars.json', {mode: 'cors'}).then((response) => {
          return response.json();
      }).then((data) => {
        let values = data.map(el => el["Horsepower"]);
        return [Math.min(...values), Math.max(...values)];
      })
    );

    /* 
      Initialize the history stack
    */
    this.plotStack = new HistoryStack(
      {
        [EVENT_TYPES.SCALE]: this.getScale,
        [EVENT_TYPES.DATA]: this.getData
      }, 
      {
        ...EVENT_SUBTYPE_RESETS
      }
    );
  },
  methods: {
    getData(key) {
      return this.plotData[key];
    },
    getScale(key) {
      return this.plotScales[key];
    },
    getStack() {
      return this.plotStack;
    }
  }
}
</script>
<style>
@import '~vue-declarative-plots/dist/vue-declarative-plots.css';
</style>