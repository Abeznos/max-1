export const tgDataModule = {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    getters: {
        getUser(state) {
            return tg.initDataUnsafe?.user
        }
    },
    namespaced: true    
}