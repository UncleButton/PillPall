<template>    
    <div class="scheduleBackgroundContainer">
        <div v-for="index in [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" :key="index" class="hourMarkers">
            {{ index <= 12 ? index+" AM" : index-12+" PM" }}
        </div>
    </div>
    <div class="scheduleBackgroundContainer">
        <div v-for="index in [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" :key="index" class="calendarScheduleRow">
            <div v-for="schedule in schedulesAtHour(index)">
                  <div class="calendarSchedule" @click="viewSchedule(schedule)">{{ schedule.name }}</div>
            </div>
        </div>
    </div>
    <div class="addNewScheduleButton" @click="goToAddSchedule()">
        <img class="addIcon" src="../../assets/scheduleIcon.png">
        <div class="pill-count">New Schedule</div>
    </div>
</template>

<script>

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
    schedulesAtHour(hour){
      const schedulesToday = this.$store.getters.getTodaysSchedules;
      const schedulesAtHour = schedulesToday.filter(schedule => schedule.times.filter(time => hour == parseInt(time.dateTime.slice(0,2))).length>0);
      return schedulesAtHour;
    },
    async viewSchedule(schedule){
      if(schedule.pin != "")
      {
        await this.challengePin(schedule.pin);
                
        if(!this.$store.state.PINApproved)
          return;  
      }
      var scheduleIndex = this.schedules.indexOf(schedule);
      this.$store.commit('setScheduleIndex', scheduleIndex);
      this.goToScheduleView()
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
    background-color: var(--mostly-translucent-blue);
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
      width: fit-content;
      background: var(--secondary-blue);
      border-radius: 10px;
      height: 18px;
      padding-left: 20px;
      padding-right: 20px;
    }
}
.addNewScheduleButton {
    position: absolute;
    background-color: var(--secondary-blue);
    top: 200px;
    right: 5px;
    width: 100px;
    height: 75px;
    border-radius: 10px;
    display: flex; /* Use flexbox layout */
    flex-direction: column;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    margin: 5px;
}

.addIcon {
  display: flex; /* Use flexbox layout */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  width: 40px;
  height: 40px;
}

</style>