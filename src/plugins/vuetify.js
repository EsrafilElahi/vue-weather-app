import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: "#1867C0",
    "primary-darken-1": "#1F5592",
    secondary: "#48A9A6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#d0c",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default createVuetify({
  components,
  directives,

  theme: {
    dark: false,
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#d0c",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
        },
      },
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
        background: "red !important",
      },
    },
    VTextField: {
      color: "primary",
      variant: "outlined",
      density: "comfortable",
    },
  },
});
