
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
Register
function App() {
  return <>
    <Header></Header>
    <Routes>
      <Route path='/' element={<h1>Home</h1>}></Route>
      <Route path='/login' element={<Login/>}></Route> 
      <Route path='/register' element={<Register/>}></Route> </Routes>
  </>
}

export default App
