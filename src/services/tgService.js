const tg = window.Telegram.WebApp

export function tgService() {

    const appReady = () => {
        tg.ready()
    }

    const expandApp = () => {
        tg.expand()
    }

    const setBackgroundColor = (color) => {
        tg.setBackgroundColor(color)
    }

    const ab = () => {
        console.log('ab')
    }

    return {
        test: 'test',
        ab,
        setBackgroundColor,
        appReady,
        expandApp,
        user: tg.initDataUnsafe?.user
    }
}
