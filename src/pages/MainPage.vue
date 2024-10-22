<template>
    <UserStartScreen v-if="getUserPersData"/>
    <NotUserStartScreen v-else/>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {tgService} from '@/services/tgService.js'
import NotUserAlert from '@/components/ui/NotUserAlert.vue'
import NotPbUserAlert from '@/components/ui/NotPbUserAlert.vue'
import UserStartScreen from '@/components/mainPage/UserStartScreen.vue'
import NotUserStartScreen from '@/components/mainPage/NotUserStartScreen.vue'

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
        }),
        openLink(url) {
            const { openLink } = tgService()
            openLink(url)
        }
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

        }),
        showTestText() {
            return this.testText
        }
    },
    beforeMount() {
        const {user, setBackgroundColor, disableVerticalSwipes, setHeaderColor, backButton} = tgService()
        const botId = this.$route.params.id
        const chatId = user?.id || '268451766' //Не забыть удалить тестовый chatId
        this.defineUser({chatId, botId})

        this.login()

        setBackgroundColor(this.getColors.surface)
        setHeaderColor(this.getColors.primary)
        disableVerticalSwipes()

        if(backButton.isVisible) {
            backButton.hide()
        }
    },
    mounted() {

        if(this.getBackBtn) {
            this.setBackBtn()
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