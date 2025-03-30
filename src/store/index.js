import { createStore } from "vuex";
import { createCustomLogger } from "@/plugins/customLogger";

export default createStore({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },

  plugins: [
    createCustomLogger({
      collapsed: true,
      logState: process.env.NODE_ENV === "development",
      filter: (mutation) => !mutation.type.startsWith("@private/"),
      logger: {
        ...console,
        groupCollapsed: console.log, // Disable actual collapsing in production
        groupEnd: () => {},
      },
    }),
  ],
});
