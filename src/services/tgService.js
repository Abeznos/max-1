const tg = window.Telegram.WebApp

export default class tgService {
    static async getChatIds() {
        return tg.initDataUnsafe?.user.id
    }

    static async getData() {
        return tg.initDataUnsafe?.user
    }
}