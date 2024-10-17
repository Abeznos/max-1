import api from '@/http';

export const userDataModule = {
    state: () => ({
        balance: 3000,
        orderCode: '123456'
    }),
    getters: {
        getUserBalance(state) {
            return state.balance
        },
        getOrderCode(state) {
            return state.orderCode
        }
    },
    actions: {
        async login({state, commit, dispatch}) {
            const pageUrl = new URL(window.location.href)
            console.log(pageUrl)
            return pageUrl
            //const botId = $route.params.botId

            //try {
            //    const userData = await api.post('/user',)
            //} catch (error) {
//
            //}
        }
    },
    namespaced: true
}