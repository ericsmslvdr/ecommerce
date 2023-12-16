import { doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../config/firebase';
import { useCartOperation } from '../hooks';
import { formatPrice } from '../utils';

const IndividualProduct = ({ individualProduct, isCartProduct, uid }) => {
    const { addToCart, deleteProduct, increaseQty, decreaseQty } = useCartOperation()

    const [quantity, setQuantity] = useState(individualProduct.quantity)
    const cartProductRef = doc(db, 'Cart ' + uid, individualProduct.id)
    const currentPrice = individualProduct.price

    const handleAddToCart = () => {
        addToCart(individualProduct, uid);
    }

    const handleDelete = async () => {
        deleteProduct(cartProductRef, individualProduct.title)
    }

    const handleIncreaseQuantity = async () => {
        increaseQty(setQuantity, quantity, cartProductRef, currentPrice)
    }

    const handleDecreaseQuantity = async () => {
        decreaseQty(quantity, setQuantity, cartProductRef, currentPrice)
    }

    return (
        isCartProduct
            ? <div className='product cart-product d-flex flex-row justify-content-start w-75 gap-2'>
                <div className='product-img w-25 h-25 p-2'>
                    <img src={individualProduct.imgUrl} alt={individualProduct.title} />
                </div>
                <div className='w-75 d-flex flex-column justify-content-between'>
                    <div>
                        <div className='product-text title text-start'>{individualProduct.title}</div>
                        <div className='product-text description text-start'>{individualProduct.description}</div>
                    </div>
                    <div>
                        <div className='product-text price text-start'>Unit Price: {formatPrice(individualProduct.price)}</div>
                        <div className='d-flex gap-2 align-items-center w-50 mt-2'>
                            <div className='product-text text-start'>Quantity:</div>
                            <div className='product-text quantity-box'>
                                <button className='btn btn-sm btn-primary' onClick={handleDecreaseQuantity}>-</button>
                                <span className='text-dark'>{quantity}</span>
                                <button className='btn btn-sm btn-primary' onClick={handleIncreaseQuantity}>+</button>
                            </div>
                        </div>
                        <div className='product-text price text-start pt-4'>Total Price: {formatPrice(individualProduct.totalProductPrice)}</div>
                        <div className='d-flex justify-content-end'>
                            <div className='cart-btn' onClick={handleDelete}>DELETE</div>
                        </div>
                    </div>
                </div>
            </div >
            : <div className='product'>
                <div className='product-img'>
                    <img src={individualProduct.imgUrl} alt={individualProduct.title} />
                </div>
                <div className='product-text title'>{individualProduct.title}</div>
                <div className='product-text description'>{individualProduct.description}</div>
                <div className='product-text price'>{formatPrice(individualProduct.price)}</div>
                <div className='cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
            </div >
    )
}

export default IndividualProduct