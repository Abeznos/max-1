<template>
    <v-container class="w-100 h-100 pa-0 d-flex flex-column justify-start ga-8 pb-8">
        <v-sheet class="d-flex flex-column align-center justify-center mt-8">
            <v-card
                class="text-center"
                height="88"
                width="88"
                rounded="circle"
                variant="flat"
                color="var(--primary-color)"
                :image="avatarImg ? avatarImg : ''"
            >
                <v-card-text 
                    v-if="!avatarImg"    
                    class="avatar-text text-center font-weight-medium"
                >
                    {{ avatar }}
                </v-card-text>
            </v-card>
        </v-sheet>
        <v-sheet class="d-flex flex-column align-center justify-center ga-4">
            <v-container class="pa-0 d-flex justify-space-between align-center">
                <div class="text-h6 w-100 text-left align-center">Ваши данные</div>
                <v-btn size="x-small" :icon="isUserFormEdit ? '$editOff' : '$edit'" @click="userFormEdit = !userFormEdit"></v-btn>

            </v-container>
            <v-card
                class="user-data-card w-100 pt-4"
                flat
            >
                <v-card-title/>
                <v-card-text>
                    <v-form
                        validate-on="submit lazzy"
                        ref="userAccount"
                        @submit.prevent
                        :disabled="!isUserFormEdit"
                    >
                        <v-row>
                            <v-col class="pb-0 pt-0">
                                <v-text-field
                                    class="pb-text-field rounded-lg rounded-xl"
                                    v-model="user.name"
                                    variant="outlined"
                                    density="compact"
                                    label="Имя"
                                    :clearable="isUserFormEdit"
                                    inputmode="text"
                                    placeholder="Иван"
                                    :rules="getRules(getUpdatetDataFields.nameField.rules)"
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
                                    :clearable="isUserFormEdit"
                                    inputmode="text"
                                    placeholder="Иванов"
                                    :rules="getRules(getUpdatetDataFields.nameField.rules)"
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
                                    :clearable="isUserFormEdit"
                                    inputmode="text"
                                    placeholder="Иванович"
                                    :rules="getRules(getUpdatetDataFields.nameField.rules)"
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
                                    mask="##.##.####"
                                    label="Дата рождения"
                                    :clearable="isUserFormEdit"
                                    inputmode="text"
                                    placeholder="дд.мм.гггг"
                                    :rules="getRules(getUpdatetDataFields.birthDate.rules)"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-btn
                            v-if="getUserChatId === '268451766'"
                            class="mt-4"
                            block
                            size="large"
                            color="primary"
                            @click="sendForm"
                        ></v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-sheet>
        <div class="pb-button-group d-flex flex-column ga-4">
            <router-link :to="`dates/${getBotId}`" class="pb-nav-link">
                <VBtnOutline
                    class="pb-text-bt"
                    block
                    text="Важные даты"
                ></VBtnOutline>
            </router-link>
        </div>
    </v-container>
</template>
<script>
import {tgService} from '@/services/tgService.js'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
const { user, mainBtn, setBottomBarColor, backButton } = tgService()
import api from '@/http'

export default {
    name: 'AccountPage',
    data: () => ({
        user: {
            name: '',
            surname: '',
            middle_name: '',
            birth_date: ''
        },
        userFormEdit: false,
        avatar: '',
        avatarImg: ''
    }),
    methods: {
        ...mapActions ({
            updateStoreData: 'userData/updateStoreData',
            login: 'userData/login',
        }),
        updateUserData(field, data) {
            this.updateStoreData({key: field, value: data})
        },
        async sendForm() {
            const { valid } = await this.$refs.userAccount.validate()
            if (!valid) return false

            const formData = { ...this.user }
            console.log(formData)

            if (formData?.city) {
                const city = await dispatch('appState/getDItyId', form.data.city, { root: true })
                formData.city = city
            }

            const newUser = await api.post('/user/update-dates', {botId: this.getBotId, chatId: this.getUserChatId, formData})

            if(newUser.data.is_registered) {
                const user = await this.login()

                console.log(newUser)

                mainBtn.hideProgress()
                mainBtn.hide()
                return true
            }

        }
    },
    computed: {
        ...mapGetters ({
            getUserPersData: 'userData/getUserPersData',
            getFormFields: 'appState/getFormFields',
            getRules: 'appState/getRules',
            getColors: 'appState/getColors',
            getBotId: 'userData/getBotId',
            getUserChatId: 'userData/getUserChatId',
            getUpdatetDataFields: 'appState/getUpdatetDataFields'
        }),
        isUserFormEdit() {
            return this.userFormEdit
        }
    },
    watch: {
        userFormEdit(newVal) {
            if(newVal === true) {
                console.log('Показать кнопку')
                mainBtn.show()
            } else {
                console.log('Скрыть кнопку')
                mainBtn.hide()
            }
        }
    },
    async beforeMount() {
        this.user.name = await this.getUserPersData.name
        this.user.surname = await this.getUserPersData.surname
        this.user.middle_name = await this.getUserPersData.middle_name
        this.user.birth_date = new Date(await this.getUserPersData.birth_date).toLocaleString().slice(0, 10)

        setBottomBarColor(this.getColors.surface)
        mainBtn.color = this.getColors.primary
        mainBtn.setText('Сохранить')
        mainBtn.textColor = '#ffffff'

        mainBtn.onClick( async () => {
            mainBtn.showProgress()

            const pbResponse = await this.sendForm()

            if(!pbResponse) {
                mainBtn.hideProgress()
                return
            }
            return
        })

        this.avatar = this.getUserPersData.name[0]

        this.avatarImg = user?.photo_url
    },
    mounted() {
        backButton.show()
        backButton.onClick( () => this.$router.go(-1) )
    }
}
</script>
<style>
    .avatar-text {
        color: var(--on-primary-color)
    }
</style>