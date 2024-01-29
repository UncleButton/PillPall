// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    containerIndex: -1,
    containers: []
  },
  mutations: {
    setContainerIndex(state, newValue){
        state.containerIndex = newValue;
    },
    setContainer(state, id, newMeds){
        state.containers[id] = newMeds;
    },
    setAllContainers(state, newContainers){
        state.containers = newContainers;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    }
  },
  getters: {
    getContainerIndex(state) {
      return state.containerIndex;
    },
    getContainers(state) {
        return state.containers;
    },
    getContainerAtIndex(state) {
        return state.containers[state.containerIndex];
    }
  }
});

export default store;
