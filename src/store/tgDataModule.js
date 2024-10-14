export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUserFromTg(state) {
            return state.tg.initDataUnsafe?.user
        }
    },
    namespaced: true
}