import React from 'react';
import MyInput from "../../components/UI/MyInput/MyInput";
import MyButton from "../../components/UI/MyButton/MyButton";
import {Link} from "react-router-dom";

const FormAuthPage = ({title, changeHandler, loginHandler}) => {
    return (
        <div className="auth-page">
            <h3>{title}</h3>
            <form className="form form-login" onSubmit={e => e.preventDefault()}>
                <div className="row">
                    <MyInput
                        type="email"
                        name="email"
                        className="validate"
                        onChange={changeHandler}
                        labelName="Email"
                    />
                    <MyInput
                        type="password"
                        name="password"
                        className="validate"
                        onChange={changeHandler}
                        labelName="Password"
                    />
                </div>
                <div className="row group-buttons">
                    <MyButton
                        onClick={loginHandler}
                        className="wawes-effect wawes-light btn btn orange">
                        Войти
                    </MyButton>
                    <Link to="/role" className="btn-outline btn-reg">Нет аккаунта?</Link>
                </div>
            </form>
        </div>
    );
};

export default FormAuthPage;