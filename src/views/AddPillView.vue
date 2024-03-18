<template>    
    <div class="headerContainer">
        <h1 class="newPillsHeader">Add New Pills</h1>
    </div>
    

    <div class="selectionBarFlexContainer">
        <div @click="infoStage = 0" class="selectorBar" :class="infoStage==0 ? 'selected' : 'unselected'">
            <h4 class="selectionBarText">Pill Info</h4>
        </div>
        <div @click="infoStage = 1" class="selectorBar" :class="infoStage==1 ? 'selected' : 'unselected'">
            <h4 class="selectionBarText">Pharmacy Info</h4>
        </div>
    </div>

    <div class="infoPages">
        <PillInfo v-if="infoStage==0" :medication='medication' @input="updateMedication"></PillInfo>
        <PharmacyInfo v-if="infoStage==1" :medication='medication' @input="updateMedication"></PharmacyInfo>
    </div>
    
    <div class="footerButtonsContainer">
        <SaveButton v-if="infoStage > 0" @click="infoStage > 0 ? infoStage-- : infoStage" text="Back"></SaveButton>
        <SaveButton v-else @click="goHome" text="Home"></SaveButton>
        <SaveButton v-if="infoStage < 1" @click="infoStage < 1 ? infoStage++ : infoStage" text="Next Page"></SaveButton>
        <SaveButton v-else @click="saveNewPills()" text="Save Medication"></SaveButton>
    </div>

</template>

<script>

import PillInfo from '../components/PillInfo.vue';
import PharmacyInfo from '../components/PharmacyInfo.vue';
import Medication from '../models/Medication';
import apiService from '../apiService';
import SaveButton from '../components/SaveButton.vue';

export default {
  components: {
    PillInfo,
    PharmacyInfo,
    SaveButton
  },
  data() {
    return {
      medication: new Medication(),
      infoStage: 0
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
    async saveNewPills(){
        try {
            await apiService.saveMedication(this.medication).then(() => {
                this.goHome();
                this.setBanner("success");
            });
        } catch (error) {
            console.error('Error fetching entity data:', error);
            this.setBanner("error");
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

.selectionBarFlexContainer {
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: space-evenly;
    padding: 10px;
    margin-top: 20px;
    background-color: #367EC3;
    height: 40px;
    margin-bottom: 5px;

    .selectorBar {
        margin-bottom: -15px;
        width: 325px;
        height: 6px;
        display: flex; /* Use flexbox layout */
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */

        .selectionBarText {
            color: white;
            font-size: 20px;
            padding-bottom: 30px;;
        }
    }
    .selected {
        background-color: #145fa5;
    }
    .unselected {
        background-color: rgb(155, 155, 155);
    }
}

.infoPages {
    margin-top: 10px;
    margin-left: 132px
}

</style>