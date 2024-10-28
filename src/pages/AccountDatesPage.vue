<template>
    <v-container class="w-100 h-100 pa-0 d-flex flex-column justify-start ga-8 pb-8">
        <v-sheet class="d-flex flex-column align-center justify-center ga-4">
            <v-container class="pa-0 d-flex justify-space-between align-center mt-8">
                <div class="text-h6 w-100 text-left align-center">Ваши важные даты</div>
                <v-btn size="x-small" :icon="isUserFormEdit ? '$editOff' : '$edit'" @click="userFormEdit = !userFormEdit"></v-btn>
            </v-container>
                <v-form
                    class="w-100 d-flex flex-column align-center justify-center ga-8"
                    validate-on="submit lazzy"
                    ref="userDates"
                    @submit.prevent
                    :disabled="!isUserFormEdit"
                >            
                <v-card
                    v-for="n in cardCount"
                    class="user-data-card w-100 pt-4"
                    flat
                >
                    <v-card-text>
                        <v-row>
                            <v-col class="pb-0 pt-0">
                                <v-card-title class="pa-0 mb-4 text-subtitle-1">{{ `Важная дата ${n}` }}</v-card-title>
                                <v-text-field
                                    class="pb-text-field rounded-lg rounded-xl"
                                    v-model="user[`child${n}_name`]"
                                    variant="outlined"
                                    density="compact"
                                    label="Имя"
                                    inputmode="text"
                                    placeholder="Иван"
                                    :clearable="isUserFormEdit"
                                    :rules="getRules(getUpdatetDataFields.nameField.rules)"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="pb-0 pt-0">
                                <v-text-field
                                    class="pb-text-field rounded-lg rounded-xl"
                                    v-model="user[`child${n}_birth_date`]"
                                    variant="outlined"
                                    density="compact"
                                    label="Дата рождения"
                                    inputmode="text"
                                    :clearable="isUserFormEdit"
                                    placeholder="дд.мм.гггг"
                                    :rules="getRules(getUpdatetDataFields.birthDate.rules)"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>  
                <v-btn
                    v-if="getUserChatId === '268451766'"
                    class="mt-4"
                    block
                    size="large"
                    color="primary"
                    @click="sendForm"
                ></v-btn>   
            </v-form>          
        </v-sheet>
    </v-container>
</template>
<script>
import {tgService} from '@/services/tgService.js'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

const { user, mainBtn, setBottomBarColor, backButton } = tgService()
import api from '@/http'

export default {
    name: 'AccountPage',
    data: () => ({
        user: {
            name: '',
            birth_date: ''
        },
        userFormEdit: false,
        cardCount: 4
    }),
    methods: {
        ...mapActions ({
            updateStoreData: 'userData/updateStoreData',
            login: 'userData/login'
        }),
        updateUserData(field, data) {
            this.updateStoreData({key: field, value: data})
        },
        showTgButton() {
            mainBtn.show()
        },
        hideTgButton() {
            mainBtn.hide()
        },
        async sendForm() {
            const { valid } = await this.$refs.userDates.validate()
            if (!valid) return false

            const formData = { ...this.user }
            console.log(formData)

            if (formData?.city) {
                const city = await dispatch('appState/getDItyId', form.data.city, { root: true })
                formData.city = city
            }

            const newUser = await api.post('/user/update-dates', {botId: this.getBotId, chatId: this.getUserChatId, formData})
            console.log(newUser)

            if(newUser.data.is_registered) {
                const user = await this.login()

                console.log(newUser)

                mainBtn.hideProgress()
                mainBtn.hide()
                return true
            }
        },
    },
    computed: {
        ...mapGetters ({
            getUserPersData: 'userData/getUserPersData',
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules',
            getColors: 'appState/getColors',
            getBotId: 'userData/getBotId',
            getUserChatId: 'userData/getUserChatId',
            getUpdatetDataFields: 'appState/getUpdatetDataFields'
        }),
        isUserFormEdit() {
            return this.userFormEdit
        }
    },
    watch: {
        userFormEdit(newVal) {
            if(newVal === true) {
                console.log('Показать кнопку')
                mainBtn.show()
            } else {
                console.log('Скрыть кнопку')
                mainBtn.hide()
            }
        }
    },
    async beforeMount() {

        backButton.show()
        backButton.onClick( () => this.$router.go(-1) )

        this.user.name = await this.getUserPersData.name

        for(let n = 1; n <= 4; n++) {
            this.user[`child${n}_name`] = this.getUserPersData[`child${n}_name`]
            this.user[`child${n}_birth_date`] = this.getUserPersData[`child${n}_birth_date`] ? new Date(this.getUserPersData[`child${n}_birth_date`]).toLocaleString().slice(0, 10) : ''
        }

        setBottomBarColor(this.getColors.surface)
        mainBtn.color = this.getColors.primary
        mainBtn.setText('Сохранить')
        mainBtn.textColor = '#ffffff'

        mainBtn.onClick( async () => {
            mainBtn.showProgress()

            const pbResponse = await this.sendForm()

            if(!pbResponse) {
                mainBtn.hideProgress()
                return
            }
            return
        })
    }
}
</script>
<style>

</style>