import './App.scss';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from './routes'
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";


function App() {
    const {login, logout, token, userId, isReady, role} = useAuth()
    const isLogin = !!token
    const route = useRoutes(isLogin, role)
    return (
        <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin, role}}>
            <div className="app">
                <BrowserRouter>
                    <Navbar/>
                    { route }
                </BrowserRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
