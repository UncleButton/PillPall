<template>    
    <div class="scheduleBackgroundContainer">
        <div v-for="index in [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]" :key="index" class="hourMarkers">
            {{ index <= 12 ? index+" AM" : index-12+" PM" }}
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
    console.log(this.schedules.length);
  },
  methods: {
    goToAddSchedule() {
        this.$router.push({name: 'add schedule'});
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
    width: 500px;
    height: 20px;
}
.addNewScheduleButton {
    position: absolute;
    background-color: green;
    top: 200px;
    right: 75px;
    width: 100px;
    height: 75px;
    border-radius: 10px;
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    margin: 5px;
}

</style>