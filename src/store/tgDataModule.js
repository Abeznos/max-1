export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return state.tg.initDataUnsafe?.user
        },

        tgInitData(state) {
            return state.tg.initData.id
        }
    },
    namespaced: true
}