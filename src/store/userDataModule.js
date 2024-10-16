export const userDataModule = {
    state: () => ({
        balance: 3000,
        orderCode: '123456'
    }),
    getters: {
        getUserBalance(state) {
            return state.balance
        },
        getOrderCode(state) {
            return state.orderCode
        }        
    },
    namespaced: true
}