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
                <v-card-text 
                    class="text-center font-weight-medium"
                    color="var(--on-primary-color)"
                >{{ setAvatarChar }}</v-card-text>
            </v-card>
        </v-sheet>
        <v-sheet class="d-flex flex-column align-center justify-center ga-4">
            <v-card
                class="user-data-card w-100"
                flat
            >
                <v-card-title class="mb-8">
                    <v-row class="w-100">
                        <v-col class="">Ваши данные</v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-form 
                        validate-on="submit lazzy" 
                        ref="userAccount" 
                        @submit.prevent 
                        :disabled="isUserFormEdit"
                    >
                        <v-row>
                            <v-col class="pb-0 pt-0">
                                <v-text-field
                                    class="pb-text-field rounded-lg rounded-xl"
                                    v-model="user.name"
                                    variant="outlined"
                                    density="compact"
                                    label="Имя"
                                    inputmode="text"
                                    placeholder="Иван"
                                    :rules="getRules(getFormFields.nameField.rules)"
                                ></v-text-field>                                
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="pb-0 pt-0">
                                <v-text-field
                                    class="pb-text-field rounded-lg rounded-xl"
                                    v-model="user.surname"
                                    variant="outlined"
                                    density="compact"
                                    label="Фамилия"
                                    inputmode="text"
                                    placeholder="Иванов"
                                    :rules="getRules(getFormFields.nameField.rules)"
                                ></v-text-field>                                
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="pb-0 pt-0">
                                <v-text-field
                                    class="pb-text-field rounded-lg rounded-xl"
                                    v-model="user.middle_name"
                                    variant="outlined"
                                    density="compact"
                                    label="Отчество"
                                    inputmode="text"
                                    placeholder="Иванович"
                                    :rules="getRules(getFormFields.nameField.rules)"
                                ></v-text-field>                                
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="pb-0 pt-0">
                                <v-text-field
                                    class="pb-text-field rounded-lg rounded-xl"
                                    v-model="user.birth_date"
                                    variant="outlined"
                                    density="compact"
                                    label="Дата рождения"
                                    inputmode="text"
                                    placeholder="дд.мм.гггг"
                                    :rules="getRules(getFormFields.birthDate.rules)"
                                ></v-text-field>                                
                            </v-col>
                        </v-row>                                                                        
                    </v-form>
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
        user: {},
        userFormEdit: false
    }),
    methods: {
        ...mapActions ({

        })
    },
    computed: {
        ...mapGetters ({
            getUserPersData: 'userData/getUserPersData',
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules'
        }),
        setAvatarChar() {
            return this.getUserPersData.name.charAt(0)
        },
        isUserFormEdit() {
            return !this.userFormEdit
        }
    },
    watch: {
        user: {
            deep: true,
            handler() {
                console.log('Изменилось поле', this.user)
            }
        }
    },
    beforeMount() {
        const { name, surname, middle_name, birth_date } = this.getUserPersData

        this.user.name = name
        this.user.surname = surname
        this.user.middle_name = middle_name
        this.user.birth_date = birth_date
    }
}
</script>
<style>
    .user-data-card .v-card-title {
        font-size: 1rem !important
    }
</style>