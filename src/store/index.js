import { createStore } from 'vuex'

import { tgDataModule } from '@/store/tgDataModule.js'
import { userDataModule } from '@/store/userDataModule.js'

export default createStore({
    modules: {
        tgData: tgDataModule,
        userData: userDataModule
    }
})