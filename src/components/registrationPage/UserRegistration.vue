<template>
    <v-container class="w-100 pa-0 d-flex flex-column justify-start ga-6">
        <h2 class="pb-6 pt-6 text-center">Анкета регистрации</h2>
            <v-form class="w-100" validate-on="submit" ref="form" @submit.prevent>
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

                <v-btn
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
        }),

        async sendForm() {
            const response = await this.registrationUser({ref: this.$refs.form, data: this.userData})
            mainBtn.hide()
            this.personaldataSend = true
        },        
    },
    computed: {
        ...mapGetters({
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules',
        }),
    },
    beforeMount() {
        setBottomBarColor(this.getColors.surface)
        mainBtn.show()
        mainBtn.color = this.getColors.primary
        mainBtn.setText('Далее')
        mainBtn.textColor = '#ffffff'
        mainBtn.onClick( () => this.sendForm() )
    }
}
</script>
<style>
    
</style>