import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { logo } from '../assets';

const Navbar = ({ user, cartProductsCount }) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate('/')
            console.log("SUCCESS LOGGING OUT!");
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='navbar'>
            <div className='leftside'>
                <Link to={'/'}>
                    <div className='logo'>
                        <img src={logo} alt="" />
                    </div>
                </Link>
            </div>
            <div className='rightside'>
                {
                    user
                        ? <>
                            <div>
                                <Link className='navlink' to={'/'}>
                                    {user}
                                </Link>
                            </div>
                            <div className='cart-menu-btn'>
                                <Link to={"/cart"}>
                                    <Icon icon={shoppingCart} size={20} />
                                </Link>
                                {
                                    cartProductsCount > 0
                                        ? <span className='cart-indicator'> {cartProductsCount} </span>
                                        : null
                                }

                            </div>
                            <div className='button logout-btn mx-4' onClick={handleLogout}>
                                LOGOUT
                            </div>
                        </>
                        : <>
                            <div> <Link className='navlink' to={'/signup'}> SIGN UP </Link></div>
                            <div> <Link className='navlink' to={'/login'}> LOGIN </Link></div>
                        </>
                }
            </div>
        </div >
    )
}

export default Navbar