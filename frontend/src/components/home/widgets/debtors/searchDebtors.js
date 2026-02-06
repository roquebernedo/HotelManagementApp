export const searchDebtors = (reservs) => {
    const list = reservs.filter(f => !f.paymentStatus)
    return list
}