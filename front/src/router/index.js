import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gallery',
      name: 'GalleryView',
      component: () => import('../views/GalleryView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/add_image',
      name: 'Add Image',
      component: () => import('../views/AddImageView.vue')
    },
  ]
})

export default router
