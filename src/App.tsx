import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { ProtectedRoute } from "./components/ProtectedRoute"
import MainRouter from "./Router/MainRouter"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}
function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>

  )
}

export default App
