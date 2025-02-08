
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SignUp from './SignUp'
const PrivateCom = () => {
     const auth = localStorage.getItem("usersData")

     return auth ? <Outlet/> : <Navigate to="/signUp"/>   



}

export default PrivateCom
