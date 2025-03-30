import type { App } from 'vue'
import vuetify from './vuetify.ts'
import { router } from '../router'
import store from '@/store'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(ToastPlugin)
    .use(store)
}