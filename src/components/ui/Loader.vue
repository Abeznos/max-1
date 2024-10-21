<template>
    <div class="loader-container">
        <v-container>
            <v-layout>
                <v-row
                    align-content="center"
                    class="fill-height"
                    justify="center"
                >
                    <v-col class="v-col-6 d-flex flex-column justify-center align-center ga-8">
                        <img :src="`${publicPath}/img/${getBotId}.jpg`" alt="">
                        <v-progress-linear
                            color="var(--primary-color)"
                            height="6"
                            indeterminate
                            rounded
                        ></v-progress-linear>
                    </v-col>
                </v-row>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'loader',
    data: () => ({
        publicPath: import.meta.env.VITE_CLIENT_URL
    }),
    computed: {
        ...mapGetters({
            getBotId: 'userData/getBotId'
        })
    }
}
</script>
<style scoped>
    .loader-container {
        position: fixed;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--surface-color);
        z-index: 9999;
    }
    img {
        width: 100px;
    }
</style>