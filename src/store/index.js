import { createStore } from "vuex"

import { tgDataModule } from "@/store/tgDataModule.js"

export default createStore({
    modules: {
        tgData: tgDataModule
    }
})