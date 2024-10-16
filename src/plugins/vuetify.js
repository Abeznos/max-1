import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiHome, mdiAccount, mdiBarcode, mdiQrcode, mdiMapMarker, mdiClose } from '@mdi/js'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'

export default createVuetify({
    components: {
        ...components,
        VDateInput
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