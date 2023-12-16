import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, Signup } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
