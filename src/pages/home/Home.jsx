import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components'
import { Products } from './Products'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, addToCart, getProducts, getCartProductsCount } from './utils'
import { db } from '../config/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { ToastContainer } from 'react-toastify'
import { useCurrentUser } from '../../hooks'

const Home = () => {
    const { uid, user } = useCurrentUser()


    const navigate = useNavigate('')
    const [products, setProducts] = useState([])
    const [cartProductsCount, setCartProductsCount] = useState(0)
    const [totalCartProductsCount, setTotalCartProductsCount] = useState(0)
    const productsCollectionRef = collection(db, "products")
    const cartProductsCollectionRef = collection(db, "Cart " + uid)

    useEffect(() => {
        getCurrentUser(setUid, setUser)
        const unsubcribe = onSnapshot((productsCollectionRef, cartProductsCollectionRef), () => {
            getProducts(setProducts, productsCollectionRef)
            getCartProductsCount(cartProductsCollectionRef, setCartProductsCount, setTotalCartProductsCount)
        })

        console.log("HOOOMEEE 1st useEf");
        return () => {
            unsubcribe()
        }
    }, [uid])

    console.log(totalCartProductsCount)

    return (
        <>
            <Navbar user={user} uid={uid} cartProductsCount={cartProductsCount} />
            <br></br>
            <div className='container-fluid'>
                {products.length > 1 && (
                    <>
                        <h1 className='text-center mt-5 pt-5'>Products</h1>
                        <div className='products-box'>
                            <Products
                                products={products}
                                isCartProduct={false}
                                uid={uid}
                                addToCart={addToCart}
                                navigate={navigate}
                            />
                            <ToastContainer />
                        </div>
                    </>
                )}
                {products.length < 0 && (
                    <h1 className='text-center'>Please wait....</h1>
                )}
            </div>
        </>
    )
}

export default Home