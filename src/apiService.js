// apiService.js

import axios, { HttpStatusCode } from 'axios';
import Medication from '../src/models/Medication';
import ScheduleMed from './models/ScheduleMed';
import Time from './models/Time';
import Schedule from './models/Schedule';
import VerboseDispenseLog from './models/VerboseDispenseLog';
import RefillObject from './models/RefillObject';

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
    } catch (error) {
        throw error;
    }
  },

  async getSchedules() {
    try {
      const response = await axios.get(BASE_URL+ '/Schedule/getSchedules');
      
      const schedules = this.mapListResultToModels(response.data, Schedule);
      
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
    } catch (error) {
        throw error;
    }
  },

  async updateSchedule(schedule) {
    try {
      const response = await axios.post(BASE_URL+ '/Schedule/updateSchedule', schedule);
    } catch (error) {
        throw error;
    }
  },

  async deleteSchedule(schedule) {
    try {
      const response = await axios.post(BASE_URL+ '/Schedule/deleteSchedule', schedule);
    } catch (error) {
        throw error;
    }
  },

  async dispenseSchedule(schedule) {
    try {
      const response = await axios.post(BASE_URL+ '/Dispense/dispenseSchedule', schedule);
    } catch (error) {
        throw error;
    }
  },

  async dispenseCustom(scheduleMeds) {
    try {
      const response = await axios.post(BASE_URL+ '/Dispense/dispenseCustom', scheduleMeds);
    } catch (error) {
        throw error;
    }
  },

  async sendReminder(schedule) {
    try {
      const response = await axios.post(BASE_URL+ '/Reminder/remindSchedule', schedule);
    } catch (error) {
        throw error;
    }
  },

  async getDispenseLog() {
    try {
      const response = await axios.get(BASE_URL+ '/Dispense/getDispenseLogs');
      
      const dispenseLogs = this.mapListResultToModels(response.data, VerboseDispenseLog);
      
      return dispenseLogs;
    } catch (error) {
        throw error;
    }
  },

  async refill(containerId, medication, qty) {
    try {
      const refill = new RefillObject();
      refill.containerId = containerId;
      refill.medication = medication;
      refill.qty = qty;

      const response = await axios.post(BASE_URL+ '/PillInformation/refill', refill);
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
};

export default apiService;