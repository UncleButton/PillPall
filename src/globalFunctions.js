// globalFunctions.js

import User from '../src/models/User';
import Medication from '../src/models/Medication';
import ScheduleBus from './models/ScheduleBus';
import ScheduleMed from './models/ScheduleMed';
import Time from './models/Time';
import apiService from './apiService';
import store from './store';

const globalFunctions = {
  // Example of a GET request
  async updateContainers(){
    console.log("updating containers");
    try {
      const containers = await apiService.getContainers();
      store.commit('setAllContainers', containers);
    } catch (error) {
      console.error('Error fetching containers data:', error);
    }
  },

  async updateSchedules(){
    console.log("updating schedules");
    try {
      const schedules = await apiService.getSchedules();
      store.commit('setAllSchedules', schedules);
    } catch (error) {
      console.error('Error fetching schedules data:', error);
    }
  },

  

  // Add other API calls as needed
};

export default globalFunctions;