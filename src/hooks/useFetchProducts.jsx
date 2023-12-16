
const useFetchProducts = () => {
    const getProducts = async (setProducts, productsCollectionRef) => {
        const productsSnapshot = await getDocs(productsCollectionRef)
        const productsData = productsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setProducts(productsData)
    }

    /* GET CART GRAND TOTAL P */
    const getCartGrandTotalPrice = (cartProducts, setGrandTotalPrice) => {
        let grandTotalPrice = 0

        cartProducts.map((cartProduct) => {
            grandTotalPrice += cartProduct.totalProductPrice;
        });

        setGrandTotalPrice(grandTotalPrice)
    }

    /* GET CART PRODUCTS */
    const getCartProducts = async (cartProductsCollectionRef, setCartProducts, setGrandTotalPrice) => {
        const cartProductQuery = query(cartProductsCollectionRef, orderBy("timeStamp", "desc"))
        const cartProductsData = await getDocs(cartProductQuery);

        const cartProducts = cartProductsData.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))

        setCartProducts(cartProducts)
        getCartGrandTotalPrice(cartProducts, setGrandTotalPrice)
    }

    /* NUMBER OF CART PRODUCTS */
    const getCartProductsCount = async (cartProductsCollectionRef, setCartProductsCount, setTotalCartProductsCount) => {
        let quantity = 0
        const cartProductQuery = query(cartProductsCollectionRef, orderBy("timeStamp", "desc"))
        const cartProductsData = await getDocs(cartProductQuery);

        const cartProducts = cartProductsData.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))

        for (const cartProduct of cartProducts) {
            quantity += cartProduct.quantity
            setTotalCartProductsCount(quantity)
        }

        setCartProductsCount(cartProducts.length)
    }
}

export default useFetchProducts