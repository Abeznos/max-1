import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiHome, mdiAccount, mdiBarcode, mdiQrcode, mdiMapMarker, mdiClose } from '@mdi/js'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VBtn } from 'vuetify/components'

export default createVuetify({
    components: {
        ...components,
        VDateInput
    },
    defaults: {
        VBtn: {
            variant: 'flat',
            class: 'pb-primary-btn',
            size: "large"
        }
    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases: {
            ...aliases,
            home: mdiHome,
            account: mdiAccount,
            barcode: mdiBarcode,
            qr: mdiQrcode,
            location: mdiMapMarker,
            close: mdiClose
          },
        sets: {
            mdi
        }
    },
})