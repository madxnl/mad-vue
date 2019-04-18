import Vue from 'vue'
import Router from 'vue-router'
import Documentation from './documentation/Documentation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Documentation },
  ],
})
