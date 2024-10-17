import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/pages/MainPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'

const routes = [
    {
        path: "/:botId",
        component: MainPage
    },
    {
        path: "/registration/:botId",
        component: RegistrationPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;