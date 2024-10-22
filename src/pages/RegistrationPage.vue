<template>
    <v-container 
        v-if="!personaldataSend"
        class="h-100"
    >
        <v-row>
            <v-col class="v-col-12 d-flex flex-column justify-center align-center">
                <h2 class="pb-6 pt-6">Анкета регистрации</h2>
                <div>
                    <p>{{ getUserChatId }}</p>
                    <p>{{ getBotId }}</p>
                </div>
                <v-form class="w-100" validate-on="submit lazy" ref="form" @submit.prevent>
                    <v-text-field
                        v-if="getFormFields.nameField.display"
                        class="pb-text-field rounded-lg"
                        v-model="userData.name"
                        variant="outlined"
                        :label="getFormFields.nameField.label"
                        density="compact"
                        :placeholder="getFormFields.nameField.placeholder"
                        :rules="getRules(getFormFields.nameField.rules)"
                    ></v-text-field>
                    <v-text-field
                        v-if="getFormFields.surnameField.display"
                        class="pb-text-field"
                        v-model="userData.surname"
                        variant="outlined"
                        :label="getFormFields.surnameField.label"
                        density="compact"
                        :placeholder="getFormFields.surnameField.placeholder"
                        :rules="getRules(getFormFields.surnameField.rules)"
                    ></v-text-field>
                    <v-text-field
                        v-if="getFormFields.middleName.display"
                        class="pb-text-field"
                        v-model="userData.middle_name"
                        variant="outlined"
                        :label="getFormFields.middleName.label"
                        density="compact"
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
                        density="compact"
                        :placeholder="getFormFields.birthDate.placeholder"
                        :rules="getRules(getFormFields.birthDate.rules)"
                    ></v-text-field>
                    <v-text-field
                        v-if="getFormFields.email.display"
                        class="pb-text-field"
                        v-model="userData.email"
                        variant="outlined"
                        :label="getFormFields.email.label"
                        density="compact"
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
                        density="compact"
                        :rules="getRules(getFormFields.city.rules)"
                    ></v-select>
                    <v-checkbox color="deep-purple-accent-4">
                        <template v-slot:label>
                            <a
                                href="https://vuetifyjs.com"
                                target="_blank"
                                @click.stop
                            >
                                Хочу получать реклманые сообщения
                            </a>
                        </template>
                    </v-checkbox>
                    <VBtn
                        class="mt-2"
                        block
                        size="large"
                        variant="flat"
                        type="submit"
                        :loading="loading"
                        @click="sendForm"
                        text="Далее"
                    ></VBtn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
    
    <div v-else>


    <v-container 
        class="h-100 d-flex flex-column justify-center"
    >   
        <div
            v-if="!showImportantDates"
        >
            <v-row>
                <v-col class="v-col-12 align-center">
                    <v-row>
                        <v-col>
                            <p>Заполните даты важных событий или дни рождения близких людей, и перед праздником мы пришлем вам напоминание и подарок.</p>
                        </v-col>
                    </v-row>
                    <v-row>
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
                    </v-row>
                </v-col>
            </v-row>
        </div>
        <div
            v-else
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
                        v-model="importantDates[`child${n}_name`[fieldsCount]]"
                        variant="outlined"
                        label="Название"
                        density="compact"
                        placeholder="Название даты или имя близкого"
                        :rules="getRules(getFormFields.nameField.rules)"
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
                </v-card>
                <v-row>
                    <v-col class="v-col-6">
                        <VBtn
                            class="mt-2 pb-primary-bt"
                            size="large"
                            variant="flat"
                            @click="removeField(fieldsCount)"
                            text="Удалить дату"
                            :disabled="isMinFieldsCount"
                        ></VBtn>
                    </v-col>
                    <v-col class="v-col-6">
                        <VBtn
                            class="mt-2 pb-primary-bt"
                            size="large"
                            variant="flat"
                            @click="addField"
                            text="Добавить дату"
                            :disabled="isMaxFieldsCount"
                        ></VBtn>
                    </v-col>
                </v-row>                               
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
        </div>
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
        personaldataSend: true,
        showImportantDates: true,
        userData: {},
        importantDates: {},
        fieldsCount: 1
    }),
    methods: {
        ...mapActions({
            defineUser: 'userData/defineUser',
            registrationUser: 'userData/registrationUser',
            updateUserData: 'userData/updateUserData'
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
            getBotId: 'userData/getBotId'
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
    }
}
</script>
<style>
    .pb-text-field .v-field--variant-outlined {
        border-radius: 1rem;
    }
</style>