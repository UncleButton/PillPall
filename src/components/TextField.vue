<template>
  <div>
    <div class="custom-text-field">
        <label>
          <span :for="id">{{ label }}</span>
          <span v-if="required" class="required">*</span>
          <span v-if="tooltip != ''"><img class="tooltipIcon" src="../assets/tooltipIcon.png" @click="toggleTooltip"></span>
          <span v-if="tooltipVisible" class="tooltipBox">{{ tooltip }}</span>
        </label>
        <textarea v-if="isMultiline" :id="id" :value="textData" @input="onInputChange" :placeholder="placeholder" :style='{ width }' @focus="showKeyboard"></textarea>
        <input v-else :type="type" :id="id" :value="textData" @input="onInputChange" :maxlength="maxlength" :placeholder="placeholder" :style='{ width }' @focus="showKeyboard"/>
    </div>

    <div class="keyboardView" v-if="keyboardVisible">
      <div class="closeKeyboard" @click="hideKeyboard">Close</div>
      <label class="keyboardTextBoxLabel">{{ label }}</label>
      <textarea id="keyboardTextBoxFocus" class="keyboardTextBox" :value="textData" :placeholder="placeholder" :maxlength="maxlength" @input="onInputChange"></textarea>
      <SimpleKeyboard class="keyboard" @onChange="onChange" @onKeyPress="onKeyPress" :input="textData" @focus="focusOnTextArea"/>
    </div>
  </div>

  </template>
  
  <script>
  
import SimpleKeyboard from './SimpleKeyboard.vue';

  export default {
    components: {
      SimpleKeyboard,
    },
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
      required: {
        type: Boolean,
        default: false
      },
      tooltip: {
        type: String,
        default: ''
      },
      error: String
    },
    data() {
      return {
        keyboardVisible: false,
        textData: '',
        tooltipVisible: false
      }
    },
    mounted() {
      this.setTextData();
    },
    emits: ['input'],
    methods: {
      toggleTooltip(){
        this.tooltipVisible = true;
        setTimeout(() => {this.tooltipVisible = false}, 5000);//turn off tooltip after 5 seconds
      },
      async setTextData() {
        await new Promise(resolve => {
          setTimeout(resolve, 1); // Wait for 1 milliseconds
        });
        this.textData = this.value;
      },
      updateValue(newValue) {
          // Emit an 'input' event to update the parent component's data
          this.$emit('input', newValue);
      },
      showKeyboard(){
        this.keyboardVisible = true;
        this.focusOnTextArea();
      },
      hideKeyboard(){
        this.keyboardVisible = false;
      },
      onChange(input) {
        input = input.slice(0, this.maxlength);
        this.textData = input;
        this.updateValue(this.textData);
      },
      onKeyPress(button) {
        if(button == '{enter}')
          this.hideKeyboard();
        console.log("button", button);
      },
      onInputChange(input) {
        this.textData = input.target.value;
        this.focusOnTextArea();
      },
      focusOnTextArea() {
        document.getElementById("keyboardTextBoxFocus").focus();
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
  .required {
    color: darkred;
    font-size: 18px;
  }

  .tooltipIcon {
    width: 18px;
    height: 18px;
  }
  .tooltipBox {
    width: 200px;
    height: fit-content;
    background-color: rgba(39, 86, 156, 0.81);
    border-radius: 5px;
    position: absolute;
    padding: 5px;
    z-index: 1000;
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

  .keyboardView {
    z-index: 1;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 800px;
    height: 480px;
    background-color: rgb(255,255,255,0.7);

    .keyboardTextBox {
      height: 70px;
      margin: 0px 50px 50px 50px;
      background-color: white;
      border-radius: 10px;
      width: 700px;
    }

    .keyboardTextBoxLabel {
      margin: 50px 50px -5px 60px;
      font-size: 30px;
      color: black;
    }

    .closeKeyboard {
      margin: 10px;
      font-size: 18px;
      font-weight: bold;
      float: right;
      color: black;
    }
    
  }


  </style>
  