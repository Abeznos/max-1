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
            //console.log(data)
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
            dispatch('appState/loadingToggle', null, { root: true })
            try {
                const userData = await api.post('/user/login', { botId: getters.getBotId, chatId: getters.getUserChatId})

                if(userData.data.success === false) {
                    dispatch('appState/showAllertToggle', null, { root: true })
                    console.log(userData.data)
                }

                return userData

                //if(userData.data) {
                //    commit('userPersData', userData.data)
                //}
                //appReady()
                //expandApp()
//
                //dispatch('tgData/appReady', null, { root: true })
                //dispatch('tgData/expandApp', null, { root: true })
            } catch(error) {
                console.log(error)
            } finally {
                dispatch('appState/loadingToggle', null, { root: true })
            }
        },
        async registrationUser({state, commit, getters, dispatch}, form){
            const formData = { ...form.data }
            const { valid } = await form.ref.validate()

            if (!valid) return false

            if (form.data.birth_date) {
                let birth_date = form.data.birth_date.split('.')
                birth_date = new Date([...birth_date].reverse())

                formData.birth_date = birth_date.toISOString().slice(0, 10)
            }

            if (form.data.city) {
                const city = await dispatch('appState/getDItyId', form.data.city, { root: true })
                formData.city = city
            }

            try {
                const newUser = await api.post('/user/registration', {botId: getters.getBotId, chatId: getters.getUserChatId, formData})
            } catch(error) {
                console.log(error)
            }
            return true
        }
    },
    namespaced: true
}