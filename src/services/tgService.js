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

    const closeApp = () => {
        tg.close()
    }

    const openLink = (url) => {
        tg.openLink(url)
    }

    const requestContact = () => {
        tg.requestContact()
    }

    const setBottomBarColor = (color) => {
        tg.setBottomBarColor(color)
    }

    return {
        disableVerticalSwipes,
        setBackgroundColor,
        setHeaderColor,
        openLink,
        requestContact,
        backButton: tg.BackButton,
        isExpanded: tg.isExpanded,
        viewportStableHeight: tg.viewportStableHeight,
        mainBtn: tg.MainButton,
        setBottomBarColor,
        appReady,
        closeApp,
        expandApp,
        user: tg.initDataUnsafe?.user
    }
}
