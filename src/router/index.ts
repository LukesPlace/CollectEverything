import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/collection/:id',
      name: 'collection',
      component: () => import('../views/Collection.vue'),
      props: true,
    },
    {
      path: '/collections',
      name: 'collections',
      component: () => import('../views/CollectionsList.vue'),
    },
  ],
})

export default router
