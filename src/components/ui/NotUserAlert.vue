<template>
    <v-layout
        class="alert w-100 h-100"
    >
        <v-col class="v-col-12 d-flex flex-column align-center justify-center">
            <v-card class="pb-alert-card pa-4">
                <v-card-text>
                    <p>Для корректной работы бота, поделитесь своим номером телефона</p>
                </v-card-text>
                <v-card-actions class="d-flex flex-column align-center justify-center">
                    <VBtn
                        :loading="loading"
                        block
                        @click="requestContact"
                    >
                        Поделиться контактом
                    </VBtn>
                    <VBtn
                        block
                        @click="closeApp"
                    >
                        Закрыть
                    </VBtn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-layout>
</template>
<script>
import {tgService} from '@/services/tgService.js'

export default {
    name: 'NotUserAlert',
    methods: {
        ...mapActions ({
            login: 'userData/login'
        }),
        closeApp() {
            const { closeApp } = tgService()
            closeApp()
        },
        requestContact() {
            this.loading = !this.loading
            const { requestContact } = tgService()
            //requestContact()

            setTimeout(() => (this.login), 3000)
        }
    }
}
</script>
<style>

</style>