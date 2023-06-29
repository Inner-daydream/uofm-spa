import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/gallery',
      name: 'GalleryView',
      beforeEnter: authRoute,
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
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

async function authRoute(to, from, next) {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/user/info", requestOptions)
    if (response.ok) {
      next();
    }
    else {
      next('/login');
    }
  } catch (error) {
    console.log(error);
    next('/login');
  }
}
export default router
