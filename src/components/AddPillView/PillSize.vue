<template>
    <div class="flex-container">
      <h2>Please Select a Pill Size<span class="required">*</span></h2>
      <div class="instructionsBox">
        <div class="instructions">
          <h4>If single pill (in ALL orientations) fully fits inside the</h4>
          <h4>black circle, choose "Small". Otherwise, choose "Large".</h4>
        </div>
        <div class="pillSize"></div>
      </div>
      <div class="optionsContainer">
        <div class="selectionBox" :class="medication.isLarge == 0 ? 'sizeSelected' : ''" @click="medication.isLarge = 0; updateValue()">
          <p>Examples:</p>
          <div class="examplesContainer">
            <div class="pillSize"><div class="smallPill1 examplePill"></div></div>
            <div class="pillSize"><div class="smallPill2 examplePill"></div></div>
            <div class="pillSize"><div class="smallPill3 examplePill"></div></div>            
          </div>
          <h2>Small</h2>
        </div>
        <div class="selectionBox" :class="medication.isLarge == 1 ? 'sizeSelected' : ''" @click="medication.isLarge = 1; updateValue()">
          <p>Examples:</p>
          <div class="examplesContainer">
            <div class="pillSize"><div class="largePill1 examplePill"></div></div>
            <div class="pillSize"><div class="largePill2 examplePill"></div></div>
            <div class="pillSize"><div class="largePill3 examplePill"></div></div>     
          </div>
          <h2>Large</h2>
        </div>
      </div>
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

<style scoped>
.selectionBox {
  width: 150px;
  height: 150px;
  border-radius: 15px;
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */
  justify-content: center;
  background-color: var(--translucent-white);
  margin: 25px 25px;
  flex-direction: column;
}

.required {
    color: darkred;
    font-size: 28px;
  }

.optionsContainer {
  display: flex;
}

.flex-container {
  display: flex;
  flex-direction: column;
  width: 572px;
  height: 300px;
  margin-left: -112px
}

.instructionsBox {
  display: flex;
  justify-content:space-between;
  margin-top: 10px;
}

.instructions {
  width: 430px;
}

.pillSize {
  background-color: black;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex; /* Use flexbox layout */
  align-items: center; /* Align items vertically */
  justify-content: center;
  margin: 4px;

}

.examplesContainer{
  display: flex;
  margin-bottom: 20px;
}

.examplePill {
  background-color: transparent;
  border: white solid 1px;
}

.smallPill1 {
  border-radius: 25px;
  width: 32px;
  height: 32px;
}
.smallPill2 {
  border-radius: 3px;
  width: 20px;
  height: 25px;
}
.smallPill3 {
  border-radius: 25px;
  width: 15px;
  height: 28px;
}

.largePill1{
  border-radius: 50px;
  width: 50px;
  height: 50px;
}
.largePill2{
  border-radius: 5px;
  width: 28px;
  height: 44px;
}
.largePill3{
  border-radius: 25px;
  width: 25px;
  height: 50px;
}

.sizeSelected {
  border: 2px solid var(--primary-orange);
  background-color: rgba(255,255,255,0.3);
  color: black;
}

</style>