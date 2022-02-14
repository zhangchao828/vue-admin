import { createApp, render } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const Home = { template: '<div>Home</div>' }
const Test = { template: '<div>Test</div>' }
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/test',
      component: Test,
    },
  ],
})
createApp(App).use(router).mount('#app')
