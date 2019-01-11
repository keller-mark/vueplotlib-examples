<template>
  <div id="example">
    <PlotContainer
      :pWidth="(windowWidth - 120 - 20)"
      :pHeight="(windowHeight - 20 - 100)"
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
import { mapGetters } from 'vuex';
import { PlotContainer, Axis, ScatterPlot } from 'vue-declarative-plots';

export default {
  name: 'Example',
  components: {
    PlotContainer,
    Axis,
    ScatterPlot
  },
  computed: {
    ...mapGetters([
      'getStack',
      'getData',
      'getScale',
      'windowWidth',
      'windowHeight'
    ])
  }
}
</script>
<style>
@import '~vue-declarative-plots/dist/vue-declarative-plots.css';
</style>