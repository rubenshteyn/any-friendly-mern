import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import MainPage from "./pages/volunteer/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import AnimalCatalog from "./pages/user/AnimalCatalog/AnimalCatalog";

export const useRoutes = (isLogin, role) => {
    console.log(role)
    if(isLogin && role === "user") {
        return (
            <Switch>
                <Route path="/catalog" exact component={AnimalCatalog} />
                <Redirect to="/catalog" />
            </Switch>
        )
    }
    if(isLogin && role === "volunteer") {
        return (
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Redirect to="/" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/login" exact component={AuthPage} />
            <Redirect to="/login" />
        </Switch>
    )
}