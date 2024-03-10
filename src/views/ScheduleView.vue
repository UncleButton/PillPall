<template>    
    <div class="headerContainer">
        <h1 class="scheduleHeader">Schedule</h1>
    </div>

    <div class="flex-container">
        <TextField id="" 
            class="textField"
            label="Schedule Name"
            :value="schedule.name" 
            @input="schedule.name = $event; updateValue()" 
            placeholder="e.g. Britton's Alzheimer's Meds" 
            width="300px" 
            :maxlength='30'
        ></TextField>
        <TextField id="" 
            class="textField"
            label="PIN (optional)" 
            :value="schedule.pin == '' ? '' : schedule.pin" 
            @input="schedule.pin = $event; updateValue()" 
            placeholder="e.g. 1234" 
            width="100px" 
            :maxlength='6'
        ></TextField>
        <TextField id="" 
            class="textField"
            label="Reminder Email (optional)" 
            :value="schedule.notificationEmail" 
            @input="schedule.notificationEmail = $event; updateValue()" 
            placeholder="e.g. john.doe@gmail.com" 
            width="300px" 
            :maxlength='30'
        ></TextField>
    </div> 

    <div class="medsTimesContainer">
        <div class="addMedsContainer">
            <div v-if="containers.length == 0">No Medication added to machine yet!</div>
            <div v-for="(container, index) in containers.slice(0, 3)" :key="index" class="containersContainer">
                <div>{{ container.name }} Qty: {{ scheduleMeds.filter(med => med?.medicationId == container.id).length > 0 ? scheduleMeds.filter(med => med?.medicationId == container.id)[0].numPills : 0 }}</div>
            </div>
        </div>
        <div class="addMedsContainer">
            <div v-if="containers.length == 0">No Medication added to machine yet!</div>
            <div v-for="(container, index) in containers.slice(3)" :key="index" class="containersContainer">
                <div>{{ container.name }} Qty: {{ scheduleMeds.filter(med => med?.medicationId == container.id).length > 0 ? scheduleMeds.filter(med => med?.medicationId == container.id)[0].numPills : 0 }}</div>
            </div>
        </div>

        <div class="timesContainer">
            Times
            <div v-for="time in times" class="hourMinuteContainer">
                <p> Time: {{ time.dateTime.slice(0,2) == 'na' ? null : time.dateTime.slice(0,2) }}:</p>
                <p> {{ time.dateTime.slice(2) == 'na' ? null : time.dateTime.slice(2) }}</p>
            </div>
        </div>

        <div>
            <div v-for="day in $store.state.weekDays">
                <input type="checkbox" id="myCheckbox" :checked="schedule.days.includes(day)" @change="(event) => dayToggle(event, day)">
                <label> {{ day }} </label>
            </div>
        </div>
    </div>

    <div class="button" @click="updateSchedule()">Save Schedule</div>
    <div class="button" @click="deleteSchedule()">Delete Schedule</div>
    <div class="button" @click="dispense()">Dispense</div>

</template>

<script>

import Medication from '@/models/Medication';
import apiService from '@/apiService';
import TextField from '@/components/TextField.vue';
import Schedule from '@/models/Schedule';
import Time from '@/models/Time';
import ScheduleMed from '@/models/ScheduleMed';
import DropDown from '@/components/DropDown.vue';

export default {
  components: {
    TextField,
    DropDown,
    DropDown
},
  data() {
    return {
      schedule: new Schedule(),
      times: [new Time(), new Time(), new Time()],
      scheduleMeds: [],
      containers: this.$store.state.containers,
    }
  },
  mounted(){
    if(this.$store.getters.getScheduleIndex != -1) {
        this.schedule = this.$store.getters.getScheduleAtIndex;
        this.times = [...this.schedule.times];
        this.scheduleMeds = [...this.schedule.scheduleMeds];
        this.editingSchedule = true;
    }
    else
        this.goHome()
  },
  beforeRouteLeave(){
    this.$store.commit('setScheduleIndex', -1);
  },
  methods: {
    updateMedication(newValue) {
        this.medication = newValue;
    },
    async updateSchedule(){
        try {
            await apiService.updateSchedule(this.schedule).then(() => {
                this.goHome()
                this.setBanner("success", "Success!");
            });
        } catch (error) {
            console.error('Error fetching entity data:', error);
            this.setBanner("error", "Error: Something went wrong!  Please try again.");
        }
    },
    async deleteSchedule(){
        try {
            await apiService.deleteSchedule(this.schedule).then(() => {
                this.goHome()
                this.setBanner("success", "Success!");
            });
        } catch (error) {
            console.error('Error deleting entity data:', error);
            this.setBanner("error", "Error: Something went wrong!  Please try again.");
        }
    },
    async dispense(){
        try {
            await apiService.dispenseSchedule(this.schedule).then(() => {
                this.goHome()
                this.setBanner("success", "Success!");
            });
        } catch (error) {
            console.error('Error dispensing:', error);
            this.setBanner("error", "Error: Something went wrong!  Please try again.");
        }
    },
    dayToggle(event, day){
        const checked = event.target.checked;
        if(checked){
            this.schedule.days += day;
        } else {
            this.schedule.days = this.schedule.days.replace(day, "");
        }
    }
  }
}

</script>

<style scoped>

.headerContainer {
    margin-top: -3px;
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    height: 50px;
    margin-bottom: 25px;
}

.medsTimesContainer {
    width: 700px;
    height: 200px;
    margin-left: 50px;
    background-color: rgb(255,255,255, 0.2);
    display: flex;
}

.addMedsContainer {
    display: flex;
    flex-direction: column;
}

.timesContainer {
    margin-left: 50px;
    .hourMinuteContainer {
        display: flex; /* Use flexbox layout */
    }
}

.containersContainer {
    background-color: grey;
    width: 150px;
    height: 50px;
    margin: 5px;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: center; /* Center horizontally */
    font-size: 17px;
    overflow-wrap: break-word;
}

.flex-container {
    margin-left: 20px;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: space-evenly;
}

</style>