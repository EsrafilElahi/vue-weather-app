import { fetchCity } from "@/apis/fetchCity";
import { useToast } from "vue-toast-notification";
import type { Commit } from "vuex";
import ModalInfoModule from "./ModalInfo";

// types
interface State {
  foundCities: any[] | null;
  savedCities: any[];
}
interface SetFoundCitiesPayload {
  val: string;
  abortController: AbortController;
}
interface SetSavedCitiesPayload {
  city: any;
}

// state
const state: State = {
  foundCities: null,
  savedCities: [],
};

// getters
const getters = {
  getFoundCities: (state: State, getters: any, rootState: any) => {
    return state.foundCities;
  },

  getSavedCities: (state: State, getters: any, rootState: any) => {
    return state.savedCities;
  }
}

// mutations
const mutations = {
  setFoundCities: (state: State, payload: any[] | null) => {
    return state.foundCities = payload
  },

  setSavedCities: (state: State, payload: any[]) => {
    state.savedCities = payload
  },
  RESTORE_MUTATION(state: State, payload: any) {
    Object.assign(state, payload);
  },
}

// actions
const actions = {
  setFoundCitiesAction: async ({ state, commit }: { state: State, commit: Commit }, payload: SetFoundCitiesPayload) => {
    const { val, abortController } = payload;

    if (val?.trim()?.length > 1) {
      const results = await fetchCity(val, {
        signal: abortController.signal,
      });
      commit('setFoundCities', results)
    } else {
      commit('setFoundCities', null) // Reset when search is cleared
    }
  },

  setSavedCitiesAction: ({ state, commit }: { state: State, commit: Commit }, payload: SetSavedCitiesPayload) => {
    const toast = useToast();
    const { city } = payload

    if (city !== null) {
      // const storedCities = getStoredCities();
      const storedCities = state.savedCities;

      const exist = storedCities.some(
        (storedCity: any) => storedCity.name === city.name
      );
      if (exist) {
        toast.open({
          type: "warning",
          message: "city is already exist in local storage!",
          duration: 2000,
          position: "top",
        });
      } else {
        const newSavedCities = [...storedCities, city]
        commit('setSavedCities', newSavedCities)
        toast.open({
          type: "success",
          message: "city stored in local storage!",
          duration: 2000,
          position: "top",
        });
      }
    }
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    modalInfo: ModalInfoModule
  }
}