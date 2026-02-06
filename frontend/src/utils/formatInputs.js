import { numberToCurrency, numberToPercentage } from "./formUtils"

export const formatCurrency = (e) => {
    e.preventDefault()
    const value = e.target.value
    e.target.value = numberToCurrency(value)
}

export const formatPercentage = (e) => {
    e.preventDefault()
    const value = e.target.value
    e.target.value = numberToPercentage(value)
}