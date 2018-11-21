import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/tab1'
import secondTab from '@/components/tab2'
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
      path: '/secondTab',
      name: 'SecondTab',
      component: secondTab
    },
    {
      path: '/backdated',
      name: 'Backdated',
      component: backDatedDashboard
    }
  ]
})
