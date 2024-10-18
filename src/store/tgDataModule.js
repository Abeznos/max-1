export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return {user: state.tg.initDataUnsaf?.user, initData: state.tg.initDataUnsaf}
        }
    },
    actions: {
        expandApp({state, commit, dispatch}) {
            state.tg.expand()
        }
    },
    namespaced: true
}