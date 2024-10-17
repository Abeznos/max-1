import api from '@/http';

export const userDataModule = {
    state: () => ({
        botId: '',
        userChatId: '',
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
    mutations: {
        setBotId(state, id) {
            state.botId = id;
        },
        setUserChatId(state, id) {
            state.userChatId = id;
        },        
    },
    actions: {
        async setBotId({state, commit, dispatch}, id) {
            commit('setBotId', id)
        },
        async setUserChatId({state, commit, dispatch}, id) {
            commit('setBotId', id)
        },
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