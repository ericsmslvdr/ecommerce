import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { useCurrentUser, useFetchProducts, usePriceFormatter } from "../hooks"
import { Navbar, Products } from "../components"

const Cart = () => {
    const { uid, user } = useCurrentUser()
    const { cartProductsCount, cartProducts, totalCartProductsCount, grandTotalPrice } = useFetchProducts()
    const { formatPrice } = usePriceFormatter()

    console.log("CART PRODUCTS: ", cartProducts);

    const handleToken = async (token) => {
        //  console.log(token);
        const cart = { name: 'All Productssss', grandTotalPrice }
        const response = await axios.post('http://localhost:8080/checkout', {
            token,
            cart
        })
        console.log(response);

        let { status } = response.data;

        console.log("Res Status: " + status);

        if (status === 'success') {
            navigate('/');
            toast.success('Your order has been placed successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            const carts = await getDocs(cartProductsCollectionRef);
            for (var cartProd of carts.docs) {
                const cartProductRef = doc(cartProductsCollectionRef, cartProd.id)
                await deleteDoc(cartProductRef)
            }
        }
        else {
            alert('something went wrong in checkout');
        }
    }

    return (
        <>
            <Navbar user={user} uid={uid} cartProductsCount={cartProductsCount} />
            <br></br>
            <div className='container-fluid'>
                {
                    cartProducts.length > 0
                        ? (
                            <>
                                <h1 className='text-center mt-5 pt-5'>Cart Products</h1>
                                <div className='products-box'>
                                    <Products
                                        products={cartProducts}
                                        isCartProduct={true}
                                        uid={uid}
                                    />
                                </div>
                                <div className='products-box'>
                                    <div className='product cart-product px-4 py-2 pb-3' style={{ width: "450px" }}>
                                        <span className="product-text title">Cart Summary</span>
                                        <hr className="divider pt-1 bg-white" />
                                        <div className="d-flex justify-content-between">
                                            <span className="product-text title text-center">Total No. of Products:</span>
                                            <span className="product-text title price text-center">{totalCartProductsCount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="product-text title text-center">Total Price to Pay:</span>
                                            <span className="product-text title price text-center">{formatPrice(grandTotalPrice)}</span>
                                        </div>
                                        <br />
                                        {/* <button className="cart-btn align-self-center mt-4 w-100 fw-bold" onClick={openModal}>Pay with Card</button> */}
                                        <StripeCheckout
                                            stripeKey='pk_test_51O8CLRA8OdZJXf5QU01fAR8Wra5pQiqvRV33ONbNz5Y3FSAdP851C95TgC8RqbYFm1UQK9iiUUhqmHaIbM7SBrRG00osMsQjL2'
                                            token={handleToken}
                                            billingAddress
                                            shippingAddress
                                            name='All Products'
                                            amount={grandTotalPrice * 100}
                                        ></StripeCheckout>
                                    </div >
                                </div>
                            </>
                        )
                        : (
                            <>
                                <h1 className='text-center mt-5 pt-5'>Please wait....</h1>
                            </>
                        )
                }
                <ToastContainer />
            </div>
        </>
    )
}

export default Cart