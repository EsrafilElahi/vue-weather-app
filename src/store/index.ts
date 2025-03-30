import { createStore, type MutationPayload } from 'vuex';
import { createCustomLogger } from '@/plugins/customLogger';



export default createStore({
  modules: {

  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createCustomLogger({
      collapsed: true,
      logState: process.env.NODE_ENV === 'development',
      filter: (mutation: MutationPayload) => !mutation.type.startsWith('@private/'),
      logger: {
        ...console,
        groupCollapsed: console.log,
        groupEnd: () => { },
      },
    }),
  ],
});
