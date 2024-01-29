// apiService.js

import axios, { HttpStatusCode } from 'axios';
import User from '../src/models/User';
import Medication from '../src/models/Medication';

const BASE_URL = 'http://localhost:5218';

const apiService = {
  // Example of a GET request
  async getUser(userToGet) {
    try {
        const response = await axios.post(BASE_URL+ '/User/getUser', userToGet);
        
        const user = this.mapSingleResultToModel(response.data, User);
        
        return user;
    } catch (error) {
        throw error;
    }
  },

  async getUsers() {
    try {
        const response = await axios.post(BASE_URL+ '/User/getUsers');
        
        const users = this.mapListResultToModels(response.data, User);
        
        return users;
    } catch (error) {
        throw error;
    }
  },

  async newUser(newUser) {
    try {
        const response = await axios.post(BASE_URL+ '/User/newUser', newUser);
                
        if(response.status == HttpStatusCode.Ok)
          return;
        else 
          throw "Something went wrong!";
    } catch (error) {
        throw error;
    }
  },

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
      const response = await axios.post(BASE_URL+ '/PillInformation/newMedication', medication);
              
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