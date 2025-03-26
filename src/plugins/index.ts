/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import type { App } from 'vue'
import vuetify from './vuetify.ts'
// import pinia from '../stores'
// import router from '../router'


export function registerPlugins(app: App) {
  app
    .use(vuetify)
  // .use(router)
  // .use(pinia)
}