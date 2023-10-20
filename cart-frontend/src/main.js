import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import colors from 'vuetify/lib/util/colors'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: { variant: 'outlined' },
    VTextField: { variant: 'solo' }
  },
  theme: {
    defaultTheme: 'dark'
  }
})

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
