<template>
    <div class="content">
        {{ getUserFromTg }}
        {{ getUrlParams }}
        {{ tgInitData }}
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
            getUserFromTg: 'tgData/getUserFromTg',
            tgInitData: 'tgData/tgInitData'
        }),

        getUrlParams() {
            const pageUrl = new URL(window.location.href)
            console.log(pageUrl)
            return pageUrl
        }
    },

    beforeCreate() {
        const pageUrl = new URL(window.location.href)
    },
}
</script>
<style>

</style>