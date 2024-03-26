<template>  
    <div class="widgetContainer">
        <h5 class="date">{{currentWeekDay}}, {{currentMonth}} {{ currentDay }}</h5>
        <p class="time">{{ currentTime }}</p>
    </div>
</template>
  
  <script>

  export default {
    components: {
      
    },
    data() {
      return {
        currentTime: '',
        currentWeekDay: '',
        currentMonth: '',
        currentDay: '',
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        weekDays: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      };
    },
    mounted() {
      // Update current time every 5 seconds
      this.updateTime();
      setInterval(() => {
        this.updateTime();
      }, 5000);
    },
    methods: {
      updateTime() {
        const now = new Date();
        // Format the current time as desired (e.g., HH:mm:ss)
        const hours = this.formatTimeUnit(now.getHours());
        const minutes = this.formatTimeUnit(now.getMinutes());
        this.currentTime = `${hours}:${minutes}`;
        this.currentDay = now.getDate();
        this.currentMonth = this.months[now.getMonth()];
        this.currentWeekDay = this.weekDays[now.getDay()];
      },
      formatTimeUnit(unit) {
        // Ensure two-digit format (e.g., 01, 02, ..., 09)
        return unit < 10 ? '0' + unit : unit;
      }
    }
  }
  </script>
  
  <style scoped>
    .widgetContainer {
        background-image: url('src/assets/WidgetBackgroundImage.jpg');
        width: 100px;
        height: 100px;
        border-radius: 15px;
        position: absolute;
        color: black;
        
        text-align: center;

        .date {
            font-size: 13px;
            font-weight: bold;
            position: relative;
            top: 24px;
        }

        .time {
            font-size: 33px;
            font-weight: 800;
            font-stretch: expanded;
            position: relative;
            top: 10px;
        }

    }
  </style>
  