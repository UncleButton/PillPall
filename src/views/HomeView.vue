<template>
  <div class="masterContainer">
    <div class="pillInfoCardsContainer">
      <PillInfoCard v-for="(container, index) in containers" :key="index" :medication="container" @click="editPills(index)" :isLoading="isLoading"></PillInfoCard>
      <PillInfoCard v-for="(container, index) in Array.from({length: 6-containers.length})" @click="editPills(-1)" :isLoading="isLoading"></PillInfoCard>
    </div>

    <div class="footer">
      <div class="footerButtonsContainer">
        <div class="scheduleButton button">Schedules</div>
        <div class="dispenseButton button">Dispense</div>
      </div>
    </div>

    <routerView></routerView>
  </div>
</template>

<script>
import NotificationBanner from '../components/NotificationBanner.vue';
import PillInfoCard from '../components/PillInfoCard.vue';
import apiService from '../apiService';
import Medication from '@/models/Medication';
import ScheduleResponse from '@/models/ScheduleResponse';
import Loader from '../components/Loader.vue';

export default {
  components: {
    NotificationBanner,
    PillInfoCard,
    Loader,
},
  data() {
    return {
      containers: [],
      schedules: []
    }
  },
  computed: {
    isLoading() {
      return this.containers.length === 0 && this.schedules.length === 0;
    },
  },
  mounted(){
    this.updateContainers();
    this.fetchSchedules();
  },
  methods: {
    editPills(containerIndex){
      this.$store.commit('setContainerIndex', containerIndex);
      this.$router.push({name: 'add pill'});
    },
    async updateContainers(){
      try {
        this.containers = await apiService.getContainers();
        this.$store.commit('setAllContainers', this.containers);
      } catch (error) {
        console.error('Error fetching entity data:', error);
      }
    },
    async fetchSchedules(){
      try {
        this.schedules = await apiService.getSchedules();
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    }
  }
}

</script>

<style>

.masterContainer {
  height: 480px;
}

.pillInfoCardsContainer {
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */
  justify-content: space-evenly;
  padding: 10px;
  margin-top: 30px;
}


.footer {
  .footerButtonsContainer {
    position: absolute;
    bottom: -10px;
    left: 20px;
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */

    .button {
      width: 100px;
      height: 35px;
      border-radius: 20px;
      background-color: green;
      display: flex; /* Use flexbox layout */
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
      margin: 5px;
    }
  }
}

</style>