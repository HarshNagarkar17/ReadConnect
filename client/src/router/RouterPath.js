import {Route, Routes} from "react-router-dom"


import React from 'react'
import {Login} from "../pages/Login"
import { EmailVerify } from "../pages/EmailVerify"
import { Register } from "../pages/Register"
import { Profile } from "../pages/Profile"
import { Authentication } from "./Authentication"

export const RouterPath = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={
        <Authentication> 
        <Profile/>
        </Authentication>
        } />
        <Route path="/verify-email" element={<EmailVerify/>} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}


