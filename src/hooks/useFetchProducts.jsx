import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import useCurrentUser from "./useCurrentUser"

const useFetchProducts = () => {
    const { uid } = useCurrentUser()

    const [products, setProducts] = useState([])
    const [cartProducts, setCartProducts] = useState([])
    const [cartProductsCount, setCartProductsCount] = useState(0)
    const [totalCartProductsCount, setTotalCartProductsCount] = useState(0)
    const [grandTotalPrice, setGrandTotalPrice] = useState(0)

    const productsCollectionRef = collection(db, "products")
    const cartProductsCollectionRef = collection(db, "Cart " + uid)

    useEffect(() => {
        const productsUnsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
            const productsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setProducts(productsData)
            console.log("getProducts triggered!")
        })

        const cartProductsUnsubscribe = onSnapshot(query(cartProductsCollectionRef, orderBy("timeStamp", "desc")), (cartSnapshot) => {
            let quantity = 0;
            let totalPrice = 0;

            const cartProductsData = cartSnapshot.docs.map((doc) => {
                const cartProduct = { ...doc.data(), id: doc.id };
                quantity += cartProduct.quantity;
                totalPrice += cartProduct.totalProductPrice;
                return cartProduct;
            });

            setCartProducts(cartProductsData);
            setCartProductsCount(cartProductsData.length);
            setTotalCartProductsCount(quantity);
            setGrandTotalPrice(totalPrice);
            console.log("getcartProducts triggered!")

        })

        return () => {
            productsUnsubscribe()
            cartProductsUnsubscribe()
        }
    }, [uid])

    return { products, cartProductsCount, cartProducts, totalCartProductsCount, grandTotalPrice }
}

export default useFetchProducts