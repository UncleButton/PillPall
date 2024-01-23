<template>
  <routerView></routerView>
<!--img src="C:\Repos\PillPall\src\assets\PillPallModel.png"-->
  <div class="notificationBar">
    <NotificationBanner text="This is an informational message" type="info" />
    <NotificationBanner text="This is an error message" type="error" :autoHide="false"/>
    <NotificationBanner text="This is a warning message" type="warning" />
    <NotificationBanner text="This is a success message" type="success" />
  </div>
  
</template>

<!-- <nav>
  <RouterLink to="/">Home</RouterLink>
</nav> -->


<script>
import NotificationBanner from './components/NotificationBanner.vue';
export default {
  components: {
    NotificationBanner
  }
}
</script>

<style scoped>
.notificationBar {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;
  left: 50%;
}
</style>
