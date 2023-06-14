import {useState, useEffect, useCallback} from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((jwtToken, id, role) => {
        setToken(jwtToken)
        setUserId(id)
        setRole(role)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            role: role,
            token: jwtToken
        }))
    }, [])
    const logout = (jwtToken, id, role) => {
        setToken(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token, data.userId, data.role)
        }
        setIsReady(true)
    }, [login])

    return {login, logout, token, userId, isReady, role}
}