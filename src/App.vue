<template>
  <loader
    v-if="getLoading"
  />
  <v-container class="main-container pa-0 h-100">
    <NotUserAlert v-if="getBotUserAlert"/>
    <NotPbUserAlert v-if="getPbUserAlert"/> 
    <RouterView />
    <v-layout
      v-if="getBackBtn"
      class="overflow-visible" style="height: 3.5rem"
    >
      <v-bottom-navigation>
        <v-btn @click="goBack" size="small">Назад</v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-container>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {tgService} from '@/services/tgService.js'
import loader from '@/components/ui/Loader.vue'
import NotUserAlert from '@/components/ui/NotUserAlert.vue'
import NotPbUserAlert from '@/components/ui/NotPbUserAlert.vue'

export default {
  name: 'App',
  data: () => ({
    viewportStableHeight: tgService().viewportStableHeight,
  }),
  components: {loader, NotUserAlert, NotPbUserAlert},
  methods: {
    ...mapActions({
      loadingToggle: 'appState/loadingToggle',
      setBackBtn: 'appState/setBackBtn',
      defineUser: 'userData/defineUser'
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
      getPbUserAlert: 'appState/getPbUserAlert'
    }),
  },
  mounted() {

  }
}
</script>
<style>
  .bottom-nav {
    position: fixed;
    bottom: -32px;
    left: 0;
    background-color: #4527A0;
    height: 3.5rem;
    width: 100%;
  }
</style>