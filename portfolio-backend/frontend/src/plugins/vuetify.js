import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
    dark: false,
    colors: {
        primary: '#6200EE',
        secondary: '#03DAC6',
        error: '#B00020',
        success: '#4CAF50',
        warning: '#FB8C00',
        background: '#F5F5F5',
        surface: '#FFFFFF',
    }
}

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
})