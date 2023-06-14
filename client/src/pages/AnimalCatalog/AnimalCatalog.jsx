import React, {useState, useContext, useCallback, useEffect} from 'react';
import './AnimalCatalog.css'
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useAnimals} from "../../hooks/useAnimals";
import AnimalService from "../../api/AnimalService";
import {useFetching} from "../../hooks/useFetching";
import AddFavoriteAnimal from "../../api/AddFavoriteAnimal";

function AnimalCatalog() {
    const {userId, role} = useContext(AuthContext)
    const [animals, setAllAnimals] = useState([])

    const [isModalDescription, setModalDescription] = React.useState({
        isModalDescription: false,
        setAnimal: 0
    });

    const [fetchAnimals, isAnimalsLoading, postError] = useFetching(async () => {
        const response = await AnimalService.getAll(userId, role, "allAnimals")
        setAllAnimals(response.data)
    })

    const addFavorite = useCallback(async (animalId) => {
        const response = await AddFavoriteAnimal.addAnimal(userId, animalId)
        if(response.data) {
            setAllAnimals([...animals], response.data)
        }
    }, [userId, animals, fetchAnimals])


    useEffect(() => {
        fetchAnimals()
    }, [])
    console.log(isAnimalsLoading)

    return (
        <div className="container">
                <div>
                    <div className="main-page">
                        <h3>Список животных:</h3>
                        <div className="animals">
                            {animals.length > 0 && animals.map((animal, index) => {
                                return (
                                    <div className="card" key={index}>
                                        <div className="card-image">
                                            <img src={animal.img}></img>
                                            <span className="card-title">{animal.name}</span>
                                            {/*<button onClick={() => setModalDescription({*/}
                                            {/*    isModalDescription: true,*/}
                                            {/*    setAnimal: animal*/}
                                            {/*})*/}
                                            {/*}*/}
                                            {/*        className="btn-floating halfway-fab waves-effect waves-light orange">*/}
                                            {/*    <i className="material-icons">open_in_new</i>*/}
                                            {/*</button>*/}
                                            <button onClick={()=> addFavorite(animal._id)}
                                                    className="btn-floating halfway-fab waves-effect waves-light red">
                                                <i className="material-icons">whatshot</i>
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

export default AnimalCatalog;