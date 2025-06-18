import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import RoomDetails from '../components/RoomDetails.vue';
import Slideshow from '../views/slideshow.vue';
import HelpCenter from '../views/HelpCenter.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/Homepage',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/slideshow/:roomName',
    name: 'Slideshow',
    component: Slideshow,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/room/:roomName',
    name: 'RoomDetails',
    component: RoomDetails,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/help/:roomName',
    name: 'HelpCenter',
    component: HelpCenter,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// PROTECT ROUTES
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Balik ke login kalau belum login
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/Homepage'); // Kalau udah login, ga bisa akses login/register lagi
  } else {
    next(); // Lanjut normal
  }
});

export default router;