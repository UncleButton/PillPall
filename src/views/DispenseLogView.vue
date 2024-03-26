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
        <tr v-if="dispenseLogs != null" v-for="(log, index) in dispenseLogs.slice(page*pageSize, page*pageSize + pageSize)" :key="index" class="row">
          <td>{{ log.getDate() }}</td>
          <td>{{ log.getTime() }}</td>
          <td>{{ log.medName }}</td>
          <td>{{ log.numPills }}</td>
          <td>{{ log.scheduleName }}</td>
        </tr>
    </table>
    
    <div v-if="dispenseLogs != null" class="footerButtonsContainer">
      <StandardButton @click="decPage" text="Previous Page" :class="page > 0 ? '' : 'disabled'"></StandardButton>
      <StandardButton @click="incPage" text="Next Page" :class="page < Math.floor(dispenseLogs.length/pageSize) ? '' : 'disabled'"></StandardButton>
    </div>

</template>

<script>

import apiService from '@/apiService';
import APICallButton from '@/components/APICallButton.vue';
import StandardButton from '@/components/StandardButton.vue';

export default {
  components: {
    APICallButton,
    StandardButton
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