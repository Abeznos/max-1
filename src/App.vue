<template>
  <loader
    v-if="getLoading"
  />
  <RouterView />
  <v-layout
    v-if="showBottomNavigation"
    class="overflow-visible" style="height: 3.5rem"
  >
    <v-bottom-navigation
      active
      color="deep-purple-accent-4"
    >
        <v-btn
          data-link="homeLink"
          @click="pushToPage"
        >
          <v-icon icon="$home"></v-icon>
        </v-btn>
        <v-btn
          data-link="locationLink"
          @click="pushToPage"
        >
          <v-icon icon="$location"></v-icon>
        </v-btn>
        <v-btn
          data-link="accountLink"
          @click="pushToPage"
        >
          <v-icon icon="$account"></v-icon>
        </v-btn>
        <v-btn
          data-link="regLink"
          @click="pushToPage"
        >
          <v-icon>md-history</v-icon>
        </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
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
      login: 'userData/login'
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
    let searchParams = window.location.search.substr(1).split('&');
    let queryParams = {};

    for (let param of searchParams) {
      const [key, value] = param.split('=')
      queryParams[key] = decodeURIComponent(value) ?? ''
    }

    this.setBotId(queryParams.bot_id)
    this.setUserChatId(queryParams.chat_id)
    this.login()
    this.expandApp
    //console.log(queryParams)
  }
}
</script>
<style>

</style>