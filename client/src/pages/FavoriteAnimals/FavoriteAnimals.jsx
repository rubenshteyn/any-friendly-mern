import React, {useState, useContext, useCallback, useEffect} from 'react';
import './FavoriteAnimals.css'
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {Switch, Route, Redirect, Link} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import AnimalService from "../../api/AnimalService";
import AddFavoriteAnimal from "../../api/AddFavoriteAnimal";
import DeleteFavoriteAnimal from "../../api/DeleteFavoriteAnimal";


function FavoriteAnimals() {
    const {userId, role} = useContext(AuthContext)
    const [animals, setFavoriteAnimals] = useState([])

    const [fetchAnimals, isAnimalsLoading, postError] = useFetching(async () => {
        const response = await AnimalService.getAll(userId, role, "favoriteAnimals")
        setFavoriteAnimals(response.data)
    })

    const deleteFavorite = useCallback(async (animalId) => {
        const response = await DeleteFavoriteAnimal.deleteAnimal(userId, animalId)
        console.log(response)
        if(response.data) {
            setFavoriteAnimals([...animals].filter(animal => {
                if(animal._id !== animalId) {
                    return animal
                }
            }))
        }
    }, [userId, animals, fetchAnimals])


    useEffect(() => {
        fetchAnimals()
    }, [])

    return (
        <div className="container">
                <div>
                    <div className="main-page">
                        <h3>Список избранных животных:</h3>
                        <div className="header-list">
                            <button className="waves-effect add waves-light btn orange">
                                <Link to="/catalog">Перейти к каталогу</Link>
                            </button>
                        </div>
                        <div className="animals">
                            {animals.length > 0 && animals.map((animal, index) => {
                                return (
                                    <div className="card" key={index}>
                                        <div className="card-image">
                                            <img src={animal.img}></img>
                                            <span className="card-title">{animal.name}</span>
                                            <button onClick={()=> deleteFavorite(animal._id)}
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