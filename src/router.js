import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/solve/:lang/:id',
      name: 'solve',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/Solve.vue')
    },
    {
      path: '/create',
      name: 'create',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/Create.form.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/challenges',
      name: 'challenges',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/Challenges.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/Users.vue')
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/Leaderboard.vue')
    },
    {
      path: '/tokens',
      name: 'tokens',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/Tokens.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const username = store.getters.user.username || ''
  if (username === '' && to.matched.some(record => record.meta.requiresAuth)) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
