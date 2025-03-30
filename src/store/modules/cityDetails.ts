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
  getCityDetails: (state: State, getters: any, rootState: any) => {
    return state.cityDetails
  }
}

// mutations
const mutations = {
  setCityDetails: (state: State, payload: any) => {
    return state.cityDetails = payload
  }
}

// actions
const actions = {
  setCityDetailsAction: async ({ state, commit }: { state: State, commit: Commit }, payload: { city: string, abortController: AbortController }) => {
    const { city, abortController } = payload;

    const res = await fetchWeatherCity(city, {
      signal: abortController.signal,
    });

    if (res.cod === 200) {
      commit('setCityDetails', res)
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