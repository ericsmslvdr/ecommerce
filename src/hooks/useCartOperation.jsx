import { useNavigate } from "react-router-dom"
import { db } from "../config/firebase"
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"

const useCartOperation = () => {
    const navigate = useNavigate()
    /* ADD TO CART */
    const addToCart = async (product, uid) => {
        try {
            const cartCollectionRef = collection(db, 'Cart ' + uid)
            const cartProductsData = await getDocs(cartCollectionRef)
            const currentCartProducts = cartProductsData.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))

            if (uid === null) {
                navigate('/login')
                console.warn("OOOPSS LOGIN FIRST!");
                return
            }

            for (const cartProduct of currentCartProducts) {
                if (cartProduct.title === product.title) {
                    const cartProductRef = doc(db, 'Cart ' + uid, cartProduct.id)
                    const currentQuantity = cartProduct.quantity
                    const currentProductPrice = cartProduct.price
                    await updateDoc(cartProductRef, {
                        quantity: currentQuantity + 1,
                        totalProductPrice: (currentQuantity + 1) * currentProductPrice,
                        timeStamp: serverTimestamp()
                    })
                    // triggerToast(`${cartProduct.title} added to cart succesfully!`)
                    return
                }
            }

            const cartDocRef = doc(db, 'Cart ' + uid, product.id)
            await setDoc(cartDocRef, {
                id: product.id,
                description: product.description,
                title: product.title,
                imgUrl: product.imgUrl,
                price: product.price,
                quantity: 1,
                totalProductPrice: 1 * product.price,
                timeStamp: serverTimestamp()
            })
            // triggerToast(`${product.title} added to cart succesfully!`)

        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (cartProductRef, productTitle) => {
        await deleteDoc(cartProductRef)
        triggerToast(`${productTitle} removed from cart successfulyy1`)
    }

    const increaseQty = async (setQuantity, quantity, cartProductRef, currentPrice) => {
        setQuantity(quantity + 1)
        await updateDoc(cartProductRef, {
            quantity: quantity + 1,
            totalProductPrice: (quantity + 1) * currentPrice,
        })
    }

    const decreaseQty = async (quantity, setQuantity, cartProductRef, currentPrice) => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
            await updateDoc(cartProductRef, {
                quantity: quantity - 1,
                totalProductPrice: (quantity - 1) * currentPrice,
            })
        }
    }

    return { addToCart, deleteProduct, increaseQty, decreaseQty }
}

export default useCartOperation

