import React, {useState, useContext, useCallback, useEffect} from 'react';
import './MainPage.css'
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import CreateAnimal from "../../../components/modals/CreateAnimal/CreateAnimal";
import ChangeAnimal from "../../../components/modals/ChangeAnimal/ChangeAnimal";
import {Switch, Route, Redirect} from "react-router-dom";
import FavoriteAnimalsForUser from "../../FavoriteAnimals/FavoriteAnimals";


function MainPage() {
    const {userId, role} = useContext(AuthContext)
    const [animals, setAnimals] = useState([])
    const [animalsForUsers, setAnimalsForUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const [isModalCreate, setModalСreate] = React.useState(false);

    const [isModalChangeInfo, setModalChange] = useState({
        isModalChange: false,
        currentDataAnimal: {}
    });

    console.log(isModalChangeInfo)

    const getAnimal = useCallback(async () => {
        try {
            await axios.get('/api/animal', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId, role}
            })
                .then((response) => setAnimals(response.data))
        } catch (e) {
            console.log(e)
        }
        console.log(animals)
    }, [userId, role])

    const getAnimalForUsers = useCallback(async () => {
        try {
            await axios.get('/api/animal/allAnimals', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId, role}
            })
                .then((response) => setAnimalsForUsers(response.data))
        } catch (e) {
            console.log(e)
        }
        console.log(animalsForUsers)
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

    useEffect(() => {
        getAnimal()
    }, [getAnimal])
    if (animals.length === 0) {
        return (
            <div onLoad={getAnimal} className="container">
                <CreateAnimal
                    isVisible={isModalCreate}
                    title="Создание объявления"
                    onClose={() => setModalСreate(false)}
                />
                <div className="main-page">
                    <div onLoad={getAnimal} className="animals">
                        <div className="not-animals">
                            <p>Похоже что у вас нет объявлений со зверушками, нужно их срочно создать!</p>

                            <button className="waves-effect waves-light btn-large gradient"
                                    onClick={() => setModalСreate(true)}>Создать объявление
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div onLoad={getAnimal} className="container">
            <div>
                <CreateAnimal
                    isVisible={isModalCreate}
                    title="Создание объявления"
                    onClose={() => setModalСreate(false)}
                />
                <ChangeAnimal
                    isVisible={isModalChangeInfo.isModalChange}
                    animal={isModalChangeInfo.currentDataAnimal}
                    title="Редактирование объявления"
                    onClose={() => setModalChange({isModalChange: false, currentDataAnimal: {}})
                    }
                />
                <div className="main-page">
                    <h3>Список ваших животных:</h3>
                    <div className="header-list">
                        <button className="waves-effect add waves-light btn orange"
                                onClick={() => setModalСreate(true)}>Создать
                            объявление
                        </button>
                    </div>
                    <div onLoad={getAnimal} className="animals">
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
                                        <button onClick={() => setModalChange({
                                            isModalChange: true,
                                            currentDataAnimal: animal
                                        })
                                        }
                                                className="btn-floating halfway-fab waves-effect waves-light orange">
                                            <i className="material-icons">create</i>
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

export default MainPage;