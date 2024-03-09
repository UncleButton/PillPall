<template>
  <div>
    <div id="backgroundImage"></div>
    <div class="overlay"></div>
    <div id="header"></div>
    <div id="footer"></div>

    <nav class="homeButton" v-if="$route.name != 'home'">
      <RouterLink to="/">
          <img class="homeIcon" src="./assets/homeIcon.png">
      </RouterLink>
    </nav>

    <routerView></routerView>
    <div class="notificationBar">
      <!-- <NotificationBanner text="This is an informational message" type="info" />
      <NotificationBanner text="This is an error message" type="error" :autoHide="false"/>
      <NotificationBanner text="This is a warning message" type="warning" />
      <NotificationBanner text="This is a success message" type="success" /> -->
    </div>
    <DateTimeWidget class="dateTimeWidget"></DateTimeWidget>
    <PinChallenge v-if="!$store.state.PINDone" :pinAnswer="$store.state.PINAnswer"></PinChallenge>
  </div>
</template>


<script>
import NotificationBanner from './components/NotificationBanner.vue';
import DateTimeWidget from './components/DateTimeWidget.vue';
import PinChallenge from './components/PinChallenge.vue';

export default {
  components: {
    NotificationBanner,
    DateTimeWidget,
    PinChallenge
  },
  data() {
    return {
      currentTime: '',
      currentWeekDay: '',
      currentMonth: '',
      currentDay: '',
      currentRoute: this.$route.path,
      timerId: null,
      pinChallenge: false
    };
  },
  mounted() {
    this.startTimer();
    document.addEventListener('click', this.clearTimer);

    //send out reminders every minute and set next schedule
    this.$store.commit('setNextSchedule');
    this.$store.commit('sendScheduleReminders');
    setInterval(() => {
      this.$store.commit('setNextSchedule');
      this.$store.commit('sendScheduleReminders');
    }, 60000);

    // Update current time every second
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      // Format the current time as desired (e.g., HH:mm:ss)
      const hours = this.formatTimeUnit(now.getHours());
      const minutes = this.formatTimeUnit(now.getMinutes());
      this.currentTime = `${hours}:${minutes}`;
    },
    formatTimeUnit(unit) {
      // Ensure two-digit format (e.g., 01, 02, ..., 09)
      return unit < 10 ? '0' + unit : unit;
    },
    startTimer() {
      this.timerId = setInterval(() => {
        console.log("Idle: rerouting to home");
        this.$router.push({name: 'home'});
      }, 60000);
    },
    clearTimer() {
      clearInterval(this.timerId);
      this.startTimer();
    }
  }
}
</script>

<style scoped>
#backgroundImage {
  background-image: url('./assets/GenericBackgroundImage.jpg');
  background-size: cover;
  background-position: center;
  height: 480px;
  width: 800px;
  z-index: -1;
  position: fixed;
  top: 0px;
  filter: brightness(0.8);
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(255, 255, 255, 0.15); /* Semi-transparent red color */
}
#header {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #2c4b61;
  background-size: cover;
  background-position: center;
  height: 50px;
  width: 100vw;
  z-index: -1;
}

.homeButton {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40px;
    height: 40px;
    background-color: #437599;
    border-radius: 5px;

    .homeIcon {
      margin-top: 2px;
      margin-left: -2px;
    }
}

#footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: #2c4b61;
  background-size: cover;
  background-position: center;
  height: 50px;
  width: 100vw;
  z-index: -1;
}
.notificationBar {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;
  left: 50%;
}

.dateTimeWidget {
  position: absolute;
  bottom: 3px;
  right: 3px;
}
</style>
