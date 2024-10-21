<template>
    <v-container>
        
    </v-container>
</template>
<script>
import {tgService} from '@/services/tgService.js'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'AccountPage',
    methods: {
        ...mapActions ({
            setBackBtn: 'appState/setBackBtn'
        })
    },
    computed: {
        ...mapGetters ({
            getBackBtn: 'appState/getBackBtn'
        })
    },
    mounted() {
        if(!this.getBackBtn) {
            this.setBackBtn()
        }
    }    
}
</script>
<style>
    
</style>