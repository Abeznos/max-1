import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/pages/MainPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'
import AccountPage from '@/pages/AccountPage.vue'
import LocationPage from '@/pages/LocationPage.vue'
import PromotionPage from '@/pages/PromotionPage.vue'
import LoyaltyTerns from '@/pages/LoyaltyTerns.vue'

const routes = [
    {
        path: "/:id",
        component: MainPage
    },
    {
        path: "/registration/:id",
        component: RegistrationPage
    },
    {
        path: "/account/:id",
        component: AccountPage
    },
    {
        path: "/location/:id",
        component: LocationPage
    },
    {
        path: "/promotion/:id",
        component: PromotionPage
    },
    {
        path: "/loyalty-terms/:id",
        component: LoyaltyTerns
    }    
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;