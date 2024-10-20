import { createApp } from 'vue'
import './style.css'
import vuetify from '@/plugins/vuetify.js'

import App from '@/App.vue'
import store from '@/store';
import router from '@/router'

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      document.body.style.height = window.visualViewport.height + 'px';
    });
  }
  // This will ensure user never overscroll the page
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) window.scrollTo(0, 0);
  });

const app = createApp(App)

app.use(store)
app.use(vuetify)

app.use(router)
app.mount('#app')
