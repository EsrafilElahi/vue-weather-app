import type { App } from 'vue'
import vuetify from './vuetify.ts'
import { router } from '../router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
// import pinia from '../stores'


export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(ToastPlugin)
  // .use(pinia)
}