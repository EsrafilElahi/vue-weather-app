import { createStore } from 'vuex';
import { createCustomLogger } from '@/plugins/customLogger';
import HomeModule from './modules/Home'


export default createStore({
  modules: {
    home: HomeModule
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createCustomLogger({
      collapsed: true,
      logState: process.env.NODE_ENV === 'development',
      logger: {
        ...console,
        groupCollapsed: console.log,
        groupEnd: () => { },
      },
    }),
  ],
});
