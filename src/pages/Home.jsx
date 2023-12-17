import { Navbar, Products } from '../components'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useCurrentUser, useFetchProducts } from '../hooks'

const Home = () => {
    const { uid, user } = useCurrentUser()
    const { products, cartProductsCount } = useFetchProducts()

    console.log(products);
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