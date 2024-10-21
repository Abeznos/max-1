<template>
    <v-container class="h-100">
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
                                    color="#000000"
                                    icon="$account"
                                ></v-icon>                    
                            </v-avatar>
                        </v-col>
                        <v-col class="v-col-8 pa-0">
                            {{ getUserPersData.name }}
                        </v-col>
                    </v-row>
                </router-link>
            </v-col>
            <v-col
                class="v-col pa-0 text-right">
                {{ getUserPersData.group_name }}
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-4">
            <v-col
                class="v-col-12 pa-0"
            >
                <v-card
                    class="pb-user-card"
                    subtitle="Баланс"
                    :text="getUserPersData.balance"
                    variant="flat"
                    height="120"
                >
                </v-card>
            </v-col>            
        </v-row>
        <v-row class="ma-0 mt-4 pa-0">
            <v-col class="text-left pa-0">
                <div>Код покупателя</div>
                <v-row class="ma-0 mt-2 pa-0">
                    <v-col class="pa-0 pe-4">
                        <v-card
                            class="order-code pb-user-card"
                            :text="getUserPersData.order_code"
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
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-4 pa-0">
            <v-col class="text-left pa-0">
                <div>Действия</div>
                <v-row class="ma-0 mt-2 pa-0">      
                    <v-col class="v-col-6 pa-0 pe-2 w-100">
                        <v-card class="pb-user-card pb-action-card" height="80" variant="flat">
                            <v-card-text>
                                <v-row class="align-center flex-nowrap">
                                    <v-col class="v-cols-2">
                                        <v-icon icon="$account" size="24px"></v-icon>
                                    </v-col>
                                    <v-col class="v-cols-10">Подарить бонусы</v-col>
                                </v-row>
                                
                            </v-card-text>                         
                        </v-card>
                    </v-col>
                    <v-col class="v-col-6 pa-0 ps-2">
                        <v-card class="pb-user-card pb-action-card" height="80" variant="flat">
                            <v-card-text>
                                <v-row class="align-center flex-nowrap">
                                    <v-col class="v-cols-2">
                                        <v-icon icon="$account" size="24px"></v-icon>
                                    </v-col>
                                    <v-col class="v-cols-10">Пригласить друга</v-col>
                                </v-row>
                            </v-card-text>                         
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-4 pa-0">
            <v-col class="text-left pa-0">
                <v-card
                    class="pb-user-card pb-action-card d-flex align-end" 
                    height="150" 
                    variant="flat"
                    image="https://www.prostocvet.ru/upload/iblock/67e/ws7tjn7iehef8ufxlzwpgg3czl5leumm.jpg"
                    @click="openLink('https://www.prostocvet.ru/')"
                >
                    <v-card-actions class="pa-4">
                        <div>Заказать доставку</div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-4 pa-0">
            <v-col class="text-left pa-0">
                <VBtnOutline class="pb-text-bt" block>
                    Условия программы лояльности
                </VBtnOutline>                
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {tgService} from '@/services/tgService.js'

export default {
    name: 'MainPage',
    data: () => ({
        botId: '',
        //loading: false,
        //avatar: false,
        qrDialog: false,
        //mlmDialog: false
    }),
    methods: {
        ...mapActions ({
            defineUser: 'userData/defineUser',
            login: 'userData/login'
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
            getUserPersData: 'userData/getUserPersData'
        })
    },
    beforeMount() {
        const { user } = tgService()
        const bot = this.$route.params.id
        //this.defineUser({chatId: user?.id, botId: bot})
        this.defineUser({chatId: '268451766', botId: bot})

        if(this.getBotId && this.getUserChatId) {
            this.login()
        }
        //const { user } = tgService()
        //this.setChatId(user?.id)
        //this.botId = this.$route.params.id
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

    .pb-action-card .v-card-text {
        font-size: 1rem;
        font-weight: 500;
    }

    .v-card-actions > div {
        font-weight: 500;
        color: #fff;
    }
</style>