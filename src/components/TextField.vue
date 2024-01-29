<template>
    <div class="custom-text-field">
        <label :for="id">{{ label }}</label>
        <textarea v-if="isMultiline" :id="id" :value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" :style='{ width }'></textarea>
        <input v-else :type="type" :id="id" :value="value" @input="updateValue($event.target.value)" :maxlength="maxlength" :placeholder="placeholder" :style='{ width }'/>
        <span class="error-message" v-if="error">{{ error }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: [String, Number],
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      width: {
        type: String,
        defualt: '300px'
      },
      maxlength: {
        type: Number,
        default: 500
      },
        placeholder: {
        type: String,
        default: ''
      },
        isMultiline: {
        type: Boolean,
        default: false
      },
      error: String
    },
    emits: ['input'],
    methods: {
        updateValue(newValue) {
            // Emit an 'input' event to update the parent component's data
            this.$emit('input', newValue);
        }
  }
  };
  </script>
  
  <style scoped>
  .custom-text-field {
    margin-bottom: 5px;
  }
  
  label {
    display: block;
    margin-bottom: 2px;
    color: white;
  }
  
  textarea,
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 16px;
    box-sizing: border-box;
    resize: vertical;
  }

  textarea {
    height: 100px;
  }

  textarea::placeholder {
    color: #bebebe; /* Lighter color for placeholder text */
  }

  input::placeholder {
    color: #bebebe; /* Lighter color for placeholder text */
  }
  
  .error-message {
    color: red;
    font-size: 12px;
  }
  </style>
  