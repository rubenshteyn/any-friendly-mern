import React from 'react';
import MyInput from "../../components/UI/MyInput/MyInput";
import MyButton from "../../components/UI/MyButton/MyButton";
import {Link} from "react-router-dom";

const FormRegPage = ({title, changeHandler, registerHandler}) => {
    return (
        <div className="auth-page">
            <h3>{title}</h3>
            <form className="form form-login" onSubmit={e => e.preventDefault()}>
                <div className="row">
                    <MyInput
                        type="text"
                        name="name"
                        className="validate"
                        onChange={changeHandler}
                        labelName="Имя"
                    />
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
                        onClick={registerHandler}
                        className="wawes-effect wawes-light btn btn orange">
                        Регистрация
                    </MyButton>
                    <Link to="/login" className="btn-outline btn-reg">Есть аккаунт?</Link>
                </div>
            </form>
        </div>
    );
};

export default FormRegPage;