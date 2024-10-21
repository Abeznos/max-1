<template>
    <v-layout
        class="alert w-100 h-100"
    >
        <v-col class="v-col-12 d-flex flex-column align-center justify-center">
            <v-card class="pb-alert-card pa-4">
                <v-card-text>
                    <p>Вы не являетесь участником программы лояльности {{ getBrand }}.</p>
                    <p>Хотите оформить карту?</p>
                </v-card-text>
                <v-card-actions class="d-flex flex-column align-center justify-center">
                    <VBtn
                        block
                        text="Оформить"
                        @click="$router.push(`registration/${getBotId}`)"
                    ></VBtn>
                    <VBtnOutline
                        class="pb-text-bt"
                        block
                        @click=""
                        text="Не сейчас"
                    ></VBtnOutline>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-layout>
</template>
<script>
import {tgService} from '@/services/tgService.js'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'NotPbUserAlert',
    methods: {
        closeApp() {
            const { closeApp } = tgService()
            closeApp()
        },
        requestContact() {
            this.loading = !this.loading
            const { requestContact } = tgService()
            //requestContact()

            setTimeout(() => (location.reload()), 3000)
        }
    },
    computed: {
        ...mapGetters({
            getBrand: 'appState/getBrand',
            getBotId: 'userData/getBotId',
        })
    }
}
</script>
<style>

</style>