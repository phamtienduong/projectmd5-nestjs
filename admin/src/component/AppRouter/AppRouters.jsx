import React from 'react'
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin'
import AdminUsers from '../AdminUsers/AdminUsers'
import AdminProducts from '../AdminProduct/AdminProducts'
import AdminCategory from '../AdminCategory/AdminCategory'
import AdminBill from '../AdminBill/AdminBill'
import { Outlet, Route, Routes } from 'react-router-dom'
import DashBoard from '../Dashboard/DashBoard'
import LoginAdmin from '../Login/LoginAdmin'
import PrivateRouter from '../privateRouter/PrivateRouter'

export default function AppRouters() {
  return (
    <div>
      <Routes>
        <Route path="/auth/admin" element={<LoginAdmin />} />
        <Route path="/" element={<LayoutAdmin> <Outlet /></LayoutAdmin>}>
          <Route path='/' element={<PrivateRouter />} >
            <Route index path="/" element={<DashBoard />} />
            <Route index path="/usersAdmin" element={<AdminUsers />} />
            <Route path="/productsAdmin" element={<AdminProducts />} />
            <Route path="/categoryAdmin" element={<AdminCategory />} />
            <Route path="/ordersAdmin" element={<AdminBill />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
