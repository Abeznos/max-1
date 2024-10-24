<template>
    <UserRegistration v-if="!getRegistration.userFormSend"/>
    <ImportantDates v-if="getimportantDates"/>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import UserRegistration from '@/components/registrationPage/UserRegistration.vue'
import ImportantDates from '@/components/registrationPage/ImportantDates.vue'

export default {
    name: 'RegistrationPage',
    components: { UserRegistration, ImportantDates },
    computed: {
        ...mapGetters({
            getRegistration: 'appState/getRegistration',
            getimportantDates: 'appState/getimportantDates'
        })
    }
}
</script>
<style>
    .pb-text-field .v-field--variant-outlined {
        border-radius: 1rem;
    }
</style>