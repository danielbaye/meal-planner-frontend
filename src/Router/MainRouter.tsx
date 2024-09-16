import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Home } from "../pages/Home"
import { NotFound } from "../pages/NotFound"
import MainMenu from "../pages/recipes/mainMenu"
import { ProtectedRoute } from "../components/ProtectedRoute"
import RecipePage from "../pages/recipes/recipePage"

function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
}
function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}

const MainRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute><Home /></ProtectedRoute>
            } />
            <Route path="/main" element={<MainMenu />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default MainRouter;

