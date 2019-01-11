import Vue from 'vue'
import Vuex from 'vuex'

import vdp from './modules/vdp'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vdp
  }
})