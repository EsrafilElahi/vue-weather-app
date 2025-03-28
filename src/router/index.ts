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
      meta: {
        title: 'Home'
      }
    },
    {
      path: "/weather/:city",
      name: "cityDetailsPage",
      component: CityDetailsPage,
      meta: {
        title: 'City'
      }
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/", // Redirect unknown paths to home
    },
  ],
});

router.beforeEach((to, from, next) => {
  const title = to.params.city || to.meta.title

  if (document?.title) {
    window.document.title = `Weather App | ${title}`;
  }
  next();
})