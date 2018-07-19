import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import backDatedDashboard from '@/components/backDatedDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: dashboard
    },
    {
      path: '/backdated',
      name: 'Backdated',
      component: backDatedDashboard
    }
  ]
})
