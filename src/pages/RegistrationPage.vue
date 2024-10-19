<template>
    <v-container>
        <v-row
            v-if="!personaldataSend"
            class="h-100"
        >
            <v-col class="v-col-12 d-flex flex-column justify-center align-center">
                <v-form class="w-100">
                    <v-text-field
                        v-if="getFormFields.nameField.display"
                        class="pb-text-field rounded-lg"
                        v-model="userData.name"
                        variant="outlined"
                        :label="getFormFields.nameField.label"
                        :placeholder="getFormFields.nameField.placeholder"
                    ></v-text-field>
                    <v-text-field
                        v-if="getFormFields.surnameField.display"
                        class="pb-text-field"
                        v-model="userData.surname"
                        variant="outlined"
                        :label="getFormFields.surnameField.label"
                        :placeholder="getFormFields.surnameField.placeholder"
                    ></v-text-field>
                    <v-text-field
                        v-if="getFormFields.middleName.display"
                        class="pb-text-field"
                        v-model="userData.middle_name"
                        variant="outlined"
                        :label="getFormFields.middleName.label"
                        :placeholder="getFormFields.middleName.placeholder"
                    ></v-text-field>
                    <v-radio-group
                        v-if="getFormFields.gender.display"
                        v-model="userData.gender"
                        inline
                    >
                        <v-radio label="Мужчина" value="male" color="deep-purple-accent-4"></v-radio>
                        <v-radio label="Женщина" value="female" color="deep-purple-accent-4"></v-radio>
                    </v-radio-group>
                    <v-text-field
                        v-if="getFormFields.birthDate.display"
                        class="pb-text-field"
                        v-model="userData.birth_date"
                        variant="outlined"
                        :label="getFormFields.birthDate.label"
                        :placeholder="getFormFields.birthDate.placeholder"
                    ></v-text-field>
                    <v-text-field
                        v-if="getFormFields.email.display"
                        class="pb-text-field"
                        v-model="userData.email"
                        variant="outlined"
                        :label="getFormFields.email.label"
                        :placeholder="getFormFields.email.placeholder"
                    ></v-text-field>
                    <v-select
                        v-if="getFormFields.city.display"
                        class="pb-text-field"
                        v-model="userData.city"
                        variant="outlined"
                        :items="getFormFields.city.items"
                        :label="getFormFields.city.label"
                    ></v-select>
                    <v-checkbox v-model="userData.advertizing" color="deep-purple-accent-4">
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
                    <v-btn
                        class="mt-2"
                        block
                        size="large"
                        variant="flat"
                        color="deep-purple-accent-4"
                        @click="registrationUser(userData)"
                    >
                        Далее
                    </v-btn>
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

export default {
    name: 'RegistrationPage',
    data: () => ({
        personaldataSend: false,
        userData: {}
    }),
    methods: {
        ...mapActions({
            registrationUser: 'userData/registrationUser'
        })
    },
    computed: {
        ...mapGetters({
            getUserFromTg: 'tgData/getUserFromTg',
            getUserBalance: 'userData/getUserBalance',
            getOrderCode: 'userData/getOrderCode',
            getUserChatId: 'userData/getUserChatId',
            geBotId: 'userData/geBotId',
            getFormFields: 'appState/getFormFields'
        }),
    }
}
</script>
<style>
    .pb-text-field .v-field--variant-outlined {
        border-radius: 1rem;
    }
</style>