<template>
  <loader
    v-if="getLoading"
  />
  <v-container class="main-container pa-4">
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
            <v-icon></v-icon>
          </v-btn>
      </v-bottom-navigation>
    </v-layout>
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
      loadingToggle: 'appState/loadingToggle'
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
      getLoading: 'appState/getLoading'
    }),

    showBottomNavigation() {
      const path = this.$route.fullPath
      return path != '/registration' ? true : false
    }
  },
  beforeMount() {
    this.loadingToggle
    const {setBackgroundColor, disableVerticalSwipes} = tgService()
    disableVerticalSwipes()
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