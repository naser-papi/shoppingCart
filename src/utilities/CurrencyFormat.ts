const USD_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency"
})

export function formatCurreny(number: number) {
    return USD_FORMATTER.format(number);
}