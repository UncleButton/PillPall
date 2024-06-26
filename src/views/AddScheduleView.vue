<template>    
    <div class="headerContainer">
        <h1 class="newPillsHeader">Add New Schedule</h1>
    </div>

    <div class="flex-c top-bar-info">
        <TextField  
            class="textField"
            label="Schedule Name"
            :value="schedule.name" 
            @input="schedule.name = $event; updateValue()" 
            placeholder="e.g. Britton's Alzheimer's Meds" 
            width="300px" 
            :maxlength='30'
            :required="true"
        ></TextField>
        <TextField  
            class="textField"
            label="PIN" 
            :value="schedule.pin == '' ? '' : schedule.pin" 
            @input="schedule.pin = $event; updateValue()" 
            placeholder="e.g. 123abc" 
            width="100px" 
            :maxlength='6'
            tooltip="(Max length: 6) If set, PIN will be required any time this schedule is accessed. Any characters are allowed."
        ></TextField>
        <TextField  
            class="textField"
            label="Reminder Email" 
            :value="schedule.notificationEmail" 
            @input="schedule.notificationEmail = $event; updateValue()" 
            placeholder="e.g. john.doe@gmail.com" 
            width="300px" 
            :maxlength='30'
            tooltip="If set, reminders will be sent to this email address 30 minutes before the set dose times."
        ></TextField>
    </div> 
    <div class="timesContainer">
        <div><span>Times</span><span class="required">*</span></div>
        <div v-for="time in times" class="hourMinuteContainer">
            <DropDown :items="hours" label="" @select="time.dateTime = $event + time.dateTime.slice(2)" :preSelectedItem="time.dateTime.slice(0,2) == 'na' ? null : time.dateTime.slice(0,2)"></DropDown>
            <div>:</div>
            <DropDown :items="minutes" label="" @select="time.dateTime = time.dateTime.slice(0,2) + $event" :preSelectedItem="time.dateTime.slice(2) == 'na' ? null : time.dateTime.slice(2)"></DropDown>
        </div>
    </div>

    <div class="medsTimesContainer">
        <div class="addMedsContainer">
            <div v-if="containers.length == 0">No Medication added to machine yet!</div>
            <div v-for="(container, index) in containers" :key="index" class="containersContainer">
                <PillInfoCard 
                    :medication="container" 
                    :dispensable="true" 
                    :editable="true"
                    :numToDispense="scheduleMeds.filter(med => med?.medication.id == container.id).length > 0 ? scheduleMeds.filter(med => med?.medication.id == container.id)[0].numPills : 0" 
                    @decrement-pills="decQty" 
                    @increment-pills="incQty">
                </PillInfoCard>
            </div>
        </div>
    </div>

    <div class="timesContainer">
        <div v-for="day in $store.state.weekDays">
            <input type="checkbox" @change="(event) => dayToggle(event, day)" :checked="day == $store.getters.getCurrentWeekDay">
            <label> {{ day }} </label>
        </div>
    </div>    

    <div class="footerButtonsContainer">
        <APICallButton @click="saveSchedule()" text="Save Schedule"></APICallButton>
    </div>

</template>

<script>

import apiService from '@/apiService';
import TextField from '@/components/TextField.vue';
import Schedule from '@/models/Schedule';
import Time from '@/models/Time';
import ScheduleMed from '@/models/ScheduleMed';
import DropDown from '@/components/DropDown.vue';
import PillInfoCard from '@/components/PillInfoCard.vue';
import APICallButton from '@/components/Buttons/APICallButton.vue';

export default {
  components: {
    TextField,
    DropDown,
    PillInfoCard,
    APICallButton
},
  data() {
    return {
      schedule: new Schedule(),
      times: [new Time(), new Time(), new Time()],
      scheduleMeds: [],
      days: "",
      containers: this.$store.state.containers,
      infoStage: 0,
      hours: ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
      minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
    }
  },
  mounted(){
    this.schedule.times = this.times;
    this.days = this.$store.getters.getCurrentWeekDay;
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
                this.goHome();
                this.setBanner("success");
            });
        } catch (error) {
            console.error('Error fetching entity data:', error);
            this.setBanner("error");
        }
    },
    async incQty(id){
        if(this.scheduleMeds.filter(med => med?.medication.id == id).length == 0){//if not already in list
            var newMed = new ScheduleMed();
            newMed.medication = this.containers.filter(container => container.id == id)[0];
            newMed.numPills = 1;
            newMed.schedule = this.schedule;

            if(newMed.medication.pin != "")
            {
                await this.challengePin(newMed.medication.pin);
                
                if(this.$store.state.PINApproved)
                    this.scheduleMeds.push(newMed);   

                return;
            }
            this.scheduleMeds.push(newMed);   
        }
        else //already in list, just inc it
        {
            //dont allow them to try dispensing more than pills left
            if(this.containers.filter(container => container.id == id)[0].numPills > this.scheduleMeds.filter(med => med.medication.id == id)[0].numPills)
                this.scheduleMeds.filter(med => med.medication.id == id)[0].numPills++;

            if(this.containers.filter(container => container.id == id)[0].maxPillsPerDose != null && this.scheduleMeds.filter(med => med?.medication.id == id)[0].numPills > this.containers.filter(container => container.id == id)[0].maxPillsPerDose){
                this.setBanner("warning", "Warning: You're trying to dispense more pills than the recommended dose!");
            }
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
            if(this.days == "") {
                this.setBanner("warning", "Warning: Schedules must have at least 1 day selected");
            } 
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

.required {
    color: darkred;
}

.top-bar-info {
    margin-top: -25px;
    margin-bottom: 5px;
}

.medsTimesContainer {
    width: 760px;
    height: 220px;
    margin-left: 20px;
    background-color: var(--translucent-white);
    display: flex;
    margin-bottom: 8px;
}

.addMedsContainer {
    width: 800px;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: space-evenly;
}

.timesContainer {
    margin-left: 20px;
    margin-right: 150px;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: space-between;
    margin-bottom: 5px;

    div {
        margin-left: 3px;
        margin-right: 3px;
        color: black;
        font-size: 18px;
    }
}

.hourMinuteContainer {
       
       display: flex; /* Use flexbox layout */
       align-items: center; /* Align items vertically */
   }

.flex-c {
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */
  justify-content: space-evenly;
  margin-left: 20px;
}

</style>