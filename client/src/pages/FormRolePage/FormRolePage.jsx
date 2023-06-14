import React from 'react';
import {Link} from "react-router-dom";

const FormRolePage = ({title, changeHandler}) => {
    return (
        <div className="auth-page role-page">
            <h3 className="role-title">{title}</h3>
            <form className="form form-login">
                <div className="input-field col role-group-radio">
                    <div className="role-block">
                        <p>
                            <label>
                                <input value="user" onChange={changeHandler} name="role"
                                       type="radio"/>
                                <span>Пользователь</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input value="volunteer" onChange={changeHandler} name="role"
                                       type="radio"/>
                                <span>Волонтер</span>
                            </label>
                        </p>
                    </div>
                </div>
                <div className="row group-buttons">
                    <Link to="/registration"
                          className="wawes-effect wawes-light btn btn orange">Далее</Link>
                    <Link to="/login" className="btn-outline btn-reg">Уже есть аккаунт?</Link>
                </div>
            </form>
        </div>
    );
};

export default FormRolePage;