<template>    
    <div class="headerContainer">
        <h1 v-if="$store.getters.getContainerIndex == -1" class="newPillsHeader">Add New Pills</h1>
        <h1 v-else class="newPillsHeader">Edit Pills</h1>
    </div>
    
    
    <div class="selectionBarFlexContainer">
        <div @click="infoStage = 0" class="selectorBar" :class="infoStage==0 ? 'selected' : 'unselected'">
            <h4 class="selectionBarText">Pill Info</h4>
        </div>
        <div @click="infoStage = 1" class="selectorBar" :class="infoStage==1 ? 'selected' : 'unselected'">
            <h4 class="selectionBarText">Pharmacy Info</h4>
        </div>
        <div @click="infoStage = 2" class="selectorBar" :class="infoStage==2 ? 'selected' : 'unselected'">
            <h4 class="selectionBarText">Pill Size</h4>
        </div>
    </div>

    <div class="pillInfoContainer">
        <div class="infoPages">
            <PillInfo v-if="infoStage==0" :medication='medication' @input="updateMedication"></PillInfo>
            <PharmacyInfo v-if="infoStage==1" :medication='medication' @input="updateMedication"></PharmacyInfo>
            <PillSize v-if="infoStage==2" :medication='medication' @input="updateMedication"></PillSize>
        </div>
        
        <div class="footerButtonsContainer">
            <StandardButton v-if="infoStage > 0" @click="infoStage > 0 ? infoStage-- : infoStage" text="Back"></StandardButton>
            <StandardButton v-else @click="goHome" text="Home"></StandardButton>
            <StandardButton v-if="infoStage < 2" @click="infoStage < 2 ? infoStage++ : infoStage" text="Next Page"></StandardButton>
            <APICallButton v-else @click="saveNewPills()" text="Save Medication"></APICallButton>
            <DeleteButton v-if="$store.getters.getContainerIndex > -1" @click="deletePills" text="Delete Medication"></DeleteButton>
        </div>
    </div>

    <div class="refillContainer">
        <TextField  
            class="textField"
            label="Refill Quantity"
            :value="refillQty" 
            @input="refillQty = Math.max(0, $event)"
            type="number" 
            placeholder="e.g. 30" 
            width="100px" 
            :maxlength='3'
            :editable="$store.getters.getContainerIndex != -1"
        ></TextField> 
        <div class="refillButton" @click="refill" :class="$store.getters.getContainerIndex == -1 ? 'editable' : ''">Refill</div>
    </div>
    
    <div v-if="isBusy">
        <div class="translucentScreen"></div>
        <div class="refillingMessage">
            <p>Please wait...</p>
            ---------------------
            <p>When this message dissapears,</p>
            <p>you may insert medication</p>
            <p>into the "Fill" slot.</p>
        </div>
    </div>

    <div v-if="isDeleting">
        <div class="translucentScreen"></div>
        <div class="refillingMessage">
            <p>Please wait...</p>
            ---------------------
            <p>When this message dissapears,</p>
            <p>you manually remove your</p>
            <p>medication from the device.</p>
        </div>
    </div>
</template>

<script>

import PillInfo from '../components/AddPillView/PillInfo.vue';
import PharmacyInfo from '../components/AddPillView/PharmacyInfo.vue';
import Medication from '../models/Medication';
import apiService from '../apiService';
import APICallButton from '../components/Buttons/APICallButton.vue';
import TextField from '@/components/TextField.vue';
import StandardButton from '../components/Buttons/StandardButton.vue';
import PillSize from '@/components/AddPillView/PillSize.vue';
import DeleteButton from '@/components/Buttons/DeleteButton.vue';

export default {
  components: {
    PillInfo,
    PharmacyInfo,
    APICallButton,
    TextField,
    StandardButton,
    PillSize,
    DeleteButton
  },
  data() {
    return {
      medication: new Medication(),
      infoStage: 0,
      refillQty: null,
      isBusy: false,
      isDeleting: false
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
        this.isBusy = true;
        try {
            await apiService.saveMedication(this.medication).then(() => {
                this.isBusy = false;
                this.goHome();
                this.setBanner("success", "Success!  Please insert your medication into the \"Fill\" slot now.");
            });
        } catch (error) {
            this.isBusy = false;
            console.error('Error fetching entity data:', error);
            this.setBanner("error", "Error: Something went wrong! Please make sure you filled out all required fields.");
        }
    },
    async refill(){
        if(this.$store.getters.getContainerIndex == -1)
            return;

        this.isBusy = true;
        try {
            await apiService.refill(this.$store.getters.getContainerIndex, this.medication.id, this.refillQty).then(() => {
                this.isBusy = false;
                this.goHome();
                this.setBanner("success", "Success!  Please insert your medication into the \"Fill\" slot now.");
            });
        } catch (error) {
            this.isBusy = false;
            console.error('Error refilling:', error);
            this.setBanner("error");
        }
    },
    async deletePills(){
        this.isDeleting = true;
        try {
            await apiService.deleteMedication(this.medication).then(() => {
                this.isDeleting = false;
                this.goHome();
                this.setBanner("success", "Success!  Please manually remove your medication from the device.");
            });
        } catch (error) {
            this.isDeleting = false;
            console.error('Error deleting:', error);
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
    margin-top: -15px;
    background-color: var(--translucent-blue);
    height: 40px;
    margin-bottom: 15px;

    .selectorBar {
        margin-bottom: -15px;
        width: 245px;
        height: 6px;
        display: flex; /* Use flexbox layout */
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        border-radius: 5px;

        .selectionBarText {
            color: var(--primary-text-color);
            font-size: 20px;
            padding-bottom: 30px;;
        }
    }
    .selected {
        background-color: var(--secondary-blue);
    }
    .unselected {
        background-color: var(--disabled);
    }
}

.infoPages {
    margin-top: 5px;
    margin-left: 112px
}

.refillContainer {
    background-color: var(--mostly-translucent-blue);
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: center;
    flex-direction: column;
    position: absolute;
    right: 40px;
    bottom: 150px;
    padding: 10px;
    border-radius: 10px;
}

.refillButton{
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */
  justify-content: center;
  background-color: var(--primary-orange);
  width: 100px;
  height: 70px;
  border-radius: 10px;
  font-size: 20px;
  color: black;
}

.pillInfoContainer {
    background-color: var(--mostly-translucent-blue);
    border-radius: 15px;
    width: fit-content;
    display: flex; /* Use flexbox layout */
    align-items: center; /* Align items vertically */
    justify-content: center;
    margin-left: 30px;
}

.editable {
    background-color: var(--disabled);
}

.translucentScreen {
    background-size: cover;
    background-position: center;
    height: 480px;
    width: 800px;
    position: fixed;
    z-index: 1;
    top: 0px;
    background-color: var(--slightly-translucent-white);
}
.refillingMessage {
    background-color: white;
    height: 220px;
    width: 400px;
    position: fixed;
    z-index: 1;
    top: 100px;
    left: 200px;
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    flex-direction: column;
    color: black;
    border-radius: 20px;
    border: solid 1px gray;
    font-size: 25px;
}

</style>