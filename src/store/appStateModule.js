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
                    ]
                }                                            
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
        }
    },
    namespaced: true
}