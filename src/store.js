// src/store.js
import { createStore } from 'vuex';
import Schedule from './models/Schedule';
import globalFunctions from './globalFunctions';
import apiService from './apiService';
import DateTimeWidget from './components/DateTimeWidget.vue';

const store = createStore({
  state: {
    containerIndex: -1,
    containers: [],
    schedules: [],
    scheduleIndex: -1,
    weekDays: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    nextSchedule: new Schedule(),
    nextScheduleTime: "",
    PINAnswer: "",
    PINApproved: true,
    PINChallengeInProgress: false,
    PINDone: true
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
    },
    challengePIN(state, pin){
      state.PINAnswer = pin;
      state.PINApproved = false;
      state.PINChallengeInProgress = true;
      state.PINDone = false;
    },
    pinApproved(state){
      console.log("PIN Approved");
      state.PINApproved = true;
      state.PINChallengeInProgress = false;
      state.PINAnswer = "";
    },
    pinDeclined(state){
      console.log("PIN Declined");
      state.PINApproved = false;
      state.PINChallengeInProgress = false;
      state.PINAnswer = "";
    },
    setNextSchedule(state){
      const today = new Date();
      const todaysSchedules = state.schedules.filter(schedule => schedule.days.includes(state.weekDays[today.getDay()]));

      var currentHour = today.getHours();
      var currentMinute = today.getMinutes();

      var upcomingSchedules = todaysSchedules.filter(schedule => schedule.times.filter(time => 
        currentHour < parseInt(time.dateTime.slice(0,2)) ||
        (
          currentHour == parseInt(time.dateTime.slice(0,2)) &&
          currentMinute <= parseInt(time.dateTime.slice(2))
        ) 
      ).length>0);
      
      var sortedUpcomingSchedules = upcomingSchedules.sort((a, b) => {
        // get a and b times that are greater than the current time (discard rest)
        let timesA = a.times.filter(time => 
          currentHour < parseInt(time.dateTime.slice(0,2)) ||
          (
            currentHour == parseInt(time.dateTime.slice(0,2)) &&
            currentMinute <= parseInt(time.dateTime.slice(2))
          ) 
        );
        let timesB = b.times.filter(time => 
          currentHour < parseInt(time.dateTime.slice(0,2)) ||
          (
            currentHour == parseInt(time.dateTime.slice(0,2)) &&
            currentMinute <= parseInt(time.dateTime.slice(2))
          ) 
        );

        //sort a and b times smallest to largest
        timesA = timesA.sort((x, y) => x.dateTime - y.dateTime);
        timesB = timesB.sort((x, y) => x.dateTime - y.dateTime);
    
        // Compare the shortest times in each a and b
        if (timesA[0].dateTime < timesB[0].dateTime) {
            return -1; // 'a' should come before 'b' in the sorted order
        }
        if (timesA[0].dateTime > timesB[0].dateTime) {
            return 1; // 'b' should come before 'a' in the sorted order
        }
        return 0; // Names are equal
      });

      var upcomingSchedule = sortedUpcomingSchedules[0];
      var upcomingScheduleTime = upcomingSchedule?.times[0]?.dateTime;

      state.nextSchedule = upcomingSchedule;
      state.nextScheduleTime = upcomingScheduleTime;
    },
    async sendScheduleReminders(state){
      store.state.schedules.forEach(async schedule => {
        schedule.times.forEach(async time => {
          var dateTime = new Date();
          dateTime.setHours(time.dateTime.slice(0,2), time.dateTime.slice(2));

          var now = new Date();
          var diffInMillis = (dateTime - now);
          var diffInMinutes = Math.floor((diffInMillis/1000)/60);

          if(diffInMinutes == 30 && schedule.notificationEmail != "") {
            await apiService.sendReminder(schedule);
            console.log("sent reminder");
            delay(5000);
          } 
        })
      })
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
    },
    getCurrentMonth(state) {
      const today = new Date();
      return state.months[today.getMonth()];
    },
    getCurrentMonthDay(state) {
      const today = new Date();
      return today.getDate();
    },
    getTodaysSchedules(state){
      const today = new Date();
      const todaysSchedules = state.schedules.filter(schedule => schedule.days.includes(state.weekDays[today.getDay()]));
      return todaysSchedules;
    },
    getNextSchedule(state){
      return state.nextSchedule;
    },
    getNextScheduleTime(state){
      return state.nextScheduleTime;
    }
  }
});

const delay = ms => new Promise(res => setTimeout(res, ms));

export default store;
