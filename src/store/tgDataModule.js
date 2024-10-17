const tg = window.Telegram.WebApp;

export const tgDataModule = {
    state: () => ({
        tg: tg
    }),
    getters: {
        getUserFromTg(state) {
            return state.tg.initDataUnsafe
        }
    },
    namespaced: true
}