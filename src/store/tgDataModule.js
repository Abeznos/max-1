export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return state.tg.initDataUnsaf.user
        }
    },
    actions: {
        expandApp({state, commit, dispatch}) {
            tg.expand()
        }
    },
    namespaced: true
}