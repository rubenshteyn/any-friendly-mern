import React, {useState, useContext, useCallback, useEffect} from 'react';
import './FavoriteAnimals.scss'
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ChangeAnimal from "../../components/modals/ChangeAnimal/ChangeAnimal";
import {Switch, Route, Redirect, Link} from "react-router-dom";
import MainPage from "../volunteer/MainPage/MainPage";


function FavoriteAnimals() {
    const {userId, role} = useContext(AuthContext)
    const [animals, setFavoriteAnimals] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    const getFavoriteAnimals = useCallback(async () => {
        try {
            await axios.get('/api/animal/favoriteAnimals', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId, role}
            })
                .then((response) => setFavoriteAnimals(response.data))
        } catch (e) {
            console.log(e)
        }
        console.log(animals)
    }, [userId, role])

    const getCurrentUser = useCallback(async () => {
        try {
            await axios.get('/api/auth/currentUser', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
                .then((response) => setCurrentUser(response.data))
        } catch (e) {
            console.log(e)
        }
        console.log(currentUser)
    }, [userId])

    const deleteFavoriteAnimal = useCallback(async (animalId) => {
        console.log(animalId)
        try {
            await axios.post('/api/auth/deleteFavorite', {userId, animalId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setFavoriteAnimals(response.data)
                    setCurrentUser('')
                })
        } catch (e) {
            console.log(e)
        }
    }, [userId, animals, setFavoriteAnimals])

    useEffect(() => {
        getFavoriteAnimals()
        getCurrentUser()
    }, [getFavoriteAnimals, getCurrentUser])

    return (
        <div onLoad={getFavoriteAnimals} className="container">
                <div>
                    <div className="main-page">
                        <h3>Список избранных животных:</h3>
                        <div className="header-list">
                            <button className="waves-effect add waves-light btn orange">
                                <Link to="/catalog">Перейти к каталогу</Link>
                            </button>
                        </div>
                        <div onLoad={getFavoriteAnimals} className="animals">
                            {animals.length > 0 && animals.map((animal, index) => {
                                return (
                                    <div className="card" key={index}>
                                        <div className="card-image">
                                            <img src={animal.img}></img>
                                            <span className="card-title">{animal.name}</span>
                                            <button onClick={()=> deleteFavoriteAnimal(animal._id)}
                                                    className="btn-floating halfway-fab waves-effect waves-light red">
                                                <i className="material-icons">remove_circle</i>
                                            </button>
                                        </div>
                                        <div className="card-content">
                                            {animal.vaccinations === true && <p>Вакцинации: Есть</p>}
                                            {animal.vaccinations === false && <p>Вакцинации: Нет</p>}
                                            <p>Возраст: {animal.age}</p>
                                            <p>Описание: {animal.text}</p>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default FavoriteAnimals;