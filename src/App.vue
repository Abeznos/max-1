<template>
  <v-layout class="w-100">
    <loader
      v-if="getLoading"
    />
    <v-main class="pa-4">
      <RouterView />
    </v-main>
    <v-bottom-navigation v-if="getBackBtn">
      <v-btn @click="goBack" size="small" text="Назад"/>
    </v-bottom-navigation>
  </v-layout>
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
  }
}
</script>
<style>
  .main-container {
    min-height: 100%;
    padding-bottom: 3rem !important;
  }

  .bottom-nav {
    position: fixed;
    bottom: -32px;
    left: 0;
    background-color: #4527A0;
    height: 3.5rem;
    width: 100%;
  }
</style>