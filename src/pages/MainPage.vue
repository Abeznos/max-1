<template>
    <UserStartScreen v-if="getUserPersData?.is_registered"/>
    <NotUserStartScreen v-else/>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import NotUserAlert from '@/components/ui/NotUserAlert.vue'
import NotPbUserAlert from '@/components/ui/NotPbUserAlert.vue'
import UserStartScreen from '@/components/mainPage/UserStartScreen.vue'
import NotUserStartScreen from '@/components/mainPage/NotUserStartScreen.vue'

import {tgService} from '@/services/tgService.js'
const { openLink, mainBtn, backButton } = tgService()

export default {
    name: 'MainPage',
    components: {NotUserAlert, NotPbUserAlert, UserStartScreen, NotUserStartScreen},
    data: () => ({
        loading: false,
        botId: '',
        qrDialog: false,
        mlmDialog: false
    }),
    methods: {
        ...mapActions ({
            defineUser: 'userData/defineUser',
            login: 'userData/login',
            backBtnToggle: 'appState/backBtnToggle',
            loadingToggle: 'appState/loadingToggle'
        })
    },
    computed: {
        ...mapGetters ({
            getLoading: 'appState/getLoading',
            getBotId: 'userData/getBotId',
            getUserChatId: 'userData/getUserChatId',
            getUserPersData: 'userData/getUserPersData',
            getBackBtn: 'appState/getBackBtn',
            getColors: 'appState/getColors',
            getBotUserAlert: 'appState/getBotUserAlert',
            getPbUserAlert: 'appState/getPbUserAlert'

        })
    },
    beforeMount() {
        //const {user, setBackgroundColor, disableVerticalSwipes, setHeaderColor, backButton, mainBtn} = tgService()
        //const botId = this.$route.params.id
        //const chatId = user?.id || '000011' //Не забыть удалить тестовый chatId
        //this.defineUser({chatId, botId})

        //this.login()

        //setBackgroundColor(this.getColors.surface)
        //setHeaderColor(this.getColors.primary)
        //disableVerticalSwipes()

        if(backButton.isVisible) {
            backButton.hide()
        }
    }
}
</script>
<style>
    .pb-user-card {
        background-color: var(--secondary-color);
    }

    .v-card {
        border-radius: 1rem;
    }

    .v-card-item {
        padding: 1rem 1rem 0rem;
    }

    .v-card-item .v-card-subtitle {
        padding: .5rem 0 0 0
    }

    .v-card-subtitle {
        font-size: 1rem;
        text-align: left;
    }

    .v-card-text {
        font-size: 2.5rem;
        text-align: left;
    }

    .v-col.order-code {
        max-width: 5rem!important;
    }

    .v-card.order-code {
        border-radius: 1rem !important;
    }

    .order-code .v-card-text {
        font-size: 2.5rem;
        line-height: 1.15;
        text-align: center;
    }

    .qr-button i.v-icon {
        width: 2rem;
        height: 2rem;
    }

    .promotion-link a {
        text-decoration: none!important;
        text-transform: unset!important;
        color: #3F51B5;
        font-weight: 500;
    }

    .pb-action-card .v-card-text {
        font-size: 1rem;
        font-weight: 500;
    }

    .v-card-actions > div {
        font-weight: 500;
        color: #fff;
    }


</style>