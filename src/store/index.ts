import { createStore } from 'vuex';
import { createCustomLogger } from '@/plugins/customLogger';
import HomeModule from './modules/Home'
import CityDetailsModule from './modules/cityDetails'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence<any>({
  key: 'vuexKey',
  storage: window.localStorage,
  modules: ['home', 'cityDetails'],
})


export default createStore({
  modules: {
    home: HomeModule,
    cityDetails: CityDetailsModule
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
    vuexLocal.plugin
  ],
});
