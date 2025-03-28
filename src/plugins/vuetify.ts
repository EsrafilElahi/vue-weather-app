import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#2563EB',
    secondary: '#03DAC6',
    error: '#B00020',
    gray: '#111B27',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
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

  defaults: {
    VBtn: {
      color: "primary",
      size: "medium",
      style: {
        textTransform: "none",
        outline: "none",
      },
    },
    VCol: {
      style: {
        padding: '0 !important'
      }
    },
    VRow: {
      style: {
        margin: '0 !important'
      }
    },
    VTextField: {
      variant: 'solo',
      density: 'compact',
      hideDetails: "auto",
      singleLine: true,
      class: '[&>div>div]:!shadow-none !border !border-medium-gray !rounded-lg [&>div>div]:!rounded-lg [&>div>div]:!text-secondary-text'
    }
  },

  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
