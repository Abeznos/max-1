<template>
        <v-row align="center">
            <v-col
                cols="2"
                md="2"
                sm="2"
            >
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
            <v-col
                cols="4"
                md="4"
                sm="4"
            >
                Иван
            </v-col>
            <v-col
                cols="6"
                md="6"
                sm="6"
            >
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
        <v-row class="mt-4">
            <v-col class="text-left">
                Код покупателя
            </v-col>
        </v-row>
        <v-row class="mt-4">
            <v-col>
                <v-card
                    class="order-code"
                    :text="getOrderCode"
                    variant="tonal"
                    height="80"                    
                ></v-card>
            </v-col>
            <v-col cols="4">
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
        <v-row class="mt-4">
            <v-col cols="6" md="6">
                Акции
            </v-col>
            <v-col cols="6" md="6" class="text-right">
                Ещё
            </v-col>
        </v-row>
        <v-slide-group>
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
            <v-btn 
                block
                prepend-icon="$vuetify"
                variant="flat"
                color="#ffffff"
                height="56"
            >
                Пригласить друга
            </v-btn>
        </v-row>
        <v-layout class="overflow-visible" style="height: 56px;">
<v-bottom-navigation
    v-model="value"
    color="primary"
    active
>
    <v-btn>
        <v-icon>mdi-history</v-icon>

        Recents
    </v-btn>

    <v-btn>
        <v-icon>mdi-heart</v-icon>

        Favorites
    </v-btn>

    <v-btn>
        <v-icon>mdi-map-marker</v-icon>

        <span>Nearby</span>
    </v-btn>
</v-bottom-navigation>         
        </v-layout>
  </template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

let tg = window.Telegram.WebApp

export default {
    name: 'MainPage',
    data: () => ({
        loading: false,
        avatar: true
    }),
    computed: {
        ...mapGetters({
            getUserFromTg: 'tgData/getUserFromTg',
            tgInitData: 'tgData/tgInitData',
            getUserBalance: 'userData/getUserBalance',
            getOrderCode: 'userData/getOrderCode'
        }),

        getUrlParams() {
            const pageUrl = new URL(window.location.href)
            console.log(pageUrl)
            return pageUrl
        }
    },

    beforeCreate() {
        const pageUrl = new URL(window.location.href)
    },
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

    .order-code .v-card-text {
        font-size: 2.5rem;
        text-align: center;
    }
</style>