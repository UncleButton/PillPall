<template>
    <div> 
      <div class="keyboardView">
        <div class="closeKeyboard" @click="failed">Close</div>
        <label class="keyboardTextBoxLabel">PIN CHALLENGE</label>
        <textarea id="keyboardTextBoxFocus" class="keyboardTextBox" @input="onInputChange" :value="textData"></textarea>
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
        pinAnswer: {
            type: String,
            required: true
        }
      },
      data() {
        return {
          textData: ''
        }
      },
      mounted() {
        console.log("made it into here");
        this.setTextData();
      },
      emits: ['failed', 'passed'],
      methods: {
        async setTextData() {
          await new Promise(resolve => {
            setTimeout(resolve, 1); // Wait for 1 milliseconds
          });
          this.textData = this.value;
        },
        failed(){
          this.textData = '';
          this.$store.commit("pinDeclined");
        },
        passed(){
          this.$emit('passed');
          this.$store.commit("pinApproved");
        },
        onChange(input) {
          this.textData = input;
        },
        onKeyPress(button) {
          if(button === '{enter}'){
            this.textData == this.$store.state.PINAnswer ? this.passed() : this.failed();
          }
            
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
      width: 100%;
      height: 100%;
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
    