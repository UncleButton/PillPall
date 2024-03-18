<template>
    <TextField id="" 
        label="Pills Per Dose"
        :value="medication.maxPillsPerDose" 
        @input="medication.maxPillsPerDose = $event; updateValue()"
        type="number" 
        placeholder="e.g. 3" 
        width="100px" :maxlength='3'
    ></TextField>
    <TextField id="" 
        label="Doses Per Day"
        :value="medication.maxDosesPerDay" 
        @input="medication.maxDosesPerDay = $event; updateValue()"
        type="number" 
        placeholder="e.g. 3" 
        width="100px" :maxlength='2'
    ></TextField> 
</template>

<script>
import TextField from '../components/TextField.vue';
import Medication from '@/models/Medication';
import apiService from '../apiService';
import CustDropdown from '../components/DropDown.vue';

export default {
  components: {
    TextField,
    CustDropdown
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
    },
    handleUserSelect(user) {
      this.medication.userId = user.id;
    }
  }
}

</script>

<style>
#pillName {
    width: 200px;
}

</style>