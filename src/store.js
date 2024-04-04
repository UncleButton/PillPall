// src/store.js
import { createStore } from 'vuex';
import Schedule from './models/Schedule';
import Reminder from './models/Reminder';
import apiService from './apiService';

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
    PINDone: true,
    informationBanner: false,
    successBanner: false,
    warningBanner: false,
    errorBanner: false,
    informationBannerText: "",
    successBannerText: "",
    warningBannerText: "",
    errorBannerText: "",
    dispensing: false
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
    setInformationBanner(state, text){
      state.informationBanner = true;
      state.informationBannerText = text;
    },
    setSuccessBanner(state, text){
      state.successBanner = true;
      state.successBannerText = text;
    },
    setWarningBanner(state, text){
      state.warningBanner = true;
      state.warningBannerText = text;
    },
    setErrorBanner(state, text){
      state.errorBanner = true;
      state.errorBannerText = text;
    },
    setDispensing(state, bool){
      state.dispensing = bool;
    },
    clearInformationBanner(state){
      state.informationBanner = false;
      state.informationBannerText = "";
    },
    clearSuccessBanner(state){
      state.successBanner = false;
      state.successBannerText = "";
    },
    clearWarningBanner(state){
      state.warningBanner = false;
      state.warningBannerText = "";
    },
    clearErrorBanner(state){
      state.errorBanner = false;
      state.errorBannerText = "";
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

      //set next time correctly
      var upcomingScheduleTime;
      var loop = 0;
      if(upcomingSchedule != null){
        while(loop < upcomingSchedule.times.length){
          var time = upcomingSchedule.times[loop];
          if(currentHour < parseInt(time.dateTime.slice(0,2)) || (currentHour == parseInt(time.dateTime.slice(0,2)) && currentMinute <= parseInt(time.dateTime.slice(2)))){
            upcomingScheduleTime = upcomingSchedule.times[loop].dateTime;
            break;
          }
          loop++;
        }
      }
      

      state.nextSchedule = upcomingSchedule;
      state.nextScheduleTime = upcomingScheduleTime;
    },
    async sendScheduleReminders(state){
      const today = new Date();
      const todaysSchedules = state.schedules.filter(schedule => schedule.days.includes(state.weekDays[today.getDay()]));
      
      todaysSchedules.forEach(async schedule => {
        schedule.times.forEach(async time => {
          var dateTime = new Date();
          dateTime.setHours(time.dateTime.slice(0,2), time.dateTime.slice(2));

          var now = new Date();
          var diffInMillis = (dateTime - now);
          var diffInMinutes = Math.floor((diffInMillis/1000)/60);

          if((diffInMinutes == 60 || diffInMinutes == 5) && schedule.notificationEmail != "") {
            var reminder = new Reminder();
            reminder.toAddress = schedule.notificationEmail;
            reminder.subject = "PillPal Schedule Reminder: \"" + schedule.name + "\" in ";
            reminder.subject += diffInMinutes == 60 ? "1 hour." : "5 minutes.";
            reminder.body = "Your schedule \"" + schedule.name + "\" is scheduled for " + (diffInMinutes == 60 ? "1 hour" : "5 minutes") + " from now.  Don't forget to take it!";
            await apiService.sendReminder(reminder);
            console.log("sent reminder");
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

export default store;
