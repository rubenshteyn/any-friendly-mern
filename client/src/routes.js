import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import MainPage from "./pages/volunteer/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import AnimalCatalog from "./pages/AnimalCatalog/AnimalCatalog";
import FavoriteAnimals from "./pages/FavoriteAnimals/FavoriteAnimals";

export const useRoutes = (isLogin, role) => {
    if(isLogin && role === "user") {
        return (
            <Switch>
                <Route path="/catalog" exact component={AnimalCatalog} />
                <Route path="/favorites" exact component={FavoriteAnimals} />
                <Redirect to="/catalog" />
            </Switch>
        )
    }
    if(isLogin && role === "volunteer") {
        return (
            <Switch>
                <Route path="/catalog" exact component={AnimalCatalog} />
                <Route path="/" exact component={MainPage} />
                <Route path="/favorites" exact component={FavoriteAnimals} />
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