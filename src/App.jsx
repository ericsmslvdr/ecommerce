import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Cart, Home, Login, Signup } from './pages'
import { AuthContextProvider } from './context/AuthContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
