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

    const setHeaderColor = (color) => {
        tg.setHeaderColor(color)
    }

    const disableVerticalSwipes = () => {
        tg.disableVerticalSwipes()
    }

    const isExpanded = () => {
        tg.isExpanded
    }

    const ab = () => {
        console.log('ab')
    }

    const openLink = (url) => {
        tg.openLink(url)
    }

    const backButton = () => {
        tg.BackButton
    }

    return {
        test: 'test',
        ab,
        disableVerticalSwipes,
        setBackgroundColor,
        setHeaderColor,
        openLink,
        backButton,
        isExpanded: tg.isExpanded,
        viewportStableHeight: tg.viewportStableHeight,
        appReady,
        expandApp,
        user: tg.initDataUnsafe?.user
    }
}
