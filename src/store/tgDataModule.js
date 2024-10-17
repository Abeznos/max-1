export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return state.tg.initDataUnsafe
        }
    },
    actions: {
        expandApp({state, commit, dispatch}) {
            tg.expand()
        }
    },
    namespaced: true
}