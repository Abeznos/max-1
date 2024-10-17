<template>
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
                    icon="mdi-account_circle"
                ></v-icon>
            </v-avatar>
        </v-col>
        <v-col class="v-col-4 pa-0">
            {{  }}
        </v-col>
        <v-col
            class="v-col-6 pa-0">
            Стандартная группа 10%
        </v-col>
    </v-row>
    <v-row class="ma-0 mt-4">
        <v-col cols="12" md="12" class="pa-0">
            <v-card
                subtitle="Баланс"
                :text="getUserBalance"
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
        <v-col class="pa-0">
            <v-card
                class="order-code"
                :text="getOrderCode"
                variant="tonal"
                height="80"
            ></v-card>
        </v-col>
        <v-col class="col order-code pa-0">
            <v-card
                class="order-code d-flex justify-center align-center"
                variant="tonal"
                height="80"
                width="80"
            >
                <v-btn
                    icon="mdi-qr_code_2"
                    size="large"
                    variant="flat"
                    color="#000000"
                ></v-btn>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="ma-0 mt-4 flex-nowrap w-100 ga-4">
        <v-col class="pa-0">
            Акции
        </v-col>
        <v-col class="pa-0 text-right">
            Ещё
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
    <v-row class="mt-4">
        <v-col class="text-left">
            <v-btn
                block
                prepend-icon="$vuetify"
                variant="flat"
                color="#ffffff"
                height="56"
            >
                Пригласить друга
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'MainPage',
    data: () => ({
        loading: false,
        avatar: true
    }),
    methods: {
        getUrlParams() {
            const pageUrl = new URL(window.location.href)
            return pageUrl
        }
    },
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

    .order-code .v-card-text {
        font-size: 2.5rem;
        text-align: center;
    }
</style>