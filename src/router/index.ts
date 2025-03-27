import { createRouter, createWebHistory, type Router } from "vue-router";
import CityDetailsPage from "@/views/CityDetailsPage.vue";
import HomePage from "@/views/HomePage.vue";

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,

    },
    {
      path: "/weather/:city",
      name: "cityDetailsPage",
      component: CityDetailsPage,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/", // Redirect unknown paths to home
    },
  ],
});