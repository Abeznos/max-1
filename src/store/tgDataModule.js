export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return state.tg.initDataUnsafe
        },

        tgInitData(state) {
            return state.tg.initData
        }
    },
    namespaced: true
}