import React, {useState, useContext, useCallback, useEffect} from 'react';
import './AnimalCatalog.scss'
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import CreateAnimal from "../../../components/modals/CreateAnimal/CreateAnimal";
import ChangeAnimal from "../../../components/modals/ChangeAnimal/ChangeAnimal";
import {Switch, Route, Redirect} from "react-router-dom";


function AnimalCatalog() {
    const {userId, role} = useContext(AuthContext)
    const [animals, setAllAnimals] = useState([])
    const [animalsForUsers, setAnimalsForUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    const [isModalDescription, setModalDescription] = React.useState({
        isModalDescription: false,
        setAnimal: 0
    });

    const getAllAnimals = useCallback(async () => {
        try {
            await axios.get('/api/animal/allAnimals', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId, role}
            })
                .then((response) => setAllAnimals(response.data))
        } catch (e) {
            console.log(e)
        }
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
    }, [userId])

    const addFavoriteAnimal = useCallback(async (animalId) => {
        try {
            await axios.post('/api/auth/addFavorite', {userId, animalId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setAllAnimals([...animals], response.data)
                    setCurrentUser('')
                    getAllAnimals()
                })
        } catch (e) {
            console.log(e)
        }
    }, [userId, animals, getAllAnimals])

    useEffect(() => {
        getAllAnimals()
        getCurrentUser()
    }, [getAllAnimals, getCurrentUser])

    return (
        <div onLoad={getAllAnimals} className="container">
                <div>
                    <div className="main-page">
                        <h3>Список животных:</h3>
                        {/*<div className="header-list">*/}
                        {/*    <button className="waves-effect add waves-light btn orange"*/}
                        {/*            onClick={() => setModalСreate(true)}>Создать*/}
                        {/*        объявление*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        <div onLoad={getAllAnimals} className="animals">
                            {/*{animals.length = 0 && return (*/}
                            {/*    <div className="not-animals">*/}
                            {/*    <p>Похоже что у вас нет объявлений со зверушками, нужно их срочно создать!</p>*/}
                            {/*    <button className="waves-effect waves-light btn-large gradient" onClick={() => setModal(true)}>Создать объявление</button>*/}
                            {/*    </div>*/}
                            {/*    )*/}
                            {/*}*/}

                            {animals.length > 0 && animals.map((animal, index) => {
                                // let cls = ['row flex animals-item']
                                // if(animal.vaccinations) {
                                //     cls.push('important')
                                // }
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
                                            <button onClick={()=> addFavoriteAnimal(animal._id)}
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