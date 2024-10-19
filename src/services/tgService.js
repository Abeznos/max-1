const tg = window.Telegram.WebApp

export function tgService() {

    const ready = () => {
        tg.ready()
    }

    const expandApp = () => {
        tg.expand()
    }

    const user = () => {
        return tg.initDataUnsafe.user ? tg.initDataUnsafe.user : ''
    }

    return {
        test: '12',
        user
    }
}
