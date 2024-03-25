<template>
  <div v-if="isLoading" class="medication-card">
    <Loader size="100px"></Loader>
  </div>
  <div v-else-if="medication != null" class="medication-card">
    <div class="medication-name">{{ medication.name }}</div>
    <div class="reg-text">Pills left: {{ medication.numPills }}</div>
    <div v-if="!dispensable" class="reg-text"><div>Expiration:</div><div>{{ medication.expirationDate }}</div></div>
    <div v-if="dispensable && medication.maxPillsPerDose != null" class="reg-text">Dosage: {{ medication.maxPillsPerDose }}</div>
    <div v-if="dispensable" class="reg-text"><br><span class="reg-text pill-count">Dispense: {{ numToDispense }}</span></div>
    <div v-if="dispensable && editable" class="button-container">
      <div @click="decrementPills" class="button">-</div>
      <div @click="incrementPills" class="button">+</div>
    </div>
    <div v-if="editable && !dispensable" class="button-container">
      <div class="editText">(Click to edit)</div>
    </div>
  </div>
  <div v-else class="medication-card">
    <div>
      <img src="../assets/addIcon.png">
      <div class="reg-text">Add New Pills</div>
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
      default: false
    },
    dispensable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
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
  background-color: var(--translucent-blue);
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

.reg-text {
  font-size: 15px;  
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.pill-count {
  font-weight: bold;
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
  background-color: var(--secondary-blue);
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
</style>