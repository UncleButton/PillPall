<template>
    <div class="masterContainer">
      <div class="pillInfoCardsContainer">
        <PillInfoCard v-for="(container, index) in containers" :key="index" :medication="container" @click="editPills(index)" :isLoading="isLoadingContainers"></PillInfoCard>
        <PillInfoCard v-for="(container, index) in Array.from({length: 6-containers.length})" @click="editPills(-1)" :isLoading="isLoadingContainers"></PillInfoCard>
      </div>
      <routerView></routerView>
    </div>
  </template>
  
  <script>
  import PillInfoCard from '@/components/PillInfoCard.vue';
  import apiService from '@/apiService';
  import globalFunctions from '@/globalFunctions';
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
      editPills(containerIndex){
        this.$store.commit('setContainerIndex', containerIndex);
        this.$router.push({name: 'add pill'});
      },
      goToSchedule() {
        this.$router.push({name: 'schedules'});
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
  
  </style>