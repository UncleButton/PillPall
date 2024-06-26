<template>
  <div v-if="isLoading" class="medication-card">
    <Loader size="100px"></Loader>
  </div>
  <div v-else-if="medication != null" class="medication-card">
    <div class="medication-name">{{ medication.name }}</div>
    <div :class="this.lowPills ? 'warning-text' : 'reg-text'">Pills left: {{ medication.numPills }}</div>
    <div v-if="!dispensable" class="reg-text"><div :class="this.nearExpiration ? 'warning-text' : 'reg-text'">Expiration:</div><div :class="this.nearExpiration ? 'warning-text' : 'reg-text'">{{ medication.expirationDate == "" ? 'Not Set' : medication.expirationDate }}</div></div>
    <div v-if="dispensable && medication.maxPillsPerDose != null" class="reg-text">Dosage: {{ medication.maxPillsPerDose }}</div>
    <div v-if="dispensable" class="reg-text"><br><span class="reg-text pill-count">Dispense: {{ numToDispense }}</span></div>
    <div v-if="dispensable && editable" class="button-container">
      <div @click="decrementPills" class="button">-</div>
      <div @click="incrementPills" class="button">+</div>
    </div>
    <div v-if="editable && !dispensable" class="button-container">
      <div class="editText">(Click to edit)</div>
    </div>
    <div v-if="this.lowPills || this.nearExpiration" class="warning-div">
      <img src="../assets//warningIcon.png" class="warning">
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
  computed: {
    lowPills(){
      return this.medication.numPills < 10;
    },
    nearExpiration(){
      if(this.medication.expirationDate == "")
        return false;

      var dateComponents = this.medication.expirationDate.split("/");
      if(dateComponents.length < 3)
        return false;

      try {
        var expDate = new Date(this.medication.expirationDate);     
        var currentdate = new Date();

        // Calculating the time difference
        // of two dates
        let Difference_In_Time =
          expDate.getTime() - currentdate.getTime();
        
        // Calculating the no. of days between
        // two dates
        let Difference_In_Days =
            Math.round
                (Difference_In_Time / (1000 * 3600 * 24));

        return Difference_In_Days <= 10;
      } catch (error) {
        return false;
      }

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

.warning-text {
  font-size: 15px;  
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  color: rgb(212, 146, 21);
  font-weight: bold;
}

.warning-div {
  position: absolute;
  margin-top: -22px;
  margin-left: 95px;
  width: 5px;
  height: 10px;
  background-color: transparent;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 28px solid rgb(212, 146, 21);
}

.warning {
  width: 33px;
  height: 33px;
  border-radius: 5px;
  margin-left: -16px;
  margin-top: -2px;
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