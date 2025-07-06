import React from 'react'
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Dashboard from './Pages/Home.jsx'
import Income from './Pages/Income'
import Expense from './Pages/Expense'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
const App = () => {
  return (
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} /> 
            <Route path="/Login" element={<Login />} /> 
            <Route path="/SignUp" element={<SignUp />} /> 
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Income" element={<Income />} />
            <Route path="/Expense" element={<Expense />} />
          </Routes>
        </BrowserRouter>
  )
}

export default App

const Root = () => {
  //check if the tokenn is in localstorage
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    isAuthenticated?
    (<Navigate to="/Dashboard" />):(<Navigate to="/Login" />)
  )
  
}