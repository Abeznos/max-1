<template>
    <v-container class="h-100">
        <v-row
            v-if="!personaldataSend"
        >
            <v-col class="v-col-12 d-flex flex-column justify-center align-center">
                <h2 class="pb-6">Анкета регистрации</h2>
                <v-form class="w-100" validate-on="submit lazy" ref="form" @submit.prevent>
                    <v-text-field
                        v-if="getFormFields.nameField.display"
                        class="pb-text-field rounded-lg"
                        v-model="userData.name"
                        variant="outlined"
                        :label="getFormFields.nameField.label"
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
                        :placeholder="getFormFields.birthDate.placeholder"
                        :rules="getRules(getFormFields.birthDate.rules)"
                    ></v-text-field>
                    <v-text-field
                        v-if="getFormFields.email.display"
                        class="pb-text-field"
                        v-model="userData.email"
                        variant="outlined"
                        :label="getFormFields.email.label"
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
                    >
                        Далее
                    </VBtn>
                </v-form>
            </v-col>
        </v-row>
        <v-row
            v-if="personaldataSend"
            class="h-100"
        >

        </v-row>
    </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {tgService} from '@/services/tgService.js'

export default {
    name: 'RegistrationPage',
    data: () => ({
        loading: false,
        personaldataSend: false,
        userData: {}
    }),
    methods: {
        ...mapActions({
            defineUser: 'userData/defineUser',
            registrationUser: 'userData/registrationUser'
        }),
        async sendForm() {
            this.loading = !this.loading
            const response = await this.registrationUser({ref: this.$refs.form, data: this.userData})
            if (response) {
                setTimeout(() => (this.loading = !this.loading), 2000)
                setTimeout(() => (this.personaldataSend = true), 2000)

            } else {
                this.loading = !this.loading
            }
        }
    },
    computed: {
        ...mapGetters({
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules'
        }),
    },
    beforeMount() {
        const { user } = tgService()
        const bot = this.$route.params.id
        this.defineUser({chatId: user?.id, botId: bot})
        //this.defineUser({chatId: '268451766', botId: bot})
    }
}
</script>
<style>
    .pb-text-field .v-field--variant-outlined {
        border-radius: 1rem;
    }
</style>