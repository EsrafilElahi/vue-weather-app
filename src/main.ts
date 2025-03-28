import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { registerPlugins } from '@/plugins'
import { registerDirectives } from "./directives";

const app = createApp(App)

registerPlugins(app)
registerDirectives(app)

app.mount('#app')