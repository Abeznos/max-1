<template>
    <UserRegistration v-if="!getRegistration.userFormSend"/>
    <ImportantDates v-if="getimportantDates"/>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import UserRegistration from '@/components/registrationPage/UserRegistration.vue'
import ImportantDates from '@/components/registrationPage/ImportantDates.vue'

import {tgService} from '@/services/tgService.js'
const { user, mainBtn, setBottomBarColor, backButton } = tgService()

export default {
    name: 'RegistrationPage',
    components: { UserRegistration, ImportantDates },
    computed: {
        ...mapGetters({
            getRegistration: 'appState/getRegistration',
            getimportantDates: 'appState/getimportantDates'
        })
    },
    beforeMount() {
        backButton.show()
        backButton.onClick( () => {
            this.$router.go(-1)
        })

    }
}
</script>
<style>
    .pb-text-field .v-field--variant-outlined {
        border-radius: 1rem;
    }
</style>