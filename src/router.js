import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
      },
      {
        path: '/activities',
        name: 'activities',
        component: () => import(/* webpackChunkName: "demo" */ './views/Activities.vue'),
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue'),
        meta: {
          requiresVisitor: false
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue'),
        meta: {
          requiresVisitor: false
        }
      }
    ]
  }
]

const router = new VueRouter({
  linkExactActiveClass: "active",
  routes
})

function isLoggedIn() {
  return store.getters.loggedIn
}


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn() == false || isLoggedIn() == null) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if authenticated, redirect to dashboard page.
    if (isLoggedIn() == true) {
      next({
        name: 'dashboard',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
