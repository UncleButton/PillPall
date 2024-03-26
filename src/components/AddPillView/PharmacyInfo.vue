<template>
    <div class="flex-container">
        <TextField  
            class="textField"
            label="Prescriber Name"
            :value="medication.prescriberName" 
            @input="medication.prescriberName = $event; updateValue()" 
            placeholder="e.g. Dr. Mahoney" 
            width="300px" :maxlength='30'
        ></TextField>
        <TextField  
            label="Pharmacy Phone Number"
            :value="medication.pharmacyPhone" 
            @input="medication.pharmacyPhone = $event; updateValue()" 
            placeholder="e.g. (440)759-1234"
            width="200px" :maxlength='50'
        ></TextField>
    </div>
    <h2>Pharmacy Address</h2>
    <TextField 
        class="flex-container" 
        label="Address line 1"
        :value="medication.pharmacyAddr1" 
        @input="medication.pharmacyAddr1 = $event; updateValue()" 
        placeholder="e.g. 1234 Main Street" 
        width="520px" :maxlength='50'
    ></TextField>
    <TextField  
        class="flex-container"
        label="Address line 2"
        :value="medication.pharmacyAddr2" 
        @input="medication.pharmacyAddr2 = $event; updateValue()" 
        placeholder="e.g. Apt #2" 
        width="520px" :maxlength='50'
    ></TextField>
    <div class="flex-container">
        <TextField  
            class="textField"
            label="City"
            :value="medication.pharmacyCity" 
            @input="medication.pharmacyCity = $event; updateValue()" 
            placeholder="e.g. Cleveland" 
            width="250px" :maxlength='30'
        ></TextField>
        <TextField  
            class="textField"
            label="State" 
            :value="medication.pharmacyState" 
            @input="medication.pharmacyState = $event; updateValue()" 
            type="number" 
            placeholder="e.g. OH" 
            width="100px" 
            :maxlength='50'
        ></TextField>
        <TextField  
            class="textField"
            label="Zip Code" 
            :value="medication.pharmacyZip" 
            @input="medication.pharmacyZip = $event; updateValue()" 
            type="number" 
            placeholder="e.g. 44035" 
            width="100px" 
            :maxlength='20'
        ></TextField>
    </div> 
    
</template>

<script>
import TextField from '@/components/TextField.vue';
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
    padding-right: 30px;
  }

}
</style>