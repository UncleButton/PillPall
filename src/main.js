import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'; // Import the Vuex store
import apiService from './apiService';

const app = createApp(App)

app.use(router)
app.use(store)

app.mixin({
    methods: {
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
        
        async challengePin(pin){
            console.log("challenging pin: " + pin);
            store.commit("challengePIN", pin);
        
            return new Promise((resolve, reject) => {
              const intervalId = setInterval(() => {
                let stillGoing = store.state.PINChallengeInProgress;
              if (!stillGoing) {
                setTimeout(() => { //delay for 100 ms so that things behind the popup are not clicked when enter is tapped
                  resolve();
                  store.state.PINDone = true;
                  clearInterval(intervalId);
                }, 100);
                //resolve(); // Resolve the promise when condition is met
              }
            }, 100); // Check every second
            });
        
        },  
    }
})

app.mount('#app')
