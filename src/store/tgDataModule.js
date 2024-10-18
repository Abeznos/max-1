export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return {user: state.tg.initDataUnsaf?.user}
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