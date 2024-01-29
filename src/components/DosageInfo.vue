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
    <p>Patient</p>
    <h2>INSERT DROPDOWN WITH USERS</h2>
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

</style>