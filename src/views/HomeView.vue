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
      <StandardButton @click="dispense()" text="One-Time Dispense"></StandardButton>
      <div class="nextDoseBar" v-if="!isLoadingSchedules && $store.getters.getNextSchedule != null">
        <div>Upcoming Dose: </div>
        <div v-if="!isLoadingSchedules">"{{ $store.getters.getNextSchedule?.name }}"</div>
        <Loader v-else size="30px"></Loader>

        <div>At: </div>
        <div v-if="!isLoadingSchedules">{{ $store.getters.getNextScheduleTime?.slice(0,2) }}:{{ $store.getters.getNextScheduleTime?.slice(2) }}</div>
        <Loader v-else size="30px"></Loader>

        <DispenseButton @click="dispenseNextSchedule" text="Dispense Now"></DispenseButton>
      </div>
      <div class="nextDoseBar" v-else>
        <div>No upcoming doses today.  You're all set!</div>
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
import DispenseButton from '@/components/Buttons/DispenseButton.vue';
import APICallButton from '@/components/Buttons/APICallButton.vue';
import StandardButton from '@/components/Buttons/StandardButton.vue';
import DispensingOverlay from '@/components/DispensingOverlay.vue';

export default {
  components: {
    NotificationBanner,
    PillInfoCard,
    Loader,
    MedicationContainer,
    SchedulesContainer,
    DispenseButton,
    APICallButton,
    StandardButton,
    DispensingOverlay
},
  data() {
    return {
      containers: [],
      schedules: [],
      isLoadingContainers: true,
      isLoadingSchedules: true,
      pageData: 0,
    }
  },
  computed: {
    watchPageData(){
      return this.pageData;
    }
  },
  watch: {
    watchPageData(newValue, oldValue){
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
    }
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
      this.$store.commit('setDispensing', true);
      var nextSchedule = this.$store.getters.getNextSchedule;
      if(nextSchedule.pin != "")
      {
        await this.challengePin(nextSchedule.pin);
                
        if(!this.$store.state.PINApproved)
          return;   
      }
      try {
        await apiService.dispenseSchedule(nextSchedule).then(() => {
          this.$store.commit('setDispensing', false);
          this.goHome()
          this.setBanner("success");
        });
      } catch (error) {
        this.$store.commit('setDispensing', false);
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
    background-color: var(--translucent-blue);
    height: 40px;
    margin-bottom: 5px;

    .selectorBar {
        margin-bottom: -15px;
        width: 325px;
        height: 6px;
        display: flex; /* Use flexbox layout */
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        border-radius: 5px;

        .selectionBarText {
            color: var(--primary-text-color);
            font-size: 20px;
            padding-bottom: 30px;;
        }
    }
    .selected {
        background-color: var(--secondary-blue);
    }
    .unselected {
        background-color: var(--disabled);
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
    border-radius: 5px;
    background-color: rgb(255,255,255,0.1);
    margin: 15px;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Center vertically */
    padding: 10px;
    justify-content: space-evenly;
}

.headerContainer {
  color: white;
}

</style>