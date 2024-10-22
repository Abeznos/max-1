<template>
    <v-container>

    </v-container>
</template>
<script>
export default {
    name: 'PromotionPage'
}
</script>
<style>

</style>

    <!--
    <v-container class="pb-12 h-100">
        <v-row class="ma-0 align-center w-100">
            <v-col class="v-col-4 pa-0">
                <router-link :to="`registration/${getBotId}`" class="pb-nav-link">                -
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
        <v-row
            v-if="actions"
            class="ma-0 mt-4 pa-0"
        >
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
                <VBtnOutline class="pb-text-bt" block @click="openLink('https://yandex.ru/maps/213/moscow/chain/prostocvety/1893418102/filter/chain_id/1893418102/?ll=37.810359%2C55.756413&sctx=ZAAAAAgBEAAaKAoSCTmc%2BdUctkJAEa98lufB20tAEhIJOZojK78M1T8ROCwN%2FKiGuT8iBgABAgMEBSgKOABA1QFIAWIecmVsZXZfc2VydmljZV9hcmVhX3BlcmNlbnQ9MTAwagJydZ0BzcxMPaABAKgBAL0BnEuBScIBggGTpOTeBYf%2F8YbxAuOnkPvnApuj0asGsLmU2QSl7dfWBrWDx78Gh9Xs7QOou4rlsQO07MPoA7639bQGoODvxxym3tDMBN3W5KEFkbzG3Abm%2Fp7ZBLSQ84rmBtPi6JYFhp71hQSGufflJMn889wEm9y1zwT5%2FcCsRa%2FdmqO0A661vP8DggIZKChjaGFpbl9pZDooMTg5MzQxODEwMikpKYoCAJICAJoCDGRlc2t0b3AtbWFwc6oC8QExODkzNDE4MTAyLDE5ODc5MTYyMzE2Myw5MjIyNTExMDMxMSwxOTExOTU4OTk1ODAsMjYwMzQ4NTE5MiwxNTY4OTMwOTEyNzksMzg0MjMyMDAyMDAsMzQwMDM3NDU3NiwxNzA3NzUwOTAxNDksMzQ1Nzc3MjE1OTcsNzIwODY4NDU2NzMsMzc2Njg4NTMxMTgsMTM5MjIyOTk4NzgsMjMyNzk3ODM3MjgsMzExNzQwNTIzNTIsMzkwMjg3NjMyOTAsNTA1MzQ5MDY4MjMsMzUyOTA4NjM2NjIsMjIwOTg5MDgzMDUwLDU5OTU3MzIyMDU4sAIB&sll=37.810359%2C55.756413&source=serp_navig&sspn=1.279637%2C0.387543&z=11')">
                    Адреса
                </VBtnOutline>
            </v-col>
        </v-row>
        <v-row class="ma-0 mt-4 pa-0">
            <v-col class="text-left pa-0">
                <router-link :to="`loyalty-terms/${getBotId}`" class="pb-nav-link">
                    <VBtnOutline class="pb-text-bt" block>
                        Условия программы лояльности
                    </VBtnOutline>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
    -->