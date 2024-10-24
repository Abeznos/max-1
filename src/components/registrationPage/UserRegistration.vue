<template>
    <v-container class="w-100 pa-0 d-flex flex-column justify-start ga-6">
        <h2 class="pb-6 pt-6 text-center">Анкета регистрации</h2>
        <v-form class="w-100 d-flex flex-column ga-1" validate-on="submit lazzy" ref="userForm" @submit.prevent>
            <v-text-field
                v-if="getFormFields.nameField.display"
                class="pb-text-field rounded-lg rounded-xl"
                v-model="userData.name"
                variant="outlined"
                clearable
                :label="getFormFields.nameField.label"
                inputmode="text"
                :placeholder="getFormFields.nameField.placeholder"
                :rules="getRules(getFormFields.nameField.rules)"
            ></v-text-field>
            <v-text-field
                v-if="getFormFields.surnameField.display"
                class="pb-text-field"
                v-model="userData.surname"
                variant="outlined"
                clearable
                :label="getFormFields.surnameField.label"
                :placeholder="getFormFields.surnameField.placeholder"
                :rules="getRules(getFormFields.surnameField.rules)"
            ></v-text-field>
            <v-text-field
                v-if="getFormFields.middleName.display"
                class="pb-text-field"
                v-model="userData.middle_name"
                variant="outlined"
                clearable
                :label="getFormFields.middleName.label"
                :placeholder="getFormFields.middleName.placeholder"
                :rules="getRules(getFormFields.middleName.rules)"
            ></v-text-field>
            <v-radio-group
                v-if="getFormFields.gender.display"
                v-model="userData.gender"
                inline
                :rules="getRules(getFormFields.gender.rules)"
            >
                <v-radio label="Мужчина" value="male" color="var(--primary-color)"></v-radio>
                <v-radio label="Женщина" value="female" color="var(--primary-color)"></v-radio>
            </v-radio-group>
            <v-text-field
                v-if="getFormFields.birthDate.display"
                class="pb-text-field"
                v-model="userData.birth_date"
                variant="outlined"
                clearable
                :label="getFormFields.birthDate.label"
                inputmode="text"
                :placeholder="getFormFields.birthDate.placeholder"
                :rules="getRules(getFormFields.birthDate.rules)"
            ></v-text-field>
            <v-text-field
                v-if="getFormFields.email.display"
                class="pb-text-field"
                v-model="userData.email"
                variant="outlined"
                clearable
                :label="getFormFields.email.label"
                inputmode="email"
                :placeholder="getFormFields.email.placeholder"
                :rules="getRules(getFormFields.email.rules)"
            ></v-text-field>
            <v-select
                v-if="getFormFields.city.display"
                class="pb-text-field"
                v-model="userData.city"
                variant="outlined"
                clearable
                :items="getFormFields.city.items"
                :label="getFormFields.city.label"
                :rules="getRules(getFormFields.city.rules)"
            ></v-select>
            <v-checkbox
                v-if="getFormFields.messageAgreement.display"
                color="var(--primary-color)"
            >
                <template v-slot:label>
                    <a
                        href="https://vuetifyjs.com"
                        target="_blank"
                        @click.stop
                        :text="getFormFields.messageAgreement.text"
                    ></a>
                </template>
            </v-checkbox>
            <v-btn
                v-if="getUserChatId === '000011'"
                class="mt-4"
                block
                size="large"
                color="primary"
                @click="sendForm"
            ></v-btn>
        </v-form>
    </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

import {tgService} from '@/services/tgService.js'
const { user, mainBtn, setBottomBarColor, backButton } = tgService()

export default {
    name: 'UserRegistraton',
    data: () => ({
        userData: {},
    }),
    methods: {
        ...mapActions({
            registrationUser: 'userData/registrationUser',
            hideUserForm: 'appState/hideUserForm'
        }),

        async sendForm() {
            const { valid } = await this.$refs.userForm.validate()
            if (!valid) return false

            const formData = { ...this.userData }
            console.log(formData)
            //if (formData?.city) {
            //    const city = await dispatch('appState/getDItyId', form.data.city, { root: true })
            //    formData.city = city
            //}


            //const newUser = await api.post('/user/registration', {botId: getters.getBotId, chatId: getters.getUserChatId, formData})


            mainBtn.hideProgress()
            mainBtn.hide()
            this.hidUserForm

            return true
        },
    },
    computed: {
        ...mapGetters({
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules',
            getColors: 'appState/getColors',
            getUserChatId: 'userData/getUserChatId',
            getBotId: 'userData/getBotId'
        }),
    },
    mounted() {
        setBottomBarColor(this.getColors.surface)
        mainBtn.color = this.getColors.primary
        mainBtn.setText('Далее')
        mainBtn.textColor = '#ffffff'
        mainBtn.show()
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
<style scoped>

</style>