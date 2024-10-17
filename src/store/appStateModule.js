export const appStateModule = {
    state: () => ({
        loading: false
    }),
    getters: {
        getLoading(state) {
            return state.loading
        }
    },
    mutations: {
        setLoading(state) {
            state.loading = !state.loading
        }
    },
    actions: {
        loadingToggle({ commit }) {
            commit('setLoading')
        }
    },
    namespaced: true
}