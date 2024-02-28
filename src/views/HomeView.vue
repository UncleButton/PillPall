<template>
  <div class="masterContainer">

    <div class="headerContainer">
        <h1 v-if="pageData == 1">Today, {{ $store.getters.getCurrentWeekDay }}</h1>
    </div>

    <div class="selectionBarFlexContainer">
        <div @click="pageData = 0" class="selectorBar" :class="pageData==0 ? 'selected' : 'unselected'">
            <h4 class="selectionBarText">Medications</h4>
        </div>
        <div @click="pageData = 1" class="selectorBar" :class="pageData==1 ? 'selected' : 'unselected'">
            <h4 class="selectionBarText">Schedules</h4>
        </div>
    </div>

    <MedicationContainer v-if="pageData == 0"></MedicationContainer>
    <SchedulesContainer v-if="pageData == 1"></SchedulesContainer>

    <div class="footer">
      <div class="footerButtonsContainer">
        <div class="dispenseButton button" @click="goToDispense()">Custom Dispense</div>
        <div class="nextDoseBar">Upcoming Dose: {{ $store.getters.getNextSchedule?.name }}</div>
      </div>
    </div>

    <routerView></routerView>
  </div>
</template>

<script>
import NotificationBanner from '@/components/NotificationBanner.vue';
import PillInfoCard from '@/components/PillInfoCard.vue';
import apiService from '@/apiService';
import globalFunctions from '@/globalFunctions';
import Loader from '@/components/Loader.vue';
import MedicationContainer from '@/components/HomeView/MedicationContainer.vue';
import SchedulesContainer from '@/components/HomeView/SchedulesContainer.vue';

export default {
  components: {
    NotificationBanner,
    PillInfoCard,
    Loader,
    MedicationContainer,
    SchedulesContainer
},
  data() {
    return {
      containers: [],
      schedules: [],
      isLoadingContainers: true,
      isLoadingSchedules: true,
      pageData: 0
    }
  },
  computed: {
    
  },
  mounted(){
    globalFunctions.updateContainers().then(() => 
    { 
      this.containers = this.$store.state.containers;
      this.isLoadingContainers = false;
    });
    globalFunctions.updateSchedules().then(() => 
    { 
      this.schedules = this.$store.state.schedules;
      this.isLoadingSchedules = false;
      this.$store.commit('setNextSchedule');
    });
    
  },
  methods: {
    editPills(containerIndex){
      this.$store.commit('setContainerIndex', containerIndex);
      this.$router.push({name: 'add pill'});
    },
    async fetchSchedules(){
      try {
        this.schedules = await apiService.getSchedules();
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    },
    goToDispense(){
      this.$router.push({name: 'dispense view'});
    }
  }
}

</script>

<style scoped>

.masterContainer {
  height: 480px;
}

.selectionBarFlexContainer {
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: space-evenly;
    padding: 10px;
    margin-top: 35px;

    .selectorBar {
        width: 325px;
        height: 6px;
        display: flex; /* Use flexbox layout */
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */

        .selectionBarText {
            color: white;
            font-size: 20px;
            padding-bottom: 30px;;
        }
    }
    .selected {
        background-color: #367EC3;
    }
    .unselected {
        background-color: rgb(155, 155, 155);
    }
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
      height: 45px;
      border-radius: 5px;
      background-color: green;
      display: flex; /* Use flexbox layout */
      justify-content: center; /* Center horizontally */
      align-items: center; /* Center vertically */
      margin: 5px;
    }
  }

  .nextDoseBar {
    width: 500px;
    height: 45px;
    border-radius: 5px;
    background-color: rgb(255,255,255,0.1);
    margin: 5px;
  }
}

</style>