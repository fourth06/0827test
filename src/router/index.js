import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import editPage from '@/components/editPage'
import addPage from '@/components/addPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'editPage',
      component: editPage
    },
    {
      path: '/',
      name: 'addPage',
      component: addPage
    },
  ]
})
