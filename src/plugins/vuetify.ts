import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


import { createVuetify, type ThemeDefinition } from "vuetify";
// import '@mdi/font/css/materialdesignicons.css'
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
      variant: "outlined",
      rounded: "0",
      size: "large",
      style: {
        textTransform: "none",
        outline: "none",
        // background: "red !important",
      },
    }
  },
});
