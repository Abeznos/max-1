<template>
  <v-container class="pb-14 h-100">
    <RouterView />
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

export default {
  name: 'App',
  methods: {
    pushToPage(event) {
      switch (event.currentTarget.dataset.link) {
        case 'homeLink':
          this.$router.push('/')
          console.log(event.currentTarget)
          break
        case'regLink':
          this.$router.push('/registration')
          console.log(event.currentTarget)
          break
        default:
          console.log('Unhandled link click')
          break
      }
    }
  },
  computed: {
    showBottomNavigation() {
      const path = this.$route.fullPath
      return path !== '/registration' ? true : false
    }
  },
  beforeCreate() {
    console.log(this.$route)
    console.log(this.$route.params)
  }

}
</script>
<style>
  .v-container {

  }
</style>