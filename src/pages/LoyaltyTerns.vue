<template>
    <v-container>
        <v-sheet>
            Как получить скидку?
Зарегистрируйте карту лояльности в боте
Получите 200 бонусов.
Сразу потратьте их на покупку.

Сумма покупок до 20 000 руб. – кешбэк 5%
Сумма покупок от 20 000 до 50 000 руб. – кешбэк 7%
Сумма покупок более 50 000 руб. – кешбэк 10%

За самую первую покупку – кешбэк 30% ♥️

Вне зависимости от процента кешбэка списать от суммы каждого чека можно максимум 10%
Бонусные баллы не применяются к товарам с перечеркнутыми ценами.
Прямо сейчас регистрируйтесь в программе лояльности, копите баллы, оплачивайте ими часть покупок. Подробнее о том, как списать бонусные баллы, можно прочитать здесь (https://www.prostocvet.ru/blog/novosti/programma-loyalnosti/).
        </v-sheet>
    </v-container>
</template>
<script>
import {tgService} from '@/services/tgService.js'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'LoyaltyTerns',
    methods: {
        ...mapActions ({
            setBackBtn: 'appState/setBackBtn'
        }),
        back() {
            const { backButton } = tgService()
            
                alert('нажали')
                this.$router.go(-1)
            
            console.log(backButton.onClick())
        }
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
        //console.log(this.getBackBtn)
    }
}
</script>
<style>
    
</style>