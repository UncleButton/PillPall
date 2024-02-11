<template>
    <label>{{ label }}</label>
    <div class="custom-dropdown" @click="toggleDropdown" @blur="collapseDropdown()">
      <div class="selected-item">{{ selectedItem == '' ? '^' : selectedItem }}</div>
      <div v-if="isOpen" class="dropdown-menu">
        <div v-for="(item, index) in items" :key="index" @click="selectItem(item)" class="items">
          {{ item }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { stringifyQuery } from 'vue-router';

  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      preSelectedItem: {
        type: String,
        default: null
      },
      label: {
        type: String,
        required: true
      },
    },
    emits: ['select'],
    data() {
      return {
        isOpen: false
      };
    },
    computed: {
        selectedItem() {
            if(this.preSelectedItem != null) 
                return this.preSelectedItem;
            else 
                return '';
        }
    },
    mounted() {
        
        
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      collapseDropdown() {
        this.isOpen = false;
      },
      selectItem(item) {
        this.$emit('select', item);
      }
    }
  };
  </script>
  
  <style scoped>
  .custom-dropdown {
    position: relative;
    cursor: pointer;
  }

  label {
    display: block;
    margin-bottom: 2px;
    color: white;
  }
  
  .dropdown-menu {
    position: absolute;
    top: -80px;
    left: 0;
    z-index: 1000;
    background-color: #fff;
    border: 1px solid #ccc;
    color: black;
  }
  
  .selected-item {
    padding: 6px;
    padding-left: 10px;
    padding-right: 30px;
    border: 1px solid #ccc;
    background-color: white;
    border-radius: 20px;
    font-size: 16px;
    box-sizing: border-box;
    resize: vertical;
    width: fit-content;
    color: black;
  }
  
  .items {
    height: 20px;
    margin-top: -2px;
    padding-bottom: 5px;
    display: flex; /* Use flexbox layout */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
  }

  .dropdown-menu div {
    padding: 10px;
    cursor: pointer;
  }
  
  .dropdown-menu div:hover {
    background-color: #f0f0f0;
  }
  </style>
  