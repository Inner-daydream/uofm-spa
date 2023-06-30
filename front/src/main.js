
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import Vuelidate from 'vuelidate'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        themes: {
            light: {
                colors: {
                    primary: '#F7F5FF',
                    secondary: '#6D49FF',
                    anchor: '#1B133F'
                },
            },
        },
    }
})

const app = createApp(App)
app.use(Vuelidate)
app.use(router)
app.use(vuetify)
app.mount('#app')
