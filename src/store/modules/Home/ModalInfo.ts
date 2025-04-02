
// type

interface State {
  title: string;
  info: string;
}

// state
const state: State = {
  title: 'ESRAFIL ELAHI',
  info: 'Senior Frontend Engineer at Okala'
}

// getters
const getters = {
  getInfoComplete: (state: State, _getters: any, _rootState: any) => {
    return state
  }
}

// mutations
const mutations = {}

// actions
const actions = {}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}