<template>
    <v-container class="w-100 pa-0 d-flex flex-column justify-start ga-6">
        <v-row class="ma-0 align-center w-100">
            <v-col class="v-col-4 pa-0">
                <router-link :to="`account/${getBotId}`" class="pb-nav-link">
                    <v-row class="ma-0 align-center flex-nowrap">
                        <v-col class="pa-0">
                            <v-avatar size="36px">
                                <v-img
                                    v-if="avatar"
                                    alt="Avatar"
                                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                                ></v-img>
                                <v-icon
                                    v-else
                                    color="var(--on-surface-color)"
                                    icon="$account"
                                ></v-icon>
                            </v-avatar>
                        </v-col>
                        <v-col class="v-col-8 pa-0">
                            {{ getUserPersData?.name }}
                        </v-col>
                    </v-row>
                </router-link>
            </v-col>
            <v-col class="v-col pa-0 text-right">
                {{ getUserPersData?.group_name }}
            </v-col>
        </v-row>
        <v-card
            class="pb-user-card"
            subtitle="Баланс"
            :text="aggregateBalance"
            variant="flat"
            height="120"
        ></v-card>
        <v-row class="ma-0 pa-0">
            <v-col class="text-left pa-0">
                <div>Код покупателя</div>
                <v-row class="ma-0 mt-2 pa-0">
                    <v-col class="pa-0 pe-4">
                        <v-card
                            class="order-code pb-user-card"
                            :text="getUserPersData?.order_code"
                            height="80"
                            variant="flat"
                        ></v-card>
                    </v-col>
                    <v-col class="col order-code pa-0">
                        <v-dialog
                            v-model="qrDialog"
                            transition="dialog-bottom-transition"
                        >
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-card
                                    class="pb-user-card order-code d-flex justify-center align-center"
                                    height="80"
                                    width="80"
                                    variant="flat"
                                >
                                    <v-btn
                                        class="qr-button pb-primary-btn"
                                        icon="$qr"
                                        size="large"
                                        variant="flat"
                                        v-bind="activatorProps"
                                    ></v-btn>
                                </v-card>
                            </template>
                            <v-card class="order-code">
                                <v-card>
                                    <v-col v-html="getUserPersData?.qr"/>
                                    <template v-slot:actions>
                                        <v-btn
                                            class="ms-auto"
                                            text="Закрыть"
                                            block
                                            size="large"
                                            variant="flat"
                                            color="var(--primary-color)"
                                            @click="qrDialog = false"
                                        ></v-btn>
                                    </template>
                                </v-card>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-card
            class="pb-user-card pb-action-card d-flex align-end"
            height="150"
            variant="flat"
            image="https://popup-data.storage.yandexcloud.net/0-uploads/3d5ba7f8a61405db07d5184ad05581bde406d3f6.jpg"
            @click="openLink('https://www.prostocvet.ru/')"
        >
            <!--
            <v-card-actions class="pa-4">
                <div>Заказать доставку</div>
            </v-card-actions>
            -->
        </v-card>
        <div class="pb-button-group d-flex flex-column ga-4">
            <VBtnOutline
                class="pb-text-bt"
                block
                @click="openLink('https://yandex.ru/maps/213/moscow/chain/prostocvety/1893418102/filter/chain_id/1893418102/?ll=37.810359%2C55.756413&sctx=ZAAAAAgBEAAaKAoSCTmc%2BdUctkJAEa98lufB20tAEhIJOZojK78M1T8ROCwN%2FKiGuT8iBgABAgMEBSgKOABA1QFIAWIecmVsZXZfc2VydmljZV9hcmVhX3BlcmNlbnQ9MTAwagJydZ0BzcxMPaABAKgBAL0BnEuBScIBggGTpOTeBYf%2F8YbxAuOnkPvnApuj0asGsLmU2QSl7dfWBrWDx78Gh9Xs7QOou4rlsQO07MPoA7639bQGoODvxxym3tDMBN3W5KEFkbzG3Abm%2Fp7ZBLSQ84rmBtPi6JYFhp71hQSGufflJMn889wEm9y1zwT5%2FcCsRa%2FdmqO0A661vP8DggIZKChjaGFpbl9pZDooMTg5MzQxODEwMikpKYoCAJICAJoCDGRlc2t0b3AtbWFwc6oC8QExODkzNDE4MTAyLDE5ODc5MTYyMzE2Myw5MjIyNTExMDMxMSwxOTExOTU4OTk1ODAsMjYwMzQ4NTE5MiwxNTY4OTMwOTEyNzksMzg0MjMyMDAyMDAsMzQwMDM3NDU3NiwxNzA3NzUwOTAxNDksMzQ1Nzc3MjE1OTcsNzIwODY4NDU2NzMsMzc2Njg4NTMxMTgsMTM5MjIyOTk4NzgsMjMyNzk3ODM3MjgsMzExNzQwNTIzNTIsMzkwMjg3NjMyOTAsNTA1MzQ5MDY4MjMsMzUyOTA4NjM2NjIsMjIwOTg5MDgzMDUwLDU5OTU3MzIyMDU4sAIB&sll=37.810359%2C55.756413&source=serp_navig&sspn=1.279637%2C0.387543&z=11')"
                text="Адреса"
            ></VBtnOutline>
            <router-link :to="`loyalty-terms/${getBotId}`" class="pb-nav-link">
                <VBtnOutline
                    class="pb-text-bt"
                    block
                    text="Условия программы лояльности"
                ></VBtnOutline>
            </router-link>
            <a class="pb-link" href="https://t.me/Prostocvetbot">
                <VBtnOutline
                    class="pb-text-bt"
                    block
                    text="Чат с менеджером"
                ></VBtnOutline>
            </a>
        </div>
    </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {tgService} from '@/services/tgService.js'

export default {
    name: 'UserStartScreen',
    data: () => ({
        loading: false,
        botId: '',
        //avatar: false,
        qrDialog: false,
        //mlmDialog: false,
        baseUrl: import.meta.env.VITE_CLIENT_URL
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
        aggregateBalance() {
            const { balance_bonus_present, balance_bonus_action, balance_bonus_accumulated } = this.getUserPersData

            return parseFloat(balance_bonus_present) + parseFloat(balance_bonus_action) + parseFloat(balance_bonus_accumulated)
        }
    }
}
</script>
<style>
    .pb-link {
        text-decoration: none;
    }

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

    .qr-button {
        width: 5rem !important;
        height: 5rem !important;
    }

    .qr-button i.v-icon {
        width: 3rem !important;
        height: 3rem !important;
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