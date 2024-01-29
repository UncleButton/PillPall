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
    <CustDropdown :items="users" displayProperty="name" :preSelectedItem="users.filter(user => user.id === medication.userId)[0]"  label="Patient" @select="handleUserSelect"></CustDropdown>
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
      users: []
    }
  },
  mounted(){
    this.fetchUsers();
  },
  methods: {
    updateValue() {
        this.$emit('input', this.medication);
    },
    async fetchUsers() {
      try {
        this.users = await apiService.getUsers();
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
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