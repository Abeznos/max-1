<template>
    <div>
        <div>Регистрация</div>
        <div>{{ getUserFromTg }}</div>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'RegistrationPage',
    data: () => ({
    }),
    computed: {
        ...mapGetters({
            getUserFromTg: 'tgData/getUserFromTg',
            getUserBalance: 'userData/getUserBalance',
            getOrderCode: 'userData/getOrderCode',
            getUserChatId: 'userData/getUserChatId'
        }),
    }
}
</script>
<style>

</style>