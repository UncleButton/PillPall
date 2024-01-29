<template>
    <div v-if="medication != null" class="cardContainer">
        <div >
            <h2>Name: {{ medication.name }}</h2>
        </div>
    </div>
    <div v-else class="cardContainer">
        <div>
            <img src="../assets/addIcon.png">
        </div>
    </div>
</template>

<script>
import TextField from '../components/TextField.vue';
import Medication from '@/models/Medication';

export default {
  components: {
    
  },
  emits: [],
  props: {
    medication: {
      type: Medication,
      required: false
    },
  },
  data() {
    return {

    }
  },
  mounted(){
    
  },
  methods: {
    
  }
}

</script>

<style>
.cardContainer {
    width: 150px;
    height: 200px;
    background-color: rgb(255,255,255,0.2);
    border-radius: 10px;;
}
</style>