<template>    
    <div class="headerContainer">
        <h1 class="newPillsHeader">Dispense Log</h1>
    </div>

    <table>
        <tr>
            <th>MM-DD-YYYY</th>
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
    
    <div v-if="dispenseLogs != null" class="footerButtonsContainer">
      <SaveButton @click="decPage" text="Previous Page" :class="page > 0 ? '' : 'disabled'"></SaveButton>
      <SaveButton @click="incPage" text="Next Page" :class="page < Math.floor(dispenseLogs.length/pageSize) ? '' : 'disabled'"></SaveButton>
    </div>

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
    SaveButton
  },
  data() {
    return {
      dispenseLogs: null,
      page: 0,
      pageSize: 7
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
    },
    decPage(){
      if(this.page > 0)
        this.page--;
    },
    incPage(){
      if(this.page < Math.floor(this.dispenseLogs.length/this.pageSize))
        this.page++;
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

table {
  width: 700px;
  margin-left: 50px;
  background-color: var(--translucent-blue);
  th {
    color: var(--primary-text-color);
    font-weight: bold;
  }
  td {
    color: var(--secondary-text-color);
    border: solid 1px black;
    padding: 3px;
    padding-left: 10px;
  }
}

.disabled {
  background-color: var(--disabled);
}

</style>