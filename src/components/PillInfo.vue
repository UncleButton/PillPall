<template>
    <div class="flex-container">
        <TextField id="" 
            class="textField"
            label="Pill Name"
            :value="medication.name" 
            @input="medication.name = $event; updateValue()" 
            placeholder="e.g. tylenol" 
            width="200px" 
            :maxlength='30'
        ></TextField>
        <TextField id="" 
            class="textField"
            label="Quantity (how many total pills?)" 
            :value="medication.numPills" 
            @input="medication.numPills = $event; updateValue()" 
            type="number" 
            placeholder="e.g. 100" 
            width="100px" 
            :maxlength='4'
        ></TextField>
    </div> 
    <TextField id="" 
        label="Medication Description" 
        :value="medication.description" 
        @input="medication.description = $event; updateValue()" 
        placeholder="e.g. pain medication" 
        width="500px" 
        :maxlength='150' 
        :isMultiline="true"
    ></TextField>
    <div class="flex-container">
        <TextField id="" 
            class="textField"
            label="Expiration Date (with slashes)" 
            :value="medication.expirationDate" 
            @input="medication.expirationDate = $event; updateValue()" 
            placeholder="mm/dd/yyyy" 
            width="150px" 
            :maxlength='10'
        ></TextField>
        <TextField id="" 
            class="textField"
            label="PIN (optional)" 
            :value="medication.pin" 
            @input="medication.pin = $event; updateValue()"
            placeholder="e.g. 1234" 
            width="150px" 
            :maxlength='6'
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
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */

  .textField {
    padding-right: 80px;
  }

}
</style>