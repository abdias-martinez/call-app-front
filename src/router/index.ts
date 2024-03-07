import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/Auth/LoginView.vue'
import DashBoardView from '../views/DashBoardView.vue'
import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'
import ReportsView from '../views/ReportsView.vue'
import UsersView from '../views/UsersView.vue'
import SettingsView from '../views/SettingsView.vue'
import VueJwtDecode from 'vue-jwt-decode'
import store from '../store' 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requireAuth: false,
      requireAdmin: false,
      sessionClosed: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoardView,
    redirect: '/dashboard/home',
    meta: {
      requireAuth: true,
      requireAdmin: false,
      sessionClosed: false
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
        meta: {
          requireAuth: true,
          requireAdmin: false,
          sessionClosed: false
        },
        beforeEnter: async (to, from, next) => {
          if (from.name === 'login' && to.name === 'home') {
            await store.dispatch('obtainAllTablesRecords', 'home')
          }
          next();
        }
      },
      {
        path: 'events',
        name: 'events',
        component: EventsView,
        meta: {
          requireAuth: true,
          requireAdmin: false,
          sessionClosed: false
        }
      },
      {
        path: 'reports',
        name: 'reports',
        component: ReportsView,
        meta: {
          requireAuth: true,
          requireAdmin: false,
          sessionClosed: false
        }
      },
      {
        path: 'users',
        name: 'users',
        component: UsersView,
        meta: {
          requireAuth: true,
          requireAdmin: true,
          sessionClosed: false
        },
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView,
        meta: {
          requireAuth: true,
          requireAdmin: false,
          sessionClosed: false
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.requireAuth;
  const storedToken = localStorage.getItem('jwt');
  const isLoginPage = to.path === '/login';
  const isLeavingLoginPage = from.path !== '/login' && to.path === '/login';

  if (requireAuth && !storedToken && !isLoginPage) {
    next('/login');
  } else if (isLeavingLoginPage && storedToken) {
    const confirmLogout = window.confirm('¿Estás seguro de cerrar sesión?');
    if (confirmLogout) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('dateTimeSession');
      next('/login');
    } else {
      next(false);
    }
  } else if (storedToken && requireAuth) {
    const decodedToken = VueJwtDecode.decode(storedToken);
    console.log(`decodeToken: ${JSON.stringify(decodedToken)}`);
    next();
  } else {
    next();
  }
});

export default router;