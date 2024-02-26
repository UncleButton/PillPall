import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddPill from '../views/AddPillView.vue'
import AddSchedule from '../views/AddScheduleView.vue'
import ScheduleView from '../views/ScheduleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/addPill',
      name: 'add pill',
      component: AddPill
    },
    {
      path: '/addSchedule',
      name: 'add schedule',
      component: AddSchedule
    },
    {
      path: '/schedule',
      name: 'schedule view',
      component: ScheduleView
    }
  ]
})

export default router
