<template>
  <div class="masterContainer">

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
        <div class="dispenseButton button">Dispense</div>
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
import Medication from '@/models/Medication';
import ScheduleBus from '@/models/ScheduleBus';
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
    margin-top: 75px;

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