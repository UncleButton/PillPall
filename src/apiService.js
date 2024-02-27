// apiService.js

import axios, { HttpStatusCode } from 'axios';
import User from '../src/models/User';
import Medication from '../src/models/Medication';
import ScheduleBus from './models/ScheduleBus';
import ScheduleMed from './models/ScheduleMed';
import Time from './models/Time';

const BASE_URL = 'http://localhost:5218';

const apiService = {
  // Example of a GET request
  async getContainers() {
    try {
      const response = await axios.get(BASE_URL+ '/PillInformation/getAllContainers');
      
      const containers = this.mapListResultToModels(response.data, Medication);
      
      return containers;
    } catch (error) {
        throw error;
    }
  },

  async saveMedication(medication) {
    try {
      const response = await axios.post(BASE_URL+ '/PillInformation/saveMedication', medication);
              
      if(response.status == HttpStatusCode.Ok)
        return;
      else 
        throw "Something went wrong!";
    } catch (error) {
        throw error;
    }
  },

  async getSchedules() {
    try {
      const response = await axios.get(BASE_URL+ '/Schedule/getSchedules');
      
      const schedules = this.mapListResultToModels(response.data, ScheduleBus);
      
      schedules.forEach(element => {
        const meds = [];
        element.scheduleMeds.forEach(scheduleMed => meds.push(this.mapSingleResultToModel(scheduleMed, ScheduleMed)));

        const times = [];
        element.times.forEach(time => times.push(this.mapSingleResultToModel(time, Time)));

        element.scheduleMeds = meds;
        element.times = times;
      })
      
      return schedules;
    } catch (error) {
        throw error;
    }
  },

  async saveSchedule(meds) {
    try {
      const response = await axios.post(BASE_URL+ '/Schedule/saveSchedule', meds);
              
      if(response.status == HttpStatusCode.Ok)
        return;
      else 
        throw "Something went wrong!";
    } catch (error) {
        throw error;
    }
  },

  async updateSchedule(schedule) {
    try {
      const response = await axios.post(BASE_URL+ '/Schedule/updateSchedule', schedule);
              
      if(response.status == HttpStatusCode.Ok)
        return;
      else 
        throw "Something went wrong!";
    } catch (error) {
        throw error;
    }
  },

  async deleteSchedule(schedule) {
    try {
      const response = await axios.post(BASE_URL+ '/Schedule/deleteSchedule', schedule);
              
      if(response.status == HttpStatusCode.Ok)
        return;
      else 
        throw "Something went wrong!";
    } catch (error) {
        throw error;
    }
  },

  async dispenseSchedule(schedule) {
    try {
      const response = await axios.post(BASE_URL+ '/Dispense/dispenseSchedule', schedule);
              
      if(response.status == HttpStatusCode.Ok)
        return;
      else 
        throw "Something went wrong!";
    } catch (error) {
        throw error;
    }
  },

  mapSingleResultToModel(result, ModelClass) {
    const modelInstance = new ModelClass();
    Object.assign(modelInstance, result);
    return modelInstance;
  },

  mapListResultToModels(results, ModelClass) {
    return results.map(result => this.mapSingleResultToModel(result, ModelClass));
  },

  // Add other API calls as needed
};

export default apiService;