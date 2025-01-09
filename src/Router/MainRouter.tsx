import React, { useEffect, useState } from "react"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Home } from "../pages/Home"
import { NotFound } from "../pages/NotFound"
import MainMenu from "../pages/recipes/mainMenu"
// import { ProtectedRoute } from "../components/ProtectedRoute"
import RecipePage from "../pages/recipes/recipePage"
import { useAuth } from "../auth/AuthContext"

function Logout() {
    return <Navigate to="/main" />
}
function RegisterAndLogout() {
    return <Register />
}

const ProtectedRoute = () => {

    const auth = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
        auth.auth().then(a => {
            return a ? setIsAuthorized(true) : setIsAuthorized(false)
        }).catch(e => setIsAuthorized(false))
    }, [])

    useEffect(() => {
    }, [isAuthorized])

    if (auth.loading)
        return <div>loading...</div>
    if (!isAuthorized) {
        // If the user is not authenticated, redirect to the login page
        // return <Navigate to="/login" />;
        return <div> not authorized</div>;
    }
    // If authenticated, render child routes
    return <Outlet />;
};

const MainRouter: React.FC = () => {

    return (
        <Routes>

            {/* private routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
            </Route>

            {/* public routes */}
            <Route path="/main" element={<MainMenu />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default MainRouter;

