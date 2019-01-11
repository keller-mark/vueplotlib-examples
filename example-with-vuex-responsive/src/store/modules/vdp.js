// initial state
const state = {
    stack: null,
    data: {},
    scales: {}
}

// getters
const getters = {
    getStack: (state) => () => {
        return state.stack;
    },
    getData: (state) => (key) => {
        return state.data[key];
    },
    getScale: (state) => (key) => {
        return state.scales[key];
    }
}

// actions
const actions = {

}

// mutations
const mutations = {
    setStack(state, stack) {
        state.stack = stack;
    },
    setData(state, { key, data }) {
        state.data[key] = data;
    },
    setScale(state, { key, scale }) {
        state.scales[key] = scale;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}