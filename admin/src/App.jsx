import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LayoutAdmin from './component/LayoutAdmin/LayoutAdmin'
import { Outlet, Route, Routes } from 'react-router-dom'
import AdminUsers from './component/AdminUsers/AdminUsers'
import AdminCategory from './component/AdminCategory/AdminCategory'
import AdminProducts from './component/AdminProduct/AdminProducts'
import AdminBill from './component/AdminBill/AdminBill'
import AppRouters from './component/AppRouter/AppRouters'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AppRouters/>
    </>
  )
}

export default App
