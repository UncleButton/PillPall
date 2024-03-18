<template>    
    <div class="headerContainer">
        <h1 class="newPillsHeader">One-Time Dispense</h1>
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

    <div class="footerButtonsContainer">
        <DispenseButton @click="dispense()" text="Dispense Now"></DispenseButton>
    </div>

</template>

<script>

import apiService from '@/apiService';
import TextField from '@/components/TextField.vue';
import Schedule from '@/models/Schedule';
import ScheduleMed from '@/models/ScheduleMed';
import DropDown from '@/components/DropDown.vue';
import PillInfoCard from '@/components/PillInfoCard.vue';
import DispenseButton from '@/components/DispenseButton.vue';

export default {
  components: {
    TextField,
    DropDown,
    DropDown,
    PillInfoCard,
    DispenseButton
},
  data() {
    return {
      schedule: new Schedule(),
      scheduleMeds: [],
      containers: this.$store.state.containers,
      infoStage: 0,
      hours: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
      minutes: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'],
    }
  },
  mounted(){
    
  },
  methods: {
    updateMedication(newValue) {
        this.medication = newValue;
    },
    async dispense(){
        try {
            await apiService.dispenseCustom(this.scheduleMeds).then(() => {
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
        }
    },
    decQty(id){
        if(this.scheduleMeds.filter(med => med?.medication.id == id).length > 0){//qty > 0
            var med = this.scheduleMeds.filter(med => med?.medication.id == id)[0];
            if(med.numPills > 0)
                med.numPills--;
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
    width: 760px;
    height: 220px;
    margin-left: 20px;
    background-color: rgb(255,255,255, 0.2);
    display: flex;
}

.addMedsContainer {
    width: 100%;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: space-evenly;
}

.timesContainer {
    margin-left: 50px;
    .hourMinuteContainer {
        display: flex; /* Use flexbox layout */
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