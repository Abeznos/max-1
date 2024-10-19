<template>
    <v-sheet
        color="var(--primary-color)"
    >
        <p>Bot ID</p>
        {{ botId }}
        <p>chat ID</p>
        <p>{{ getUserChatId }}</p>
        <p>tg initData unsafe</p>
        <p>{{ tg.initDataUnsafe?.user }}</p>
    </v-sheet>
    <VBtn> Тестовая кнопка </VBtn>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {tgService} from '@/services/tgService.js'

export default {
    name: 'MainPage',
    data: () => ({
        botId: '',
        tg: window.Telegram.WebApp,
        //loading: false,
        //avatar: false,
        //qrDialog: false,
        //mlmDialog: false
    }),
    methods: {
        ...mapActions ({
            setChatId: 'userData/setChatId'
        })
    },
    computed: {
        ...mapGetters ({
            getUserChatId: 'userData/getUserChatId'
        })
    },
    beforeMount() {
        const { user } = tgService()
        this.setChatId(user)
        this.botId = this.$route.params.id
    }
}
</script>
<style>
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
        text-align: center;
    }

    .v-card-text {
        font-size: 3.5rem;
        text-align: center;
    }

    .v-col.order-code {
        max-width: 5rem!important;
    }

    .v-card.order-code {
        border-radius: 1rem !important;
    }

    .order-code .v-card-text {
        font-size: 2.5rem;
        line-height: 1.25;
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
</style>