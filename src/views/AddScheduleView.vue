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
    </div> 

    <div class="medsTimesContainer">
        <div class="addMedsContainer">
            <div v-if="containers.length == 0">No Medication added to machine yet!</div>
            <div v-for="(container, index) in containers.slice(0, 3)" :key="index" class="containersContainer">
                <div>{{ container.name }} Qty: {{ meds.filter(med => med.medId == container.id).length > 0 ? meds.filter(med => med.medId == container.id)[0].numPills : 0 }}</div>
                <div class="qtyButtonsContainer">
                    <div @click="incQty(container.id)">+</div>
                    <div @click="decQty(container.id)">-</div>
                </div>
            </div>
        </div>
        <div class="addMedsContainer">
            <div v-if="containers.length == 0">No Medication added to machine yet!</div>
            <div v-for="(container, index) in containers.slice(3)" :key="index" class="containersContainer">
                <div>{{ container.name }} Qty: {{ meds.filter(med => med.medId == container.id).length > 0 ? meds.filter(med => med.medId == container.id)[0].numPills : 0 }}</div>
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
    </div>

    <div class="saveSchedule" @click="saveSchedule()">Save Schedule</div>

</template>

<script>

import Medication from '@/models/Medication';
import apiService from '@/apiService';
import TextField from '@/components/TextField.vue';
import ScheduleBus from '@/models/ScheduleBus';
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
      meds: [],
      containers: this.$store.state.containers,
      infoStage: 0,
      hours: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
    }
  },
  mounted(){
    //if editing pills, get the current info to populate fields
    if(this.$store.getters.getContainerIndex != -1)
        this.medication = this.$store.getters.getContainerAtIndex;
  },
  methods: {
    updateMedication(newValue) {
        this.medication = newValue;
    },
    async saveSchedule(){
        try {
            var scheduleBus = new ScheduleBus();
            scheduleBus.name = this.schedule.name;
            scheduleBus.pin = this.schedule.pin;
            scheduleBus.times = this.times;
            scheduleBus.scheduleMeds = this.meds;

            await apiService.saveSchedule(scheduleBus).then(() => {
                this.$router.push({name: 'home'});
            });
        } catch (error) {
            console.error('Error fetching entity data:', error);
        }
    },
    incQty(id){
        if(this.meds.filter(med => med.medId == id).length == 0){//if not already in list
            var newMed = new ScheduleMed();
            newMed.medId = id;
            newMed.numPills = 1;
            this.meds.push(newMed);
        }
        else //already in list, just inc it
        {
            this.meds.filter(med => med.medId == id)[0].numPills++;
        }
    },
    decQty(id){
        if(this.meds.filter(med => med.medId == id).length > 0){//qty > 0
            var med = this.meds.filter(med => med.medId == id)[0];
            if(med.numPills > 0)
                med.numPills--;
        }
    }
  }
}

</script>

<style>

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
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */

  .textField {
    padding-right: 80px;
  }

}

</style>