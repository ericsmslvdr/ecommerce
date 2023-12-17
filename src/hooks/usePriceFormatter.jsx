const usePriceFormatter = () => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
        }).format(price)
    }

    return { formatPrice }
}

export default usePriceFormatter