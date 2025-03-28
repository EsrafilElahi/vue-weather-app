import type { App } from "vue";
import { capitalizeDirective } from "./capitalize";

export function registerDirectives(app: App) {
  app.directive('capitalize', capitalizeDirective)
}