<template>
    <v-container
        v-if="!personaldataSend"
        class="h-100"
    >
        <v-row>
            <v-col class="v-col-12 d-flex flex-column justify-center align-center">
                <h2 class="pb-6 pt-6">Анкета регистрации</h2>
                <form class="d-flex flex-column ga-8 w-100">
                    <input class="w-100 border-sm" type="text">
                    <input class="w-100 border-sm" type="text">
                    <input class="w-100 border-sm" type="text">
                </form>
            </v-col>
        </v-row>
    </v-container>

    <div v-else>
        <v-container
            v-if="!showImportantDates"
            class="d-flex flex-column justify-center"
        >
            <v-layout
                class="alert w-100 h-100"
            >
                <v-col class="v-col-12 d-flex flex-column justify-center">
                    <v-card class="pb-alert-card pa-4" variant="flat">
                        <v-card-text>
                            <p>Заполните даты важных событий или дни рождения близких людей, и&nbsp;перед праздником мы&nbsp;пришлем вам напоминание и&nbsp;подарок.</p>
                        </v-card-text>
                        <v-card-actions class=" w-100 d-flex flex-row align-center justify-center">
                            <v-col>
                                <VBtnOutline
                                    class="mt-2 pb-text-bt"
                                    block
                                    size="large"
                                    variant="flat"
                                    type="submit"
                                    :loading="loading"
                                    @click="$router.push(`/${getBotId}`)"
                                    text="Не сейчас"
                                ></VBtnOutline>
                            </v-col>
                            <v-col>
                                <VBtn
                                    class="mt-2 pb-primary-bt"
                                    block
                                    size="large"
                                    variant="flat"
                                    type="submit"
                                    :loading="loading"
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
            class="d-flex flex-column"
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
                        density="compact"
                        placeholder="Название даты или имя близкого"
                        :rules="getRules(getFormFields.importantDaysName.rules)"
                    ></v-text-field>
                    <v-text-field
                        class="pb-text-field"
                        v-model="importantDates[`child${n}_birth_date`]"
                        variant="outlined"
                        label="Дата"
                        density="compact"
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
                <VBtn
                    class="mt-2 pb-primary-bt"
                    size="large"
                    variant="flat"
                    @click="addField"
                    text="Добавить дату"
                    :disabled="isMaxFieldsCount"
                ></VBtn>
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
import {tgService} from '@/services/tgService.js'

export default {
    name: 'RegistrationPage',
    data: () => ({
        loading: false,
        personaldataSend: false,
        showImportantDates: false,
        userData: {},
        importantDates: {},
        fieldsCount: 1
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
            this.loading = !this.loading
            const response = await this.registrationUser({ref: this.$refs.form, data: this.userData})
            if (response) {
                setTimeout(() => (this.loading = !this.loading), 2000)
                setTimeout(() => (this.personaldataSend = true), 2000)
                console.log(response)
            } else {
                this.loading = !this.loading
            }
        },
        async sendImportantDatesForm() {
            this.loading = !this.loading
            const response = await this.updateUserData({ref: this.$refs.datesForm, data: this.importantDates})
            if (response) {
                setTimeout(() => (this.loading = !this.loading), 2000)
                console.log(response)
            } else {
                this.loading = !this.loading
            }
        }
    },
    computed: {
        ...mapGetters({
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules',
            getUserChatId: 'userData/getUserChatId',
            getBotId: 'userData/getBotId',
            getBackBtn: 'appState/getBackBtn'
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
    beforeMount() {
        const { user } = tgService()
        const botId = this.$route.params.id
        const chatId = user?.id || '268451766' //Не забыть удалить тестовый chatId
        this.defineUser({chatId, botId})
    },
    mounted() {
        if(!this.getBackBtn) {
            this.setBackBtn()
        }
    }
}
</script>
<style>
    .pb-text-field .v-field--variant-outlined {
        border-radius: 1rem;
    }
</style>