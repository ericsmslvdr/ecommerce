import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, Signup } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
