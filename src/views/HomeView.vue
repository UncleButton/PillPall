<template>
  <div class="masterContainer">

    <div class="headerContainer">
        <h1 v-if="pageData == 1">{{ $store.getters.getCurrentWeekDay }}, {{ $store.getters.getCurrentMonth }} {{ $store.getters.getCurrentMonthDay }}</h1>
        <h1 v-else>PillPal Home</h1>
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

    
    <div class="footerButtonsContainer">
      <SaveButton @click="dispense()" text="Custom Dispense"></SaveButton>
      <div v-if="$store.getters.getNextSchedule != null" class="nextDoseBar">
        <div>Upcoming Dose: ''{{ $store.getters.getNextSchedule?.name }}''</div>
        <div>At: {{ $store.getters.getNextScheduleTime?.slice(0,2) }}:{{ $store.getters.getNextScheduleTime?.slice(2) }}</div>
        <DispenseButton @click="dispenseNextSchedule" text="Dispense Now"></DispenseButton>
      </div>
    </div>

    <routerView></routerView>
  </div>
</template>

<script>
import NotificationBanner from '@/components/NotificationBanner.vue';
import PillInfoCard from '@/components/PillInfoCard.vue';
import apiService from '@/apiService';
import Loader from '@/components/Loader.vue';
import MedicationContainer from '@/components/HomeView/MedicationContainer.vue';
import SchedulesContainer from '@/components/HomeView/SchedulesContainer.vue';
import DispenseButton from '@/components/DispenseButton.vue';
import SaveButton from '@/components/SaveButton.vue';

export default {
  components: {
    NotificationBanner,
    PillInfoCard,
    Loader,
    MedicationContainer,
    SchedulesContainer,
    DispenseButton,
    SaveButton
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
    this.updateContainers().then(() => 
    { 
      this.containers = this.$store.state.containers;
      this.isLoadingContainers = false;
    });
    this.updateSchedules().then(() => 
    { 
      this.schedules = this.$store.state.schedules;
      this.isLoadingSchedules = false;
      this.$store.commit('setNextSchedule');
    });
    
  },
  methods: {
    editPills(containerIndex){
      this.$store.commit('setContainerIndex', containerIndex);
      this.goToAddPill()
    },
    async fetchSchedules(){
      try {
        this.schedules = await apiService.getSchedules();
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        this.setBanner("error");
      }
    },
    dispense(){
      this.goToDispenseView()
    },
    async dispenseNextSchedule(){
      var nextSchedule = this.$store.getters.getNextSchedule;
      if(nextSchedule.pin != "")
      {
        await this.challengePin(nextSchedule.pin);
                
        if(!this.$store.state.PINApproved)
          return;   
      }
      try {
        await apiService.dispenseSchedule(nextSchedule).then(() => {
          this.goHome()
          this.setBanner("success");
        });
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        this.setBanner("error");
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
    margin-top: 20px;
    background-color: #367EC3;
    height: 40px;
    margin-bottom: 5px;

    .selectorBar {
        margin-bottom: -15px;
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
        background-color: #145fa5;
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

.nextDoseBar {
    width: 500px;
    height: 45px;
    border-radius: 10px;
    background-color: rgb(255,255,255,0.1);
    margin: 15px;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Center vertically */
    padding: 10px;
    justify-content: space-evenly;
}

</style>