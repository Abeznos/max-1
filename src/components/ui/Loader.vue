<template>
    <div class="loader-container">
        <v-container>
            <v-row
                align-content="center"
                class="fill-height"
                justify="center"
            >
                <v-col cols="6">
                    <v-progress-linear
                        color="deep-purple-accent-4"
                        height="6"
                        indeterminate
                        rounded
                    ></v-progress-linear>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'loader'
}
</script>
<style>
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
</style>