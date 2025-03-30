import { fetchCity } from "@/apis/fetchCity";
import { getStoredCities } from "@/lib/utils";
import { useToast } from "vue-toast-notification";
import type { Commit } from "vuex";

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
  city: any | null;
}

// state
const state = () => ({
  foundCities: null,
  savedCities: [],
});

// getters
const getters = {
  getFoundCities: (state: State, getters: any, rootState: any) => {
    return state.foundCities
  },

  getSavedCities: (state: State, getters: any, rootState: any) => {
    return state.savedCities
  }
}

// mutations
const mutations = {
  setFoundCities: (state: State, payload: any[] | null) => {
    return state.foundCities = payload
  },

  setSavedCities: (state: State, payload: any[]) => {
    state.savedCities = payload
  }
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
      const storedCities = getStoredCities();

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
  actions
}