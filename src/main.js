import { createApp } from 'vue'
import './style.css'
import vuetify from '@/plugins/vuetify.js'
import { VueMaskDirective } from 'v-mask'

import App from '@/App.vue'
import store from '@/store';
import router from '@/router'

const app = createApp(App)

app.directive('mask', VueMaskDirective);

app.use(store)
app.use(vuetify)
app.use(router)
app.mount('#app')
