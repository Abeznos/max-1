export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return state.tg.initDataUnsafe?.user
        },
        initData(state) {
            return state.tg?.initData
        },
        getChatInstance(state) {
            return state.tg?.chat_instance
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