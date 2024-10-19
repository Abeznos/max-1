const tg = window.Telegram.WebApp

export function tgService() {

    const ready = () => {
        tg.ready()
    }

    const expandApp = () => {
        tg.expand()
    }

    return {
        test: '12',
        user: tg.initDataUnsafe?.user
    }
}
