import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
