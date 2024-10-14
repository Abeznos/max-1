<template>
    <main>
        <p>{{ getUserFromTg }}</p>
        <p>{{ getUrlParams }}</p>
        <p>{{ tgInitData }}</p>
    </main>
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
    main {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
    }
</style>