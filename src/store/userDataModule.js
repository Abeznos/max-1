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
        },
        geBotId(state) {
            return state.botId
        },
        getUserChatId(state) {
            return state.userChatId
        },        
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
            commit('setUserChatId', id)
        },
        async login({state, commit, dispatch}) {
            try{
                const userData = await api.post('/', )
            } catch {

            }
        }
    },
    namespaced: true
}