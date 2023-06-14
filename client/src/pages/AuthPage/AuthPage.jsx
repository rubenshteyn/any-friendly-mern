import React, {useState, useContext} from 'react';
import {BrowserRouter, Switch, Route, Link, useHistory} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './AuthPage.css'
import FormAuthPage from "../FormAuthPage/FormAuthPage";
import FormRegPage from "../FormRegPage/FormRegPage";
import FormRolePage from "../FormRolePage/FormRolePage";

function AuthPage() {

    const history = useHistory()

    const [form, setForm] = useState({
        email: '',
        password: '',
        role: '',
        name: ''
    })

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }
    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    login(response.data.token, response.data.userId, response.data.role)
                })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <Route path="/login">
                            <FormAuthPage
                                title="Авторизация"
                                changeHandler={changeHandler}
                                loginHandler={loginHandler}
                            />
                        </Route>
                        <Route path="/registration">
                            <FormRegPage
                                title="Регистрация"
                                changeHandler={changeHandler}
                                registerHandler={registerHandler}
                            />
                        </Route>
                        <Route path="/role">
                            <FormRolePage
                                title="Регистрируетесь как:"
                                changeHandler={changeHandler}
                            />
                        </Route>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    );
}

export default AuthPage;