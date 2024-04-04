<template>   
    <div class="translucentScreen"></div>
    <div class="dispensingMessage">Dispensing! Please wait...</div>
</template>

<script>

export default {
    data() {
      return {
        
      };
    },
    mounted() {
        
    },
    methods: {
      
    },
  };

</script>

<style scoped>

.translucentScreen {
    background-size: cover;
    background-position: center;
    height: 480px;
    width: 800px;
    position: fixed;
    z-index: 1;
    top: 0px;
    background-color: var(--slightly-translucent-white);
}
.dispensingMessage {
    background-color: white;
    height: 220px;
    width: 400px;
    position: fixed;
    z-index: 1;
    top: 100px;
    left: 200px;
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    color: black;
    border-radius: 20px;
    border: solid 1px gray;
    font-size: 30px;
}
</style>