import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import RoomDetails from '../components/RoomDetails.vue';
import Slideshow from '../views/slideshow.vue';
import HelpCenter from '../views/HelpCenter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/Homepage'
    },
    {
      path: '/Homepage',
      name: 'Home',
      component: Home,
    },
    {
      path: '/slideshow/:roomName',
      name: 'Slideshow',
      component: Slideshow,
      props: true, // untuk menerima roomName sebagai props
    },
    {
      path: '/room/:roomName',
      name: 'RoomDetails',
      component: RoomDetails,
      props: true,
    },
    {
      path: '/help/:roomName', // Rute untuk halaman Pusat Bantuan
      name: 'HelpCenter',
      component: HelpCenter,
      // meta: { transition: 'slide' },
      props: true,
    }
  ]
})

export default router;