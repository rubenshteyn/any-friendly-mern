import {useState, useEffect, useCallback} from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, [])
    const logout = (jwtToken, id) => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token, data.userId)
        }
        setIsReady(true)
    }, [login])

    return {login, logout, token, userId, isReady}
}