<template>
    <div class="flex-container">
        <TextField  
            class="textField"
            label="Pill Name"
            :value="medication.name" 
            @input="medication.name = $event; updateValue()" 
            placeholder="e.g. tylenol" 
            width="200px" 
            :maxlength='30'
            :required="true"
        ></TextField>
        <TextField
             
            class="textField"
            label="Quantity" 
            :value="medication.numPills" 
            @input="medication.numPills = $event; updateValue()" 
            type="number" 
            placeholder="e.g. 100" 
            width="100px" 
            :maxlength='4'
            :required="true"
            tooltip="How many total pills?"
            :editable="$store.getters.getContainerIndex == -1"
        ></TextField>
        <TextField  
            class="textField"
            label="PIN" 
            :value="medication.pin" 
            @input="medication.pin = $event; updateValue()"
            placeholder="e.g. 123abc" 
            width="150px" 
            :maxlength='6'
            tooltip="(Max length: 6) If set, PIN will be required any time these pills are accessed. Any characters are allowed."
        ></TextField>
    </div> 
    <TextField  
        class="flex-container"
        label="Medication Description" 
        :value="medication.description" 
        @input="medication.description = $event; updateValue()" 
        placeholder="e.g. pain medication" 
        width="500px" 
        :maxlength='150' 
        :isMultiline="true"
    ></TextField>
    <div class="flex-container">
        <TextField  
            class="textField"
            label="Expiration Date" 
            :value="medication.expirationDate" 
            @input="medication.expirationDate = $event; updateValue()" 
            placeholder="mm/dd/yyyy" 
            width="150px" 
            :maxlength='10'
            tooltip="Enter in form 'mm/dd/yyyy'. (Include slashes)"
        ></TextField>
        <TextField  
          class="textField"
          label="Pills Per Dose"
          :value="medication.maxPillsPerDose" 
          @input="medication.maxPillsPerDose = $event; updateValue()"
          type="number" 
          placeholder="e.g. 3" 
          width="100px" 
          :maxlength='3'
        ></TextField>
        <TextField  
          class="textField"
          label="Doses Per Day"
          :value="medication.maxDosesPerDay" 
          @input="medication.maxDosesPerDay = $event; updateValue()"
          type="number" 
          placeholder="e.g. 3" 
          width="100px" 
          :maxlength='2'
        ></TextField> 
    </div>
</template>

<script>
import TextField from '../components/TextField.vue';
import Medication from '@/models/Medication';

export default {
  components: {
    TextField
  },
  emits: ['input'],
  props: {
    medication: {
      type: Medication,
      required: true
    },
  },
  data() {
    return {

    }
  },
  mounted(){
    
  },
  methods: {
    updateValue() {
        this.$emit('input', this.medication);
    }
  }
}

</script>

<style>
#pillName {
    width: 200px;
}
.flex-container {
  margin-left: -80px;
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */

  .textField {
    padding-right: 70px;
  }
}
</style>