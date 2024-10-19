import api from '@/http';
import {tgService} from '@/services/tgService.js'

export const userDataModule = {
    state: () => ({
        botId: '',
        chatId: '',
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
            return state.chatId
        },
        getUserPersData(state) {
            return state.userPersData
        }
    },
    mutations: {
        setBotId(state, id) {
            state.botId = id
        },
        setChatId(state, id) {
            state.chatId = id;
        },
        userPersData(state, data) {
            state.userPersData = data
        }
    },
    actions: {
        async defineUser ({state, commit, dispatch}, data) {
            commit('setChatId', data.chatId)
            commit('setBotId', data.botId)
        },
        async setChatId({state, commit, dispatch}, id) {
            commit('setChatId', id)
        },
        async setBotId({state, commit, dispatch}, id) {
            commit('setBotId', id)
        },
        async login({state, commit, getters, dispatch}) {
            const { appReady, expandApp } = tgService()
            //dispatch('appState/loadingToggle', null, { root: true })
            try{
                const userData = await api.post('/user/login', { botId: getters.getBotId, chatId: getters.getUserChatId})
                if(userData.data) {
                    commit('userPersData', userData.data)
                }
                appReady()
                expandApp()

                //dispatch('tgData/appReady', null, { root: true })
                //dispatch('tgData/expandApp', null, { root: true })
            } catch(error) {
                console.log(error)
            } finally {
                dispatch('appState/loadingToggle', null, { root: true })
            }
        },
        async registrationUser({state, commit, getters, dispatch}, data){
            const formData = data

            if(formData.birth_date) {
                formData.birth_date = formData.birth_date.toISOString().slice(0, 10)
            }

            if(formData.city) {
                const citys = await dispatch('appState/getDItyId', formData.city , { root: true })

                console.log(citys)
            }


            console.log(formData)

        }
    },
    namespaced: true
}