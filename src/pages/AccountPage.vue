<template>
    <v-container class="w-100 h-100 pa-0 d-flex flex-column justify-start ga-8">
        <v-sheet class="d-flex flex-column align-center justify-center mt-8">
            <v-card
                class="text-center"
                height="88"
                width="88"
                rounded="circle"
                variant="flat"
                color="var(--primary-color)"
            >
                <v-card-text class="text-center font-weight-medium">{{ setAvatarChar }}</v-card-text>
            </v-card>
        </v-sheet>
        <v-sheet class="d-flex flex-column align-center justify-center ga-4">
            <v-card
                class="user-data-card w-100"
                flat
            >
                <v-card-title>Ваши данные</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>

                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-sheet>
    </v-container>
</template>
<script>
import {tgService} from '@/services/tgService.js'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'AccountPage',
    data: () => ({
        user: {}
    }),
    methods: {
        ...mapActions ({

        })
    },
    computed: {
        ...mapGetters ({
            getUserPersData: 'userData/getUserPersData',
        }),
        setAvatarChar() {
            //return this.getUserPersData.name.charAt(0)
        }
    },
    beforeMount() {
        const { name, surname, middle_name, birth_date } = this.getUserPersData

        //this.user.name = this.getUserPersData?.name
    }
}
</script>
<style>
    .user-data-card .v-card-title {
        font-size: 1rem !important
    }
</style>