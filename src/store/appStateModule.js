export const appStateModule = {
    state: () => ({
        loading: false,
        backBtn: false,
        showBotUserAlert: false,
        showPbUserAlert: false,
        registration: {
            userFormSend: false,
            importantDates: {
                showBanner: {
                    display: true,
                    text: 'Заполните даты важных событий или дни рождения близких людей, и&nbsp;перед праздником мы&nbsp;пришлем вам напоминание и&nbsp;подарок.'
                },
                display: true,
                required: false
            }
        },
        settings: {
            registrationForm: {
                nameField: {
                    display: true,
                    placeholder: 'Иван',
                    label: 'Имя',
                    rules: ['required', 'name']
                },
                surnameField: {
                    display: false,
                    placeholder: 'Иванов',
                    label: 'Фамилия',
                    rules: ['name']
                },
                middleName: {
                    display: false,
                    placeholder: 'Иванович',
                    label: 'Отчество',
                    rules: ['name']
                },
                gender: {
                    display: true,
                    placeholder: '',
                    label: 'Пол',
                    rules: ['required', 'name']
                },
                email: {
                    display: true,
                    placeholder: 'ivan@email.ru',
                    label: 'Email',
                    rules: ['required', 'email']
                },
                city: {
                    display: false,
                    placeholder: '',
                    label: 'Город',
                    items: [
                        'Санкт-Петербург',
                        'Казань'
                    ],
                    citys: [
                        {name: 'Санкт-Петербург', id: '152ed6ac-8bd4-b7aa-88ff-33571ba99c2a'},
                        {name: 'Казань', id: '152ed6ac-8bd4-b7aa-88ff-33571ba99c2a'},
                    ],
                    rules: []
                },
                birthDate: {
                    display: true,
                    placeholder: 'дд.мм.гггг',
                    label: 'Дата рождения',
                    rules: ['required', 'birthDate']
                },
                importantDaysName: {
                    rules: ['required']
                },
                importantDate: {
                    rules: ['required']
                },                
                messageAgreement: {
                    display: false,
                    text: 'Хочу получать реклманые сообщения'
                }           
            },
            updateUserData: {
                nameField: {
                    display: true,
                    placeholder: 'Иван',
                    label: 'Имя',
                    rules: ['name']
                },
                surnameField: {
                    display: false,
                    placeholder: 'Иванов',
                    label: 'Фамилия',
                    rules: ['name']
                },
                middleName: {
                    display: false,
                    placeholder: 'Иванович',
                    label: 'Отчество',
                    rules: ['name']
                },
                birthDate: {
                    display: true,
                    placeholder: 'дд.мм.гггг',
                    label: 'Дата рождения',
                    rules: ['birthDate']
                },
                importantDaysName: {
                    rules: []
                },                                         
            }
        },
        formRules: {
            required: value => !!value || 'Обязательное поле',
            name: value => {
                if (value && value.length < 2) return 'Слишком короткое'
                if (value && !/^\S+$/.test(value)) return 'Не должно содержать пробел'
                if (value && !/^[^0-9]*$/.test(value)) return 'Не должно содержать цифры'
                return true
            },
            phone: value => {
                if (value &&  !/^([0-9]){10}$/.test(value)) return 'Номер должен содержать 10 цифр'
                return true
            },
            email: value => {
                if (value && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]+$/.test(value)) return 'Введен некорректный email'
                return true
            },
            birthDate: value => {
                if (value && !/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d$/.test(value)) return 'Введена некорректная дата'

                if(value) {
                    const candidate = value.split('.')

                    if (candidate && candidate[1] > 31) return 'Введена некорректная дата'
                    if (candidate && candidate[1] === '04' || candidate[1] === '06'  || candidate[1] === '09' || candidate[1] === '11') {
                        if(parseInt(candidate[0]) > 30) return 'Введена некорректная дата'
                    }
                    if (candidate && candidate[1] === '02') {
                        if(parseInt(candidate[0]) > 29) return 'Введена некорректная дата'
                    }
                    if(parseInt(candidate[2]) % 4 != 0) {
                        if(parseInt(candidate[0]) > 28) return 'Введена некорректная дата'
                    }
                    if(candidate && new Date([...candidate].reverse()) > new Date()) return 'Дата не может быть позже текущей'
                }
                return true
            }
        },
        colors: {
            surface:'#f1f3f9',
            primary: '#EA4A61'
        },
        brand: 'Просто цветы'
    }),
    getters: {
        getLoading(state) {
            return state.loading
        },
        getFormFields(state) {
            return state.settings.registrationForm
        },
        getUpdatetDataFields(state) {
            return state.settings.updateUserData
        },        
        getRules: (state) => (fieldRules) => {
            let rules = []

            fieldRules.forEach(rule => {
                rules.push(state.formRules[rule])
            })
            return rules
        },
        getBackBtn(state) {
            return state.backBtn
        },
        getBotUserAlert(state, rootGetters) {
            return state.showBotUserAlert
        },
        getPbUserAlert(state) {
            return state.showPbUserAlert
        },
        getColors(state) {
            return state.colors
        },
        getBrand(state) {
            return state.brand
        },
        getRegistration(state) {
            return state.registration
        },
        getimportantDates(state) {
            if(state.registration.importantDates.display && state.registration.userFormSend) {
                return true
            }
            return false
        },
        showImportantDatesBanner(state) {
            return state.registration.importantDates.showBanner.display
        },
        isImportantDatesRequired(state) {
            return state.registration.importantDates.required
        }
    },
    mutations: {
        setLoading(state) {
            state.loading = !state.loading
        },
        backBtnToggle(state) {
            state.backBtn = !state.backBtn
        },
        setBotUserAlert(state) {
            state.showBotUserAlert = !state.showBotUserAlert
        },
        setPbUserAlert(state) {
            state.showPbUserAlert = !state.showPbUserAlert
        },
        setUserFormSend(state) {
            state.registration.userFormSend = true
        },
        setImporatntDaysBanner(state) {
            state.registration.importantDates.showBanner.display = false
        }      
    },
    actions: {
        loadingToggle({ commit }) {
            commit('setLoading')
        },
        async getDItyId({state, commit, getters, dispatch}, city) {
            const cityId = getters.getFormFields.city.citys.filter(el => el.name == city)
            return cityId[0].id
        },
        setBackBtn({ commit }) {
            commit('backBtnToggle')
        },
        showUserAllertToggle({ commit }) {
            commit('setBotUserAlert')
        },
        showPbUserAllertToggle({ commit }) {
            commit('setPbUserAlert')
        },
        hideUserForm({ commit }) {
            commit('setUserFormSend')
        },
        hideImporatntDaysBanner({ commit }) {
            commit('setImporatntDaysBanner')
        }
    },
    namespaced: true
}