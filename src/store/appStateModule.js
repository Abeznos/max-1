export const appStateModule = {
    state: () => ({
        loading: false,
        settings: {
            registrationForm: {
                nameField: {
                    display: true,
                    placeholder: 'Иван',
                    label: 'Имя'
                },
                surnameField: {
                    display: true,
                    placeholder: 'Иванов',
                    label: 'Фамилия'
                },
                middleName: {
                    display: true,
                    placeholder: 'Иванович',
                    label: 'Отчество'
                },
                gender: {
                    display: true,
                    placeholder: '',
                    label: 'Пол'
                },
                email: {
                    display: true,
                    placeholder: 'ivan@email.ru',
                    label: 'Email'
                },
                city: {
                    display: true,
                    placeholder: '',
                    label: 'Город',
                    items: [
                        'Санкт-Петербург',
                        'Казань'
                    ],
                    citys: [
                        {name: 'Санкт-Петербург', id: '152ed6ac-8bd4-b7aa-88ff-33571ba99c2a'},
                        {name: 'Казань', id: '152ed6ac-8bd4-b7aa-88ff-33571ba99c2a'},
                    ]
                },
                                                        
            }
        }
    }),
    getters: {
        getLoading(state) {
            return state.loading
        },
        getFormFields(state) {
            return state.settings.registrationForm
        }
    },
    mutations: {
        setLoading(state) {
            state.loading = !state.loading
        }
    },
    actions: {
        loadingToggle({ commit }) {
            commit('setLoading')
        },
        async getDItyId({state, commit, getters, dispatch}, city) {
            const cityId = getters.getFormFields.city.citys.filter(el => el.name == city)
            return cityId[0].id
        }
    },
    namespaced: true
}