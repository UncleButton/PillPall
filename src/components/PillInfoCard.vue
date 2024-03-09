<template>
  <div v-if="medication != null" class="medication-card">
    <div class="medication-name">{{ medication.name }}</div>
    <div class="pill-count"><div>Pills left:</div><div>{{ medication.numPills }}</div></div>
    <div v-if="!dispensable" class="pill-count"><div>Expiration:</div><div>{{ medication.expirationDate }}</div></div>
    <div v-else class="pill-count">Dispense: {{ numToDispense }}</div>
    <div v-if="dispensable" class="button-container">
      <div @click="decrementPills" class="button">-</div>
      <div @click="incrementPills" class="button">+</div>
    </div>
    <div v-else class="button-container">
      <div class="editText">(Click to edit)</div>
    </div>
  </div>
  <div v-else class="medication-card">
    <div>
      <img src="../assets/addIcon.png">
      <div class="pill-count">Add New Pills</div>
    </div>
  </div>
</template>

<script>
import Medication from '@/models/Medication';
import Loader from './Loader.vue';

export default {
  components: {
    Loader
  },
  emits: [],
  props: {
    medication: {
      type: Medication,
      required: false
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    dispensable: {
      type: Boolean,
      required: false,
      default: false
    },
    numToDispense: {
      type: Number
    }
  },
  emits: ['decrement-pills', 'increment-pills'],
  data() {
    return {

    }
  },
  mounted(){
    
  },
  methods: {
    decrementPills() {
      this.$emit('decrement-pills', this.medication.id);
    },
    incrementPills() {
      this.$emit('increment-pills', this.medication.id);
    }
  }
}

</script>

<style scoped>
.medication-card {
  font-family:'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
  width: 125px;
  height: 200px;
  background-color: rgba(39, 86, 156, 0.61);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  line-height: 1.2;
}

.medication-name {
  font-size: 18px;
  font-weight: bold;
}

.pill-count {
  font-size: 15px;  
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.editText {
  font-size: 12px;
}

.button-container {
  display: flex;
}

.button {
  width: 50px;
  height: 50px;
  background-color: #154f5e9c;
  color: darkgray;
  border: none;
  border-radius: 50%;
  font-size: 28px;
  margin: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

button:hover {
  background-color: #0056b3;
}
</style>