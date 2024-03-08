<template>    
    <div class="headerContainer">
        <h1 class="newPillsHeader">Add New Schedule</h1>
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
            :value="schedule.pin == -1 ? '' : schedule.pin" 
            @input="schedule.pin = $event; updateValue()" 
            type="number" 
            placeholder="e.g. 1234" 
            width="100px" 
            :maxlength='4'
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
                <div>{{ container.name }} Qty: {{ scheduleMeds.filter(med => med?.medication.id == container.id).length > 0 ? scheduleMeds.filter(med => med?.medication.id == container.id)[0].numPills : 0 }}</div>
                <div class="qtyButtonsContainer">
                    <div @click="incQty(container.id)">+</div>
                    <div @click="decQty(container.id)">-</div>
                </div>
            </div>
        </div>
        <div class="addMedsContainer">
            <div v-if="containers.length == 0">No Medication added to machine yet!</div>
            <div v-for="(container, index) in containers.slice(3)" :key="index" class="containersContainer">
                <div>{{ container.name }} Qty: {{ scheduleMeds.filter(med => med?.medication.id == container.id).length > 0 ? scheduleMeds.filter(med => med?.medication.id == container.id)[0].numPills : 0 }}</div>
                <div class="qtyButtonsContainer">
                    <div @click="incQty(container.id)">+</div>
                    <div @click="decQty(container.id)">-</div>
                </div>
            </div>
        </div>

        <div class="timesContainer">
            Times
            <div v-for="time in times" class="hourMinuteContainer">
                <DropDown :items="hours" label="Hour" @select="time.dateTime = $event + time.dateTime.slice(2)" :preSelectedItem="time.dateTime.slice(0,2) == 'na' ? null : time.dateTime.slice(0,2)"></DropDown>
                <DropDown :items="minutes" label="Minute" @select="time.dateTime = time.dateTime.slice(0,2) + $event" :preSelectedItem="time.dateTime.slice(2) == 'na' ? null : time.dateTime.slice(2)"></DropDown>
            </div>
        </div>

        <div>
            <div v-for="day in $store.state.weekDays">
                <input type="checkbox" id="myCheckbox" @change="(event) => dayToggle(event, day)">
                <label> {{ day }} </label>
            </div>
        </div>

    </div>

    <div class="saveSchedule" @click="saveSchedule()">Save Schedule</div>

</template>

<script>

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
      days: "",
      containers: this.$store.state.containers,
      infoStage: 0,
      hours: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
    }
  },
  mounted(){
        this.schedule.times = this.times;
  },
  beforeRouteLeave(){
    this.$store.commit('setScheduleIndex', -1);
  },
  methods: {
    updateMedication(newValue) {
        this.medication = newValue;
    },
    async saveSchedule(){
        this.schedule.times = this.schedule.times.filter(time => !time.dateTime.includes('na'));
        this.schedule.days = this.days;
        try {
            await apiService.saveSchedule(this.scheduleMeds).then(() => {
                this.$router.push({name: 'home'});
            });
        } catch (error) {
            console.error('Error fetching entity data:', error);
        }
    },
    incQty(id){
        if(this.scheduleMeds.filter(med => med?.medication.id == id).length == 0){//if not already in list
            console.log("inc");
            var newMed = new ScheduleMed();
            newMed.medication = this.containers.filter(container => container.id == id)[0];
            newMed.numPills = 1;
            newMed.schedule = this.schedule;
            this.scheduleMeds.push(newMed);
        }
        else //already in list, just inc it
        {
            this.scheduleMeds.filter(med => med.medication.id == id)[0].numPills++;
        }
    },
    decQty(id){
        if(this.scheduleMeds.filter(med => med?.medication.id == id).length > 0){//qty > 0
            var med = this.scheduleMeds.filter(med => med?.medication.id == id)[0];
            if(med.numPills > 0)
                med.numPills--;
        }
    },
    dayToggle(event, day){
        const checked = event.target.checked;
        if(checked){
            this.days += day;
        } else {
            this.days = this.days.replace(day, "");
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
    margin-right: 50px;
    .hourMinuteContainer {
        display: flex; /* Use flexbox layout */
    }
}

.containersContainer {
    background-color: grey;
    width: 150px;
    height: 50px;
    margin: 5px;

    .qtyButtonsContainer {
        display: flex; /* Use flexbox layout */
        align-items: center; /* Align items vertically */
        div {
            display: flex; /* Use flexbox layout */
            align-items: center; /* Align items vertically */
            justify-content: center; /* Center horizontally */
            background-color: green;
            width: 20px;
            height: 20px;
            font-weight: bold;
            font-size: 20px;
            margin-left: 10px;
        }
    }
}

.flex-container {
  margin-left: 20px;
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */
  justify-content: space-evenly;
}

</style>