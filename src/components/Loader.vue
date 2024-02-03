<template>
    <div :style="{ width: size, height: size }" class="loader">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loader',
    props: {
      size: {
        type: String,
        default: '40px' // Default size of the loader
      }
    }
  };
  </script>
  
  <style scoped>
  .loader {
    display: inline-block;
    position: relative;
    width: inherit;
    height: inherit;
  }
  
  .spinner {
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: inherit;
    height: inherit;
    animation: spin 2s linear infinite; /* Spin animation */
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  