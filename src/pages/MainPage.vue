<template>
    <div class="content">
        {{ getUserFromTg }}
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

let tg = window.Telegram.WebApp

export default {
    name: 'MainPage',
    data: () => ({
    }),
    computed: {
        ...mapGetters({
            getUserFromTg: 'tgData/getUserFromTg'
        })
    },

    beforeCreate() {
        const pageUrl = new URL(window.location.href)
        console.log(pageUrl)
    },
}
</script>
<style>

</style>