import React from 'react'
import { IndividualProduct } from '../components'

const Products = ({ products, isCartProduct, uid }) => {
    return products.map((product) => (
        <IndividualProduct
            key={product.id}
            individualProduct={product}
            isCartProduct={isCartProduct}
            uid={uid}
        />
    ))
}

export default Products