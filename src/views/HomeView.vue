<template>
    <div class="pillInfoCardsContainer">
      <PillInfoCard v-for="(container, index) in containers" :key="index" :medication="container" @click="editPills(index)"></PillInfoCard>
      <PillInfoCard v-for="(container, index) in Array.from({length: 4-containers.length})" @click="editPills(-1)"></PillInfoCard>
    </div>
    <routerView></routerView>
</template>

<script>
import NotificationBanner from '../components/NotificationBanner.vue';
import PillInfoCard from '../components/PillInfoCard.vue';
import User from '../models/User';
import apiService from '../apiService';
import Medication from '@/models/Medication';

export default {
  components: {
    NotificationBanner,
    PillInfoCard,
},
  data() {
    return {
      myEntity: new User(),
      testMedication: new Medication(),
      containers: []
    }
  },
  mounted(){
    this.fetchUserData();
    this.testMedication.name = "ibprophen";
    this.updateContainers();
  },
  methods: {
    async fetchUserData() {
      try {
        var user = new User();
        this.myEntity = await apiService.getUser(user);
      } catch (error) {
        console.error('Error fetching entity data:', error);
      }
    },
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