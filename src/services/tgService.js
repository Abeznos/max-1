const tg = window.Telegram.WebApp

export function tgService() {

    const appReady = () => {
        tg.ready()
    }

    const expandApp = () => {
        tg.expand()
    }

    const ab = () => {
        console.log('ab')
    }

    return {
        test: 'test',
        ab,
        appReady,
        expandApp,
        user: tg.initDataUnsafe?.user
    }
}
