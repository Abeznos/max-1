<template>
  <v-layout class="w-100">
    <loader v-if="getLoading"/>
    <v-main class="pa-4">
      <NotUserAlert v-if="getBotUserAlert"/>
      <RouterView />
      <div>
        <p>{{ botId }}</p>
        <p>{{ chatId }}</p>
      </div>
    </v-main>
  </v-layout>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import api from '@/http';
import loader from '@/components/ui/Loader.vue'
import NotUserAlert from '@/components/ui/NotUserAlert.vue'
import NotPbUserAlert from '@/components/ui/NotPbUserAlert.vue'

import {tgService} from '@/services/tgService.js'
const { user, setBottomBarColor, setBackgroundColor, setHeaderColor, disableVerticalSwipes, appReady, expandApp } = tgService()

export default {
  name: 'App',
  data: () => ({
    botId: '',
    chatId: ''
  }),
  components: {loader, NotUserAlert, NotPbUserAlert},
  methods: {
    ...mapActions({
      loadingToggle: 'appState/loadingToggle',
      setBackBtn: 'appState/setBackBtn',
      defineUser: 'userData/defineUser',
      showUserAllertToggle: 'appState/showUserAllertToggle',
      showPbUserAllertToggle: 'appState/showPbUserAllertToggle',
      setUserData: 'userData/setUserData'
    }),

    goBack() {
      this.$router.go(-1)
      this.setBackBtn()
    }
  },
  computed: {
    ...mapGetters({
      getLoading: 'appState/getLoading',
      getBackBtn: 'appState/getBackBtn',
      getBotUserAlert: 'appState/getBotUserAlert',
      getPbUserAlert: 'appState/getPbUserAlert',
      getColors: 'appState/getColors'
    }),
  },
  async beforeMount() {
    const url = new URL(window.location.href)
    this.botId = url.pathname.slice(1)
    this.chatId = user?.id || '000011'
    this.defineUser({ botId: this.botId, chatId: this.chatId })

    try {
      this.loadingToggle()

      const login = await api.post('/user/login', { botId: this.botId, chatId: this.chatId })

      setBackgroundColor(this.getColors.surface)
      setHeaderColor(this.getColors.primary)
      disableVerticalSwipes()
      //console.log(login.data)

      if(login.data.isBotUser === false) {
          return this.showUserAllertToggle()
      }

      await this.setUserData(login.data)

    } catch(error) {
      console.log(error)
    } finally {
      appReady()
      expandApp()
      this.loadingToggle()
    }
  }
}
</script>
<style>

</style>