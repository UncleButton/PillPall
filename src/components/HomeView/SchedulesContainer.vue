<template>    
    <div class="scheduleBackgroundContainer">
        <div v-for="index in [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" :key="index" class="hourMarkers">
            {{ index <= 12 ? index+" AM" : index-12+" PM" }}
        </div>
    </div>
    <div class="scheduleBackgroundContainer">
        <div v-for="index in [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" :key="index" class="calendarScheduleRow">
            <div v-for="schedule in schedulesAtHour(index)">
                  <div class="calendarSchedule" @click="goToScheduleView(schedule)">{{ schedule.name }}</div>
            </div>
        </div>
    </div>
    <div class="addNewScheduleButton" @click="goToAddSchedule()">Add Schedule</div>
</template>

<script>

import Medication from '@/models/Medication';
import apiService from '@/apiService';
import globalFunctions from '@/globalFunctions';

export default {
  components: {
    
  },
  data() {
    return {
      schedules: this.$store.state.schedules,
    }
  },
  mounted(){
    
  },
  methods: {
    goToAddSchedule() {
      this.$router.push({name: 'add schedule'});
    },
    schedulesAtHour(hour){
      const schedulesToday = this.$store.getters.getTodaysSchedules;
      const schedulesAtHour = schedulesToday.filter(schedule => schedule.times.filter(time => hour == parseInt(time.dateTime.slice(0,2))).length>0);
      return schedulesAtHour;
    },
    goToScheduleView(schedule){
      var scheduleIndex = this.schedules.indexOf(schedule);
      this.$store.commit('setScheduleIndex', scheduleIndex);
      this.$router.push({name: 'schedule view'});
    }
  }
}

</script>

<style>
.scheduleBackgroundContainer {
    position: absolute;
    left: 75px;
    display: flex;
    flex-direction: column;
}
.hourMarkers {
    border-bottom: white solid 1px;
    width: 600px;
    height: 20px;
}
.calendarScheduleRow {
    background-color: rgb(255,255,255,0.1);
    margin-left:50px;
    width: 550px;
    height: 20px;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: space-evenly;
    .calendarSchedule {
      display: flex; /* Use flexbox layout */
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
      width: 150px;
      background: green;
      border-radius: 10px;
      height: 18px;
    }
}
.addNewScheduleButton {
    position: absolute;
    background-color: green;
    top: 200px;
    right: 5px;
    width: 100px;
    height: 75px;
    border-radius: 10px;
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    margin: 5px;
}

</style>