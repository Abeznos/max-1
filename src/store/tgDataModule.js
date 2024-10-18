export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return state.tg.initDataUnsafe?.user
        }
    },
    actions: {
        expandApp({state, commit, dispatch}) {
            state.tg.expand()
        },
        appReady({state, commit, dispatch}) {
            state.tg.ready()
        }
    },
    namespaced: true
}