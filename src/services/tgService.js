const tg = window.Telegram.WebApp;

export function tgService() {

    const chatId = () => {

    }

    return {
        test: '12',
        user: tg.initDataUnsafe?.user?.id
    }
}
