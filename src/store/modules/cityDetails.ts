import { fetchWeatherCity } from "@/apis/fetchWeather"
import type { Commit } from "vuex"

// types
interface State {
  cityDetails: any | null
}

// state
const state = {
  cityDetails: null
}

// getters
const getters = {
  getCityDetails: (state: State, _getters: any, _rootState: any) => {
    return state.cityDetails
  }
}

// mutations
const mutations = {
  setCityDetails: (state: State, payload: any) => {
    return state.cityDetails = payload
  },
  RESTORE_MUTATION(state: State, payload: any) {
    Object.assign(state, payload);
  },
}

// actions
const actions = {
  setCityDetailsAction: async ({ commit }: { state: State, commit: Commit }, payload: { city: string, abortController: AbortController }) => {
    const { city, abortController } = payload;

    const res = await fetchWeatherCity(city, {
      signal: abortController.signal,
    });

    if (res.cod === 200) {
      commit('setCityDetails', res)
    }

    // code example for understand root: true
    commit('someMutation') // -> 'foo/someMutation'
    commit('someMutation', null, { root: true }) // -> 'someMutation'
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}