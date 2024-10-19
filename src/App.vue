<template>
  <loader
    v-if="getLoading"
  />
  <v-container class="main-container pa-4">
    <RouterView />

  </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {tgService} from '@/services/tgService.js'
import loader from '@/components/ui/Loader.vue'

export default {
  name: 'App',
  data: () => ({

  }),
  components: {loader},
  methods: {
    ...mapActions({
      setBotId: 'userData/setBotId',
      setUserChatId: 'userData/setUserChatId',
      expandApp: 'tgData/expandApp',
      login: 'userData/login',
      defineUser: 'userData/defineUser'
    }),

    pushToPage(event) {
      switch (event.currentTarget.dataset.link) {
        case 'homeLink':
          this.$router.push(`/?bot_id=${this.getUserBotId}&chat_id=${this.getUserChatId}`)
          break
        case'regLink':
          this.$router.push(`/registration/?bot_id=${this.getUserBotId}&chat_id=${this.getUserChatId}`)
          break
        case'accountLink':
          this.$router.push(`/account/?bot_id=${this.getUserBotId}&chat_id=${this.getUserChatId}`)
          break
        case'locationLink':
          this.$router.push(`/location/?bot_id=${this.getUserBotId}&chat_id=${this.getUserChatId}`)
          break
        default:
          break
      }
    }
  },
  computed: {
    ...mapGetters({
      getUserFromTg: 'tgData/getUserFromTg',
      getLoading: 'appState/getLoading',
      getUserChatId: 'userData/getUserChatId',
      getUserBotId: 'userData/getBotId',
    }),

    showBottomNavigation() {
      const path = this.$route.fullPath
      return path != '/registration' ? true : false
    }
  },
  beforeMount() {

    const {setBackgroundColor} = tgService()
    setBackgroundColor('#F1F3F9')

    //let searchParams = window.location.search.substr(1).split('&');
    //let queryParams = {};
//
    //for (let param of searchParams) {
    //  const [key, value] = param.split('=')
    //  queryParams[key] = decodeURIComponent(value) ?? ''
    //}
//
    //this.setBotId(queryParams.bot_id)
    //this.setUserChatId(queryParams.chat_id)
    //this.login()
    //this.expandApp
    //console.log(queryParams)
  }
}
</script>
<style>

</style>