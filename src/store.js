// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    containerIndex: -1,
    containers: [],
    schedules: [],
    scheduleIndex: -1,
    weekDays: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  },
  mutations: {
    setContainerIndex(state, newValue){
        state.containerIndex = newValue;
    },
    setScheduleIndex(state, newValue){
      state.scheduleIndex = newValue;
    },
    setContainer(state, id, newMeds){
        state.containers[id] = newMeds;
    },
    setAllContainers(state, newContainers){
        state.containers = newContainers;
    },
    setAllSchedules(state, newSchedules){
      state.schedules = newSchedules;
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
    getScheduleIndex(state){
      return state.scheduleIndex;
    },
    getContainers(state) {
        return state.containers;
    },
    getSchedules(state) {
      return state.schedules;
    },
    getContainerAtIndex(state) {
      return state.containers[state.containerIndex];
    },
    getScheduleAtIndex(state){
      return state.schedules[state.scheduleIndex];
    },
    getCurrentWeekDay(state) {
      const today = new Date();
      return state.weekDays[today.getDay()];
    },
    getWeekDay(state, dayIndex){
      return state.weekDays[dayIndex];
    }
  }
});

export default store;
