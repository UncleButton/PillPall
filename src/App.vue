<template>
  <div>
    <div class="backgroundImage"></div>
    <div class="overlay"></div>
    <div id="header"></div>
    <div id="footer"></div>

    <nav class="homeButton" v-if="$route.name != 'home'">
      <RouterLink to="/">
          <img class="homeIcon" src="./assets/homeIcon.png">
      </RouterLink>
    </nav>
    <nav class="dispenseLogButton">
      <RouterLink to="/dispenseLog">
          <img class="logIcon" src="./assets/logIcon.png">
      </RouterLink>
    </nav>
    <DateTimeWidget class="dateTimeWidget"></DateTimeWidget>
    <routerView></routerView>
    <div class="notificationBar">
      <NotificationBanner v-if="$store.state.informationBanner" :text="$store.state.informationBannerText" type="info" :autoHide="false"/>
      <NotificationBanner v-if="$store.state.errorBanner" :text="$store.state.errorBannerText" type="error" :autoHide="false"/>
      <NotificationBanner v-if="$store.state.warningBanner" :text="$store.state.warningBannerText" type="warning" :autoHide="false"/>
      <NotificationBanner v-if="$store.state.successBanner" :text="$store.state.successBannerText" type="success" :autoHide="true"/>
    </div>
    
    <PinChallenge v-if="!$store.state.PINDone" :pinAnswer="$store.state.PINAnswer"></PinChallenge>
  </div>
</template>


<script>
import NotificationBanner from './components/NotificationBanner.vue';
import DateTimeWidget from './components/DateTimeWidget.vue';
import PinChallenge from './components/PinChallenge.vue';
import apiService from '@/apiService';

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

    this.handshake();
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
        this.goHome()
      }, 60000);
    },
    clearTimer() {
      clearInterval(this.timerId);
      this.startTimer();
    },
    async handshake() {
      try {
        await apiService.handshake();
      } catch (error) {
        this.setBanner("error", "error establishing commmunication with device");
      }
    }
  }
}
</script>

<style>
.backgroundImage {
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
  width: 800px;
  height: 480px;
  z-index: -1;
  
}
#header {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: var(--secondary-blue);
  background-size: cover;
  background-position: center;
  height: 50px;
  width: 800px;
  z-index: -1;
}

.homeButton {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40px;
    height: 40px;

    .homeIcon {
      margin-top: -5px;
      margin-left: -5px;
      width: 50px;
      height: 50px;
    }
}

.dispenseLogButton {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 40px;
    height: 40px;

    .logIcon {
      margin-top: 0px;
      margin-left: -5px;
      width: 40px;
      height: 40px;
    }
}

#footer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color:var(--secondary-blue);
  height: 50px;
  width: 800px;
  z-index: -1;
}
.notificationBar {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 800px;
  top: 0;
}

.dateTimeWidget {
  position: absolute;
  bottom: 3px;
  right: 3px;
}

.footerButtonsContainer {
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex; /* Use flexbox layout */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 50px;
  width: 700px;
}


</style>
