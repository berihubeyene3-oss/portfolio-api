import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import('../views/Projects.vue'),
    },
    {
        path: '/skills',
        name: 'Skills',
        component: () => import('../views/Skills.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/Blog.vue'),
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else if (to.meta.guestOnly && isAuthenticated) {
        next('/dashboard')
    } else {
        next()
    }
})

export default router