
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { createContext, useState, useContext, useEffect } from "react";
import { User } from "./userType";
import api from "../api";

type LoginType = {
    username: string;
    password: string;
    // remember_me?: boolean | undefined;
}

interface ProviderProps {
    user: User | null,
    token: string,
    loading: boolean,
    login(data: LoginType): void,
    logout(): void,
    auth(): Promise<boolean>
}

const AuthContext: React.Context<ProviderProps> = createContext<ProviderProps>({
    user: null,
    token: '',
    loading: false,
    login: () => { },
    logout: () => { },
    auth: async () => false
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN)
    const [token, setToken] = useState(storedToken || '')
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const login = async (data: LoginType) => {
        const username = data.username
        const password = data.password
        setLoading(true)
        try {
            const res = await api.post("/api/token/", {
                username,
                password
            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(ACCESS_TOKEN, res.data.refresh)
            }
        }
        catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        setLoading(true)
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(ACCESS_TOKEN, res.data.refresh)
                setLoading(false)
                return true
            } else {
                logout()
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        return false
    };

    const auth = async () => {

        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            return false;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp ?? 0;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            return await refreshToken();
        }
        else {
            if (!user) {
                setLoading(true)
                try {
                    const res = await api.get("/api/user/")
                    if (res.status === 200) {
                        setUser(res.data)
                        setLoading(false)
                        return true
                    } else {
                        logout()
                    }
                } catch (error) {
                    console.log(error);
                }
                setLoading(false)
            }
        }
        return false
    };

    const logout = () => {
        setToken('')
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
    }

    return <AuthContext.Provider value={{ user, token, login, logout, loading, auth }}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}