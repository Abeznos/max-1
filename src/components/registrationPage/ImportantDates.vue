<template>
    <v-container
        v-if="showImportantDatesBanner"
        id="important-dates-banner"
        class="w-100 h-100 pa-0 d-flex flex-column justify-center ga-6"
    >
        <v-layout class="alert w-100 h-100">
            <v-card class="pb-alert-card" variant="flat">
                <v-card-text class="pb-0">
                    <p>Заполните даты важных событий или дни рождения близких людей, и&nbsp;перед праздником мы&nbsp;пришлем вам напоминание и&nbsp;подарок.</p>
                </v-card-text>
                <v-card-actions class="w-100 d-flex flex-row align-center justify-center pa-0">
                    <v-col class="">
                        <VBtnOutline
                            class="mt-2 pb-text-bt"
                            block
                            size="large"
                            height="48"                            
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
                            height="48"
                            variant="flat"
                            @click="hideImporatntDaysBanner"
                            text="Заполнить"
                        ></VBtn>
                    </v-col>
                </v-card-actions>
            </v-card>            
        </v-layout>
    </v-container>
    <v-container
        v-else
        class="w-100 h-100 pa-0 d-flex flex-column justify-start ga-6"
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
                    v-model.trim="importantDates[`child${n}_birth_date`]"
                    variant="outlined"
                    clearable
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
                        clearable
                        text="Удалить дату"
                        :disabled="isMinFieldsCount"
                        @click="removeField(fieldsCount)"
                    ></VBtnOutline>
                </v-card-actions>                
            </v-card>
            <VBtn
                v-if="getUserChatId === '000011'"
                class="mt-2 pb-primary-bt"
                block
                size="large"
                variant="flat"
                type="submit"
                text="Сохранить"
                @click="sendForm"
            ></VBtn>            
        </v-form>
        <VBtnOutline
            class="pb-text-bt"
            size="large"
            @click="addField"
            text="Добавить дату"
            height="44"
            :disabled="isMaxFieldsCount"
        ></VBtnOutline>
    </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

import {tgService} from '@/services/tgService.js'
const { user, mainBtn, setBottomBarColor, backButton } = tgService()

export default {
    name: 'ImportantDates',
    data: () => ({
        fieldsCount: 1,
        importantDates: {}
    }),
    methods: {
        ...mapActions({
            hideImporatntDaysBanner: 'appState/hideImporatntDaysBanner'
        }),
        addField() {
            if(this.fieldsCount < 4) {
                this.fieldsCount += 1
            }
        },
        removeField(el) {
            if(this.fieldsCount != 1) this.fieldsCount -= 1

            delete this.importantDates[`child${el}_name`]
            delete this.importantDates[`child${el}_birth_date`]
        },
        async sendForm() {
            const { valid } = await this.$refs.datesForm.validate()
            if (!valid) return false

            const formData = { ...this.importantDates }
            console.log(formData)

            //const newUser = await api.post('/user/registration', {botId: getters.getBotId, chatId: getters.getUserChatId, formData})
            this.$router.push(`/${this.getBotId}`)
            return true
        }
    },
    computed: {
        ...mapGetters({
            getUserChatId: 'userData/getUserChatId',
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules',
            isImportantDatesRequired: 'appState/isImportantDatesRequired',
            showImportantDatesBanner: 'appState/showImportantDatesBanner',
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
    mounted() {
        setBottomBarColor(this.getColors.surface)
        mainBtn.color = this.getColors.primary
        mainBtn.setText('Сохранить')
        mainBtn.textColor = '#ffffff'
        mainBtn.show()
        mainBtn.onClick( async () => {
        mainBtn.showProgress()

            const pbResponse = await this.sendForm()

            if(!pbResponse) {
                mainBtn.hideProgress()
                this.$router.push(`/${this.getBotId}`)
                return
            }

            mainBtn.hideProgress()
            mainBtn.hide()

            return
        })
    }
}
</script>
<style>
    
</style>