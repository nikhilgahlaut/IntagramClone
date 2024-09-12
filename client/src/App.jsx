import { Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import './App.css'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api/auth'
axios.defaults.withCredentials= true;

function App() {

  return (
    <>
    <Toaster position='bottom-right' toastOptions={{duration:10000}}/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/signup' element = {<Register/>}/>
        <Route path='/login' element = {<Login/>}/>
      </Routes>
    </>
  )
}

export default App
