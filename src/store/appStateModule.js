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
        loadingToggle(state) {
            state.loading = !state.loading
        }
    },
    namespaced: true
}    