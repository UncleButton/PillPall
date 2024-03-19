<template>    
    <div class="headerContainer">
        <h1 class="newPillsHeader">Dispense Log</h1>
    </div>

    <table>
        <tr>
            <th>YYYY-MM-DD</th>
            <th>HH:MM:SS</th>
            <th>Medication Name</th>
            <th>Number dispensed</th>
            <th>Schedule Name</th>
        </tr>
        <tr v-for="(log, index) in dispenseLogs" :key="index" class="row">
          <td v-if="index >= page*pageSize && index < page*pageSize + pageSize">{{ log.getDate() }}</td>
          <td v-if="index >= page*pageSize && index < page*pageSize + pageSize">{{ log.getTime() }}</td>
          <td v-if="index >= page*pageSize && index < page*pageSize + pageSize">{{ log.medName }}</td>
          <td v-if="index >= page*pageSize && index < page*pageSize + pageSize">{{ log.numPills }}</td>
          <td v-if="index >= page*pageSize && index < page*pageSize + pageSize">{{ log.scheduleName }}</td>
        </tr>
    </table>
    
    <button @click="page++">+</button>
    <button @click="page--">-</button>

</template>

<script>

import Medication from '@/models/Medication';
import apiService from '@/apiService';
import TextField from '@/components/TextField.vue';
import Schedule from '@/models/Schedule';
import Time from '@/models/Time';
import ScheduleMed from '@/models/ScheduleMed';
import DropDown from '@/components/DropDown.vue';
import PillInfoCard from '@/components/PillInfoCard.vue';
import SaveButton from '@/components/SaveButton.vue';
import DispenseButton from '@/components/DispenseButton.vue';
import DeleteButton from '@/models/VerboseDispenseLog';

export default {
  components: {

  },
  data() {
    return {
      dispenseLogs: null,
      page: 1,
      pageSize: 6
    }
  },
  mounted(){
    this.fetchDispenseLogs();
  },
  methods: {
    async fetchDispenseLogs(){
      try {
        this.dispenseLogs = await apiService.getDispenseLog();
      } catch (error) {
          console.error('Error dispense logs:', error);
          this.setBanner("error");
      }
    }
  }
}

</script>

<style scoped>
.headerContainer {
    margin-top: -3px;
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    height: 50px;
    margin-bottom: 25px;
}

</style>