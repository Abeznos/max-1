<template>
<input type="text" class="w-100 border-sm">
<input type="text" class="w-100 border-sm">
<input type="text" class="w-100 border-sm">
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