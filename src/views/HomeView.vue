<template>
  
    <div class="testDiv">test1</div>
    <h3 class="testClass">THIS IS A TEST</h3>
    
</template>

<script>
import NotificationBanner from '../components/NotificationBanner.vue';
export default {
  components: {
    NotificationBanner
  }
}
</script>

<style>
#testClass {
  color: green;
}
.testDiv {
  background-color: aqua;
  width: 300px;
  height: 400px;
}
</style>