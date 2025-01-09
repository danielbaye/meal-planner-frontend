import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MainRouter from "./Router/MainRouter"
import AuthProvider from "./auth/AuthContext"


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
