import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddProduct, Cart, Home, Login, NotFound, Signup } from './pages'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './config/protectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<ProtectedRoute>{<Home />}</ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute>{<Cart />}</ProtectedRoute>} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
