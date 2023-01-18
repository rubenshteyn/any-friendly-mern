import React, {useState, useContext, useCallback, useEffect} from 'react';
import './CreateAnimal.scss'
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";

function CreateAnimal({isVisible = false, title, onClose}) {
    const keydownHandler = ({key}) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [kind, setKind] = useState('')
    const [vaccinations, setVaccinations] = useState('')
    const [img, setImg] = useState('')
    const {userId, role} = useContext(AuthContext)
    const [animals, setAnimals] = useState([])

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
    }, [userId, role])
    const createAnimal = useCallback(async () => {
        if (!text) return null
        try {
            await axios.post('/api/animal/add', {text, userId, name, gender, age, kind, vaccinations, img}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setAnimals([...animals], response.data)
                    setText('')
                    setName('')
                    setGender('')
                    setKind('')
                    setVaccinations('')
                    setAge('')
                    setImg('')
                    getAnimal()
                    onClose()
                })
        } catch (e) {
            console.log(e)
        }
    }, [text, userId, name, img, gender, age, kind, vaccinations, animals, getAnimal])
    // const removeAnimal = useCallback(async (id) => {
    //     try {
    //         await axios.delete(`/api/animal/delete/${id}`, {id}, {
    //             headers: {'Content-Type': 'application/json'}
    //         }).then(() => getAnimal())
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [getAnimal])
    const addFavoriteAnimal = useCallback(async (id) => {
        try {
            await axios.put(`/api/animal/completed/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then((response) => {
                setAnimals([...animals], response.data)
                getAnimal()
            })
        } catch (e) {
            console.log(e)
        }
    }, [getAnimal, animals])
    // const changeAnimal = useCallback(async (id) => {
    //     try {
    //         await axios.put(`/api/todo/important/${id}`, {id}, {
    //             headers: {'Content-Type': 'application/json'}
    //         }).then((response) => {
    //             setAnimals([...animals], response.data)
    //             getAnimal()
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }, [getAnimal, animals])

    useEffect(() => {
        getAnimal()
    }, [getAnimal])
    return !isVisible ? null : (
        <div onLoad={getAnimal} className="modal">
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                    <span onClick={onClose}
                          className="waves-effect waves-light dark modal-close">
                        <i className="material-icons">close</i>
                    </span>
                </div>
                <div className="modal-body">
                    <div className="modal-content">
                        <form className="form form-login" onSubmit={e => e.preventDefault()}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <span className="radio-label">Вид:</span>
                                    <div className="radio-buttons">
                                        <p>
                                            <label>
                                                <input value="cat" className="validate"
                                                       onChange={e => setKind(e.target.value)} name="kind"
                                                       type="radio"/>
                                                <span>Кот</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input value="dog" className="validate"
                                                       onChange={e => setKind(e.target.value)} name="kind"
                                                       type="radio"/>
                                                <span>Собака</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>

                                <div className="input-field col s12">
                                    <span className="radio-label">Пол:</span>
                                    <div className="radio-buttons">
                                        <p>
                                            <label>
                                                <input value={0} className="validate"
                                                       onChange={e => setGender(e.target.value)} name="gender"
                                                       type="radio"/>
                                                <span>Девочка</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input value={1} className="validate"
                                                       onChange={e => setGender(e.target.value)} name="gender"
                                                       type="radio"/>
                                                <span>Мальчик</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>

                                <div className="input-field col s12">
                                    <span className="radio-label">Наличие вакцинаций:</span>
                                    <div className="radio-buttons">
                                        <p>
                                            <label>
                                                <input value={true} className="validate"
                                                       onChange={e => setVaccinations(e.target.value)}
                                                       name="vaccinations" type="radio"/>
                                                <span>Есть</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input value={false} className="validate"
                                                       onChange={e => setVaccinations(e.target.value)}
                                                       name="vaccinations" type="radio"/>
                                                <span>Нет</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>

                                <div className="input-field col s12">
                                    <input
                                        type="text"
                                        id="name"
                                        name="input-name"
                                        className="validate"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <label htmlFor="input-name">Имя:</label>
                                </div>

                                <div className="input-field col s12">
                                    <input
                                        type="text"
                                        id="age"
                                        name="input-age"
                                        className="validate"
                                        value={age}
                                        onChange={e => setAge(e.target.value)}
                                    />
                                    <label htmlFor="input">Возраст:</label>
                                </div>

                                <div className="input-field col s12">
                                    <input
                                        type="text"
                                        id="text"
                                        name="input-text"
                                        className="validate"
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                    />
                                    <label htmlFor="input-text">Описание:</label>
                                </div>

                                <div className="input-field col s12">
                                    <input
                                        type="text"
                                        id="img"
                                        name="input-img"
                                        className="validate"
                                        value={img}
                                        onChange={e => setImg(e.target.value)}
                                    />
                                    <label htmlFor="input-img">Ссылка на изображение:</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <button onClick={createAnimal} className="waves-effect add waves-light btn orange">
                            Добавить
                        </button>
                        <button onClick={onClose} className="waves-effect waves-light btn red">Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAnimal;