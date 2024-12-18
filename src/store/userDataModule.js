import api from '@/http';
import {tgService} from '@/services/tgService.js'

export const userDataModule = {
    state: () => ({
        botId: '',
        chatId: '',
        userPersData: ''
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
        async setUserData({state, commit, dispatch}, data) {
            commit('userPersData', data)
        },
        async login({state, commit, getters, dispatch}) {
            try {

                const userData = await api.post('/user/login', { botId: getters.getBotId, chatId: getters.getUserChatId})

                commit('userPersData', userData.data)
                return true
            } catch(error) {
                console.log(error)
            } finally {

            }
        },
        async registrationUser({state, commit, getters, dispatch}, form) {
            console.log(form)
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

            const newUser = await api.post('/user/registration', {botId: getters.getBotId, chatId: getters.getUserChatId, formData})

            if (newUser.data.success) {
                console.log(newUser.data)
                return true
            }

        },

        async updateUserData({state, commit, getters, dispatch}, form) {
            const formData = { ...form.data }
            const { valid } = await form.ref.validate()

            if (!valid) return false

            //console.log(form.data.child1_birth_date)

            //let child1_birth_date = form.data.child1_birth_date.split('.')
            //child1_birth_date = new Date([...child1_birth_date].reverse())
            //formData.child1_birth_date = child1_birth_date.toLocaleString().slice(0, 10)

            //console.log(formData.child1_birth_date)

            const updatedUser = await api.post('/user/update-dates', {botId: getters.getBotId, chatId: getters.getUserChatId, formData})
            console.log(updatedUser.data)

            if (updatedUser.data.success) {
                console.log(updatedUser.data)
                return true
            }
        }
    },
    namespaced: true
}