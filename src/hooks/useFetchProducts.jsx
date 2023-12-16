import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../config/firebase"
import useCurrentUser from "./useCurrentUser"

const useFetchProducts = () => {
    const { uid } = useCurrentUser()

    const navigate = useNavigate('')

    const [products, setProducts] = useState([])

    const [cartProductsCount, setCartProductsCount] = useState(0)

    // const [totalCartProductsCount, setTotalCartProductsCount] = useState(0)

    const productsCollectionRef = collection(db, "products")
    const cartProductsCollectionRef = collection(db, "Cart " + uid)


    /* GET CART GRAND TOTAL P */
    // const getCartGrandTotalPrice = (cartProducts, setGrandTotalPrice) => {
    //     let grandTotalPrice = 0

    //     cartProducts.map((cartProduct) => {
    //         grandTotalPrice += cartProduct.totalProductPrice;
    //     });

    //     setGrandTotalPrice(grandTotalPrice)
    // }

    // useEffect(() => {
    //     const unsubcribe = onSnapshot((productsCollectionRef, cartProductsCollectionRef), () => {

    //         const getProducts = async () => {
    //             const productsSnapshot = await getDocs(productsCollectionRef)
    //             const productsData = productsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //             setProducts(productsData)
    //             console.log("getProducts triggered!");
    //         }

    //         const getCartProducts = async () => {
    //             let quantity = 0
    //             const cartProductQuery = query(cartProductsCollectionRef, orderBy("timeStamp", "desc"))
    //             const cartProductsData = await getDocs(cartProductQuery);

    //             const cartProducts = cartProductsData.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))

    //             // for (const cartProduct of cartProducts) {
    //             //     quantity += cartProduct.quantity
    //             //     setTotalCartProductsCount(quantity)
    //             // }

    //             setCartProductsCount(cartProducts.length)
    //             // setCartProducts(cartProducts)
    //             // getCartGrandTotalPrice(cartProducts, setGrandTotalPrice)
    //         }
    //     })

    //     console.log("HOOOMEEE 1st useEf");
    //     return () => {
    //         unsubcribe()
    //     }
    // }, [uid])

    useEffect(() => {
        const productsUnsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
            const productsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setProducts(productsData);
            console.log("getProducts triggered!");
        });

        const cartProductsUnsubscribe = onSnapshot(query(cartProductsCollectionRef, orderBy("timeStamp", "desc")), (cartSnapshot) => {
            const cartProductsData = cartSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setCartProductsCount(cartProductsData.length);
        });

        return () => {
            productsUnsubscribe();
            cartProductsUnsubscribe();
        };
    }, [uid])

    // useEffect(() => {
    //     const unsubscribe = onSnapshot(cartProductsCollectionRef, () => {
    //         getCartProducts(cartProductsCollectionRef, setCartProducts, setGrandTotalPrice)
    //         getCartProductsCount()

    //     })

    //     getCurrentUser()
    //     console.log("CARRRTTTTT 1st useff");
    //     return () => {
    //         unsubscribe()
    //     }
    // }, [uid])

    return { products, cartProductsCount }
}

export default useFetchProducts