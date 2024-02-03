<template>
    <div v-if="isLoading" class="cardContainer">
      <Loader size="100px"></Loader>
    </div>
    <div v-else-if="medication != null" class="cardContainer">
        <div >
            <h2>Name: {{ medication.name }}</h2>
        </div>
    </div>
    <div v-else class="cardContainer">
        <div>
            <img src="../assets/addIcon.png">
            <p>Add New Pills</p>
        </div>
    </div>
</template>

<script>
import TextField from '../components/TextField.vue';
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
      required: true
    }
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
    background-color: rgb(255,255,255,0.3);
    border-radius: 10px;
    margin: 3px;
}
</style>