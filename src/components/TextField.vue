<template>
  <div>
    <div class="custom-text-field">
        <label>
          <span>{{ label }}</span>
          <span v-if="required" class="required">*</span>
          <span v-if="tooltip != ''"><img class="tooltipIcon" src="../assets/tooltipIcon.png" @click="toggleTooltip"></span>
          <span v-if="tooltipVisible" class="tooltipBox">{{ tooltip }}</span>
        </label>
        <textarea v-if="isMultiline" :value="textData" @input="onInputChange" :placeholder="placeholder" :style='{ width }' @click="showKeyboard" :readonly="!editable"></textarea>
        <input v-else :type="type" :value="textData" @input="onInputChange" :maxlength="maxlength" :placeholder="placeholder" :style='{ width }' @click="showKeyboard" :readonly="!editable"/>
        <span v-if="!editable"><img class="lockIcon" src="../assets/lockIcon.png"></span>
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
      editable: {
        type: Boolean,
        default: true
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
        if(this.editable){
          this.keyboardVisible = true;
          this.focusOnTextArea();
        } else {
          const element = this.$el.querySelector(".lockIcon");
          element.classList.add('shake-element'); // Add CSS class to trigger animation
          setTimeout(() => {
            element.classList.remove('shake-element'); // Remove CSS class after animation completes
          }, 300);
        }
      },
      hideKeyboard(){
        setTimeout(() => {
          this.keyboardVisible = false;
        }, 100); // give buffer so that click doesnt register behind keyboard after it closes
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
    color: var(--primary-text-color);
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
    background-color: var(--secondary-orange);
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
    position: fixed;
    top: 0px;
    left: 0px;
    width: 800px;
    height: 480px;
    background-color: var(--slightly-translucent-white);

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

  input:focus{
    outline: none;
    cursor: none;
  }

  input:read-only {
    background-color: gray;
  }

  .lockIcon {
    position: absolute;
    width: 18px;
    height: 18px;
    margin-left: -14px;
    margin-top: -4px;
  }

  .shake-element {
    animation: shake 0.3s ease-in 1;
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    50% { transform: translateX(2px); }
    75% { transform: translateX(-2px); }
    100% { transform: translateX(0); }
  }


  </style>
  