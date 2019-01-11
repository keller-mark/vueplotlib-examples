import Vue from 'vue'
import Vuex from 'vuex'

import vdp from './modules/vdp'
import responsivity from './modules/responsivity'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vdp,
    responsivity
  }
})