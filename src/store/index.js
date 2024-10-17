import { createStore } from 'vuex'

import { tgDataModule } from '@/store/tgDataModule.js'
import { userDataModule } from '@/store/userDataModule.js'
import { appStateModule } from '@/store/appStateModule.js'

export default createStore({
    modules: {
        tgData: tgDataModule,
        userData: userDataModule,
        appState: appStateModule
    }
})