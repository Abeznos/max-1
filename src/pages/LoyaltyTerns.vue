<template>
    <v-container>
        <v-sheet>
            <p>Как получить скидку?</p>
            <p>Зарегистрируйте карту лояльности в боте</
            <p>Получите 200 бонусов.</p>
            <p>Сразу потратьте их на покупку.</p>

            <p>Сумма покупок до 20 000 руб. – кешбэк 5%</p>
            <p>Сумма покупок от 20 000 до 50 000 руб. – кешбэк 7%</p>
            <p>Сумма покупок более 50 000 руб. – кешбэк 10%</p>

            <p>За самую первую покупку – кешбэк 30% ♥️</p>

            <p>Вне зависимости от процента кешбэка списать от суммы каждого чека можно максимум 10%</p>
            <p>Бонусные баллы не применяются к товарам с перечеркнутыми ценами.</p>
            <p>Прямо сейчас регистрируйтесь в программе лояльности, копите баллы, оплачивайте ими часть покупок. Подробнее о том, как списать бонусные баллы, можно прочитать здесь (https://www.prostocvet.ru/blog/novosti/programma-loyalnosti/).</p>
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
        })
    },
    computed: {
        ...mapGetters ({
            getBackBtn: 'appState/getBackBtn'
        })
    },
    beforeMount() {
        const { backButton } = tgService()

        backButton.show()
        backButton.onClick( () => this.$router.go(-1) )
    },
}
</script>
<style>

</style>