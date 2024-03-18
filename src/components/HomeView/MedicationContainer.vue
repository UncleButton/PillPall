<template>
  <div class="pillInfoCardsContainer">
    <PillInfoCard v-for="(container, index) in containers" :key="index" :medication="container" @click="editPills(index)" :isLoading="isLoadingContainers" :editable="true"></PillInfoCard>
    <PillInfoCard v-for="(container, index) in Array.from({length: 6-containers.length})" @click="editPills(-1)" :isLoading="isLoadingContainers"></PillInfoCard>
  </div>
  <routerView></routerView>
</template>
  
<script>
import PillInfoCard from '@/components/PillInfoCard.vue';
import apiService from '@/apiService';
import Loader from '@/components/Loader.vue';
  
export default {
  components: {
    PillInfoCard,
    Loader,
},
  data() {
    return {
      containers: [],
      schedules: [],
      isLoadingContainers: true,
      isLoadingSchedules: true,
      medication: null
    }
  },
  computed: {
    storeContainers(){
      return this.$store.state.containers;
    },
    storeSchedules() {
      return this.$store.state.schedules;
    } 
  },
  mounted(){
      if(this.storeContainers.length > 0) {
        this.containers = this.storeContainers;
        this.isLoadingContainers = false;
      }
      if(this.storeSchedules.length > 0) {
        this.schedules = this.storeSchedules;
        this.isLoadingSchedules = false;
      }
  },
  watch: {
    storeContainers(newValue, oldValue){
      this.containers = newValue;
      this.isLoadingContainers = false;
    },
    storeSchedules(newValue, oldValue){
      this.schedules = newValue;
      this.isLoadingContainers = false;
    }
  },
  methods: {
    async editPills(containerIndex){
      this.$store.commit('setContainerIndex', containerIndex);
      if(containerIndex != -1){
        this.medication = this.$store.getters.getContainerAtIndex;
        if(this.medication.pin != "")
        {
          await this.challengePin(this.medication.pin);
          
          if(this.$store.state.PINApproved)
            this.goToAddPill()
        }
      } 
      this.goToAddPill()
    },
    async fetchSchedules(){
      try {
        this.schedules = await apiService.getSchedules();
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        this.setBanner("error");
      }
    }
  }
}
  
</script>
  
<style>
    
.pillInfoCardsContainer {
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */
  justify-content: space-evenly;
  padding: 10px;
  margin-top: 30px;
}
</style>