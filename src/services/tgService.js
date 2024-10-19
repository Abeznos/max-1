const tg = window.Telegram.WebApp

export function tgService() {

    const appReady = () => {
        tg.ready()
    }

    const expandApp = () => {
        tg.expand()
    }

    return {
        test: 'test',
        appReady,
        expandApp,
        user: tg.initDataUnsafe?.user
    }
}
