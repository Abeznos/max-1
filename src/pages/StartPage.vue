<template>
    <v-container class="h-100">
        <v-row class="ma-0 align-center flex-nowrap w-100">
            <v-col class="v-col-2 pa-0">
                <v-avatar
                    size="36px"
                >
                    <v-img
                        v-if="avatar"
                        alt="Avatar"
                        src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                    ></v-img>
                    <v-icon
                        v-else
                        color="#000000"
                        icon="$account"
                    ></v-icon>
                </v-avatar>
            </v-col>
            <v-col class="v-col-4 pa-0">
                {{ getUserPersData.name }}
            </v-col>
            <v-col
                class="v-col-6 pa-0 text-right">
                {{ getUserPersData.group_name }}
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-4">
            <v-col
                class="v-col-12 pa-0"
            >
                <v-card
                    subtitle="Баланс"
                    :text="getUserPersData.balance"
                    variant="tonal"
                    height="150"
                >
                </v-card>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-4 pa-0">
            <v-col class="text-left pa-0">
                Код покупателя
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-2 flex-nowrap w-100 ga-4">
            <v-col class="v-col pa-0 pe-4">
                <v-card
                    class="order-code"
                    :text="getUserPersData.order_code"
                    variant="tonal"
                    height="80"
                ></v-card>
            </v-col>
            <v-col class="col order-code pa-0">
                <v-dialog
                    v-model="qrDialog"
                    transition="dialog-bottom-transition"
                >
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-card
                            class="order-code d-flex justify-center align-center"
                            variant="tonal"
                            height="80"
                            width="80"
                        >
                            <v-btn
                                class="qr-button"
                                icon="$qr"
                                size="large"
                                variant="flat"
                                color="#000000"
                                v-bind="activatorProps"
                            ></v-btn>
                        </v-card>
                    </template>
                    <v-card class="order-code">
                        <v-card>
                            <v-col v-html="getUserPersData.qr"/>
                            <template v-slot:actions>
                                <v-btn
                                    class="ms-auto"
                                    text="Закрыть"
                                    block
                                    size="large"
                                    variant="flat"
                                    color="deep-purple-accent-4"
                                    @click="qrDialog = false"
                                ></v-btn>
                            </template>
                        </v-card>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-4 flex-nowrap w-100 ga-4">
            <v-col class="pa-0">
                Акции
            </v-col>
            <v-col class="pa-0 text-right promotion-link">
                <RouterLink to="/promotion">Ещё</RouterLink>
            </v-col>
        </v-row>
        <v-slide-group class="mt-2">
            <v-slide-group-item
                v-for="n in 4"
                :key="n"
            >
                <v-card
                    class="mr-4"
                    subtitle="Баланс"
                    :text="getUserBalance"
                    variant="tonal"
                    width="320"
                    height="180"
                >
                </v-card>
            </v-slide-group-item>
        </v-slide-group>
        <v-dialog
            v-model="mlmDialog"
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ props: activatorProps }">
                <v-row class="ma-0 mt-6 flex-nowrap w-100">
                    <v-col class="pa-0">
                        <v-card
                            class="order-code d-flex justify-center align-center"
                            variant="tonal"
                        >
                            <v-btn
                                class="qr-button"
                                size="large"
                                variant="flat"
                                color="deep-purple-accent-4"
                                block
                                height="56"
                                v-bind="activatorProps"
                            >
                                Пригласить друга
                            </v-btn>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
            <v-card class="mlm-code pa-8">
                {{ getUserFromTg }}
                {{ initData }}
                {{ getChatInstance }}
            </v-card>
        </v-dialog>

    </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'MainPage',
    data: () => ({
        loading: false,
        avatar: false,
        qrDialog: false,
        mlmDialog: false
    }),
    methods: {

    },
    computed: {
        ...mapGetters({
            getUserFromTg: 'tgData/getUserFromTg',
            getUserBalance: 'userData/getUserBalance',
            getOrderCode: 'userData/getOrderCode',
            getUserChatId: 'userData/getUserChatId',
            getUserChatId: 'userData/geBotId',
            getLoading: 'appState/getLoading',
            getUserPersData: 'userData/getUserPersData',
            initData: 'tgData/initData',
            getChatInstance: 'tgData/getChatInstance'
        }),
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