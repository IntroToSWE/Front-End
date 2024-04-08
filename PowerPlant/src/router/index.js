import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import SignUp from '../components/SignUp.vue'
import Search from '../components/Search.vue'
import UserPlant from '../components/UserPlant.vue'
import UserProfile from '../components/UserProfile.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/userplant',
      name: 'userplant',
      component: UserPlant
    },
    {
      path: '/userprofile',
      name: '/userprofile',
      component: UserProfile
    }
  ]
})

export default router
