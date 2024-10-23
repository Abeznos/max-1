<template>
    <v-container
        v-if="!personaldataSend"
        class="h-100"
    >   
        <v-row>
            <v-col class="v-col-12 d-flex flex-column justify-center align-center">
                <h2 class="pb-6 pt-6">Анкета регистрации</h2>
                <v-form class="w-100" validate-on="submit lazzy" ref="form" @submit.prevent>
                    <v-text-field
                        v-if="getFormFields.nameField.display"
                        class="pb-text-field rounded-lg rounded-xl"
                        v-model="userData.name"
                        autofocus
                        variant="outlined"
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
                        :label="getFormFields.surnameField.label"
                        :placeholder="getFormFields.surnameField.placeholder"
                        :rules="getRules(getFormFields.surnameField.rules)"
                    ></v-text-field>
                    <v-text-field
                        v-if="getFormFields.middleName.display"
                        class="pb-text-field"
                        v-model="userData.middle_name"
                        variant="outlined"
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
                        class="mt-4"
                        block
                        size="large"
                        color="primary"
                        @click="sendForm"
                    ></v-btn>
                    
                </v-form>
            </v-col>
        </v-row>
    </v-container>
    <div v-else class="h-100">
        <v-container
            v-if="!showImportantDates"
            class="d-flex flex-column justify-center w-100 pa-0 h-100"
        >
            <v-layout
                class="alert w-100 h-100"
            >
                <v-col class="v-col-12 d-flex flex-column justify-center pa-0">
                    <v-card class="pb-alert-card" variant="flat">
                        <v-card-text class="pb-0">
                            <p>Заполните даты важных событий или дни рождения близких людей, и&nbsp;перед праздником мы&nbsp;пришлем вам напоминание и&nbsp;подарок.</p>
                        </v-card-text>
                        <v-card-actions class=" w-100 d-flex flex-row align-center justify-center">
                            <v-col class="">
                                <VBtnOutline
                                    class="mt-2 pb-text-bt"
                                    block
                                    size="large"
                                    variant="flat"
                                    @click="$router.push(`/${getBotId}`)"
                                    text="Не сейчас"
                                ></VBtnOutline>
                            </v-col>
                            <v-col class="p">
                                <VBtn
                                    class="mt-2 pb-primary-bt"
                                    block
                                    size="large"
                                    variant="flat"
                                    @click="showImportantDates = !showImportantDates"
                                    text="Заполнить"
                                ></VBtn>
                            </v-col>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-layout>
        </v-container>
        <v-container
            v-else
            class="d-flex flex-column pa-0"
        >
            <v-form class="w-100 d-flex flex-column justify-start ga-4" validate-on="submit lazy" ref="datesForm" @submit.prevent>
                <v-card
                    v-for="n in fieldsCount"
                    class="pa-4"
                    flat
                >
                    <div class="mt-2 mb-4">{{ `Важная дата ${n}`}}</div>
                    <v-text-field
                        class="pb-text-field rounded-lg"
                        v-model="importantDates[`child${n}_name`]"
                        variant="outlined"
                        label="Название"
                        placeholder="Название даты или имя близкого"
                        :rules="getRules(getFormFields.importantDaysName.rules)"
                    ></v-text-field>
                    <v-text-field
                        class="pb-text-field"
                        v-model="importantDates[`child${n}_birth_date`]"
                        variant="outlined"
                        label="Дата"
                        placeholder="дд.мм.гггг"
                        :rules="getRules(getFormFields.birthDate.rules)"
                    ></v-text-field>
                    <v-card-actions v-if="n != 1">
                        <VBtnOutline
                            class="mt-2 pb-primary-bt"
                            block
                            size="small"
                            color="#ffffff"
                            variant="flat"
                            @click="removeField(fieldsCount)"
                            text="Удалить дату"
                            :disabled="isMinFieldsCount"
                        ></VBtnOutline>
                    </v-card-actions>
                </v-card>
                <VBtnOutline
                    class="pb-text-bt"
                    size="large"
                    @click="addField"
                    text="Добавить дату"
                    height="44"
                    :disabled="isMaxFieldsCount"
                ></VBtnOutline>
                
                <VBtn
                    class="mt-2 pb-primary-bt"
                    block
                    size="large"
                    variant="flat"
                    type="submit"
                    :loading="loading"
                    @click="sendImportantDatesForm"
                    text="Сохранить"
                ></VBtn>

            </v-form>
        </v-container>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import UserRegistration from '@/components/registrationPage/UserRegistration.vue'
const { user, mainBtn, setBottomBarColor, backButton } = tgService()

import {tgService} from '@/services/tgService.js'

export default {
    name: 'RegistrationPage',
    components: { UserRegistration },
    data: () => ({
        personaldataSend: false,
        showImportantDates: false,
        userData: {},
        importantDates: {},
        fieldsCount: 1,
    }),
    methods: {
        ...mapActions({
            defineUser: 'userData/defineUser',
            registrationUser: 'userData/registrationUser',
            updateUserData: 'userData/updateUserData',
            setBackBtn: 'appState/setBackBtn'
        }),
        addField() {
            if(this.fieldsCount < 4) {
                this.fieldsCount += 1
            }
        },
        removeField(el) {
            if(this.fieldsCount != 1) {
                this.fieldsCount -= 1
            }

            delete this.importantDates[`child${el}_name`]
            delete this.importantDates[`child${el}_birth_date`]
        },
        async sendForm() {
            const response = await this.registrationUser({ref: this.$refs.form, data: this.userData})
            if(response) {
                console.log(response)
                mainBtn.hideProgress()
                mainBtn.hide()
                this.personaldataSend = true
            }
        },
        async sendImportantDatesForm() {
            const response = await this.updateUserData({ref: this.$refs.datesForm, data: this.importantDates})
            if (response) {
                console.log(response)
                mainBtn.hideProgress()
                mainBtn.hide()
                setTimeout(() => this.$router.push('/'), 2000)
            }
        }
    },
    computed: {
        ...mapGetters({
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules',
            getUserChatId: 'userData/getUserChatId',
            getBotId: 'userData/getBotId',
            getBackBtn: 'appState/getBackBtn',
            getColors: 'appState/getColors'
        }),
        isMaxFieldsCount() {
            if (this.fieldsCount === 4) {
                return true
            }
            return false
        },
        isMinFieldsCount() {
            if (this.fieldsCount === 1) {
                return true
            }
            return false
        }
    },
    watch: {
        showImportantDates(newVal) {
            const { mainBtn } = tgService()

            if(newVal) {
                mainBtn.show()
                mainBtn.setText('Сохранить')
                mainBtn.onClick( () => {
                    this.sendImportantDatesForm()
                    mainBtn.showProgress()
                })
                console.log(newVal)
            }

        }
    },
    beforeMount() {
        //const { user, mainBtn, setBottomBarColor, backButton } = tgService()
        const botId = this.$route.params.id
        const chatId = user?.id || '268451766' //Не забыть удалить тестовый chatId
        this.defineUser({chatId, botId})

        backButton.show()
        backButton.onClick( () => this.$router.go(-1) )

        setBottomBarColor(this.getColors.surface)
        mainBtn.show()
        mainBtn.color = this.getColors.primary
        mainBtn.setText('Далее')
        mainBtn.textColor = '#ffffff'
        mainBtn.onClick( () => {
            this.sendForm()
            mainBtn.showProgress() 
        })

    }
}
</script>
<style>
    .pb-text-field .v-field--variant-outlined {
        border-radius: 1rem;
    }
</style>