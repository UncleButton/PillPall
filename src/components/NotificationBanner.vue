<template>
  <transition name="fade">
    <div v-if="isVisible" class="notification" :class="notificationType">
      <span>
        <img v-if="type=='info'" class="icon" src="../assets/infoIcon.png">
        <!-- <img v-if="type=='error'" class="icon" src="../assets/errorIcon.png"> -->
        <img v-if="type=='warning'" class="icon" src="../assets/warningIcon.png">
        <img v-if="type=='success'" class="icon" src="../assets/successIcon.png">
      </span>
      {{ text }}
      <span class="close-btn" @click="handleCloseClick">×</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotificationBanner',
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
      validator: value => ['info', 'error', 'warning', 'success'].includes(value),
    },
    autoHide: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  computed: {
    notificationType() {
      return this.type === 'info' ? 'notification-info' : `notification-${this.type}`;
    },
  },
  methods: {
    handleCloseClick() {
        this.isVisible = false;
        this.$emit('close');
        setTimeout(() => {this.clearBanner(this.type)}, 1000);//let it fade out before removing it
    },
  },
  mounted() {
    if (this.autoHide) {
      setTimeout(() => {
        this.isVisible = false;
        this.$emit('close');
        setTimeout(() => {this.clearBanner(this.type)}, 1000);//let it fade out before removing it
      }, 5000); // 10 seconds before fading
    }
  },
};
</script>

<style scoped>
.notification {
  position: relative;
  top: 0;
  
  width: 800px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  height: 50px;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.icon {
  position: absolute;
  top: 3px;
  left: 10px;
  width: 40px;
  height: 40px;
}

.notification-info {
  background-color: #3498db; /* Blue background for info */
  color: #fff;
}

.notification-error {
  background-color: #e74c3c; /* Red background for error */
  color: #fff;
}

.notification-warning {
  background-color: var(--primary-orange); /* Yellow background for warning */
  color: #fff;
}

.notification-success {
  background-color: #2ecc71; /* Green background for success */
  color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
