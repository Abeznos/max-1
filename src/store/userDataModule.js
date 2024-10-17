import api from '@/http';

export const userDataModule = {
    state: () => ({
        botId: '',
        userChatId: '',
        userPersData: {},
        orderCode: '123456'
    }),
    getters: {
        getUserBalance(state) {
            return state.userPersData.balance
        },
        getOrderCode(state) {
            return state.userPersData.orderCode
        },
        getBotId(state) {
            return state.botId
        },
        getUserChatId(state) {
            return state.userChatId
        },
        getUserPersData(state) {
            return state.userPersData
        }
    },
    mutations: {
        setBotId(state, id) {
            state.botId = id;
        },
        setUserChatId(state, id) {
            state.userChatId = id;
        },
        userPersData(state, data) {
            state.userPersData = data
        }
    },
    actions: {
        async setBotId({state, commit, dispatch}, id) {
            commit('setBotId', id)
        },
        async setUserChatId({state, commit, dispatch}, id) {
            commit('setUserChatId', id)
        },
        async login({state, commit, getters, dispatch}) {
            dispatch('appState/loadingToggle', null, { root: true })
            try{
                const userData = await api.post('/user/login', { botId: getters.getBotId, chatId: getters.getUserChatId})
                if(userData.data) {
                    commit('userPersData', userData.data)
                }
                dispatch('appState/loadingToggle', null, { root: true })
            } catch(error) {
                console.log(error)
            }
        }
    },
    namespaced: true
}