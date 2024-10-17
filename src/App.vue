<template>
  <v-container class="pb-14 h-100">
    <RouterView />
    <div>tg: {{ getUserFromTg }}</div>
    <v-layout
      v-if="showBottomNavigation"
      class="overflow-visible" style="height: 3.5rem"
    >
      <v-bottom-navigation
        active
      >
          <v-btn
            data-link="homeLink"
            @click="pushToPage"
          >
            <v-icon>mdi-history</v-icon>
          </v-btn>
          <v-btn
            data-link="regLink"
            @click="pushToPage"
          >
            <v-icon>md-history</v-icon>
          </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions({
      setBotId: 'userData/setBotId',
      setUserChatId: 'setUserChatId'
    }),

    pushToPage(event) {
      switch (event.currentTarget.dataset.link) {
        case 'homeLink':
          this.$router.push('/')
          break
        case'regLink':
          this.$router.push('/registration')
          break
        default:
          break
      }
    }
  },
  computed: {
    ...mapGetters({
      getUserFromTg: 'tgData/getUserFromTg'
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
    this.setBotId(queryParams.botId)
    //this.setUserChatId(this.getUserFromTg)
  }
}
</script>
<style>
  .v-container {

  }
</style>