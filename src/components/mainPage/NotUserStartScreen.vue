<template>
    <v-container class="w-100 h-100 pa-0 d-flex flex-column align-center justify-center ga-8">
        <v-card
            class="pb-user-card pb-action-card d-flex align-end w-100"
            height="150"
            variant="flat"
            :image="`${publicPath}/img/banners/${getBotId}.png`"
        >
        </v-card>
        <div class="pb-button-group d-flex flex-column ga-4 w-100">
            <VBtnOutline
                class="pb-text-bt"
                height="44"
                block
                @click="openLink('https://yandex.ru/maps/213/moscow/chain/prostocvety/1893418102/filter/chain_id/1893418102/?ll=37.810359%2C55.756413&sctx=ZAAAAAgBEAAaKAoSCTmc%2BdUctkJAEa98lufB20tAEhIJOZojK78M1T8ROCwN%2FKiGuT8iBgABAgMEBSgKOABA1QFIAWIecmVsZXZfc2VydmljZV9hcmVhX3BlcmNlbnQ9MTAwagJydZ0BzcxMPaABAKgBAL0BnEuBScIBggGTpOTeBYf%2F8YbxAuOnkPvnApuj0asGsLmU2QSl7dfWBrWDx78Gh9Xs7QOou4rlsQO07MPoA7639bQGoODvxxym3tDMBN3W5KEFkbzG3Abm%2Fp7ZBLSQ84rmBtPi6JYFhp71hQSGufflJMn889wEm9y1zwT5%2FcCsRa%2FdmqO0A661vP8DggIZKChjaGFpbl9pZDooMTg5MzQxODEwMikpKYoCAJICAJoCDGRlc2t0b3AtbWFwc6oC8QExODkzNDE4MTAyLDE5ODc5MTYyMzE2Myw5MjIyNTExMDMxMSwxOTExOTU4OTk1ODAsMjYwMzQ4NTE5MiwxNTY4OTMwOTEyNzksMzg0MjMyMDAyMDAsMzQwMDM3NDU3NiwxNzA3NzUwOTAxNDksMzQ1Nzc3MjE1OTcsNzIwODY4NDU2NzMsMzc2Njg4NTMxMTgsMTM5MjIyOTk4NzgsMjMyNzk3ODM3MjgsMzExNzQwNTIzNTIsMzkwMjg3NjMyOTAsNTA1MzQ5MDY4MjMsMzUyOTA4NjM2NjIsMjIwOTg5MDgzMDUwLDU5OTU3MzIyMDU4sAIB&sll=37.810359%2C55.756413&source=serp_navig&sspn=1.279637%2C0.387543&z=11')"
                text="Адреса"
            ></VBtnOutline>
            <router-link :to="`loyalty-terms/${getBotId}`" class="pb-nav-link">
                <VBtnOutline
                    class="pb-text-bt"
                    height="44"
                    block
                    text="Условия программы лояльности"
                ></VBtnOutline>
            </router-link>
            <router-link :to="`registration/${getBotId}`" class="pb-nav-link">
                <VBtn
                    class="pb-primary-bt"
                    height="44"
                    block
                    text="Зарегистрироваться"
                ></VBtn>
            </router-link>
        </div>
    </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {tgService} from '@/services/tgService.js'

export default {
    name: 'NotUserStartScreen',
    data: () => ({
        loading: false,
        botId: '',
        publicPath: import.meta.env.VITE_CLIENT_URL
    }),
    methods: {
        ...mapActions ({
            defineUser: 'userData/defineUser',
            login: 'userData/login',
            backBtnToggle: 'appState/backBtnToggle'
        }),
        openLink(url) {
            const { openLink } = tgService()
            openLink(url)
        }
    },
    computed: {
        ...mapGetters ({
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

    .alert {
        position: fixed;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        left: 0;
        top: 0;
        background-color: var(--surface-color);
        z-index: 999;
    }

    .alert .v-card {
        background-color: var(--secondary-color);
    }

    .alert .v-card-text {
        font-size: 1.15rem;
    }
</style>