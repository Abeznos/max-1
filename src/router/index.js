import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/pages/MainPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'

const routes = [
    {
        path: "/",
        component: MainPage
    },
    {
        path: "/registration/",
        component: RegistrationPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;